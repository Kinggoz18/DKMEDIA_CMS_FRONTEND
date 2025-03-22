import { useEffect, useState } from "react";
import IOrganizer from "../interface/Redux/IOrganizer";
import { AddEventPopupProps } from "../interface/AddEventPopupProps";
import OrganizerService from "../redux/Organizers/OrganizerService";
import { EventPriority } from "../enums/eventPriority";
import Exit from "./Exit";
import PrimaryButton from "./PrimaryButton";
import IEvent from "../interface/Redux/IEvent";

export default function AddEventPopup(props: AddEventPopupProps) {
  const {
    closePopup,
    eventService,
    fetchEvents,
    handleThrowError,
    setIsUploading
  } = props;

  const organizerService = new OrganizerService();
  const currentDate = new Date().toISOString().slice(0, 16);
  console.log({ currentDate });
  const [organziers, setOrganizers] = useState<[IOrganizer]>([{ _id: "", name: "", logo: "" }]);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [uploadedImage, setUploadedImage] = useState<File>();
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [eventPriority, setEventPriority] = useState<EventPriority>(EventPriority.default);
  const [selectedOrganizer, setSelectedOrganizer] = useState<IOrganizer>({ _id: "", name: "", logo: "" })

  /**
   * Fetch all organizers
   */
  async function fetchOrganizers() {
    const response = await organizerService.getAllOrganizer();
    setOrganizers(response)
  }

  /**
   * Handler to select organizer
   */
  function handleSelectOrganizer(id: string) {
    const selected = organziers.find((o) => o?._id === id);
    if (!selected) {
      console.log("Invalid selection");
      return;
    };
    setSelectedOrganizer(selected);
  }

  /**
   * Handler to select priority
   */
  function handleSelectEventPriority(priority: EventPriority) {
    if (!priority) {
      console.log("Invalid selection");
      return;
    };

    setEventPriority(priority);
  }

  /**
   * Handler to set uploaded image
   * @param {*} e
   * @returns
   */
  const handleSetUploadImage = (files?: FileList) => {
    if (!files) return;

    const file = files[0];
    const fileSize = Number((file.size / (1024 * 1024)).toFixed(2));

    if (fileSize > 10) {
      handleThrowError("Image file is too large.");
      setUploadedImage(undefined);
      setUploadedImageUrl("");
      return;
    }

    const fr = new FileReader();
    fr.readAsArrayBuffer(file);
    fr.onload = function () {
      if (!fr.result) return;

      const blob = new Blob([fr.result]);
      console.log({ blob });
      const url = URL.createObjectURL(blob);

      if (!url) return;
      setUploadedImageUrl(url);
      setUploadedImage(file);
    };
  };

  /**
   * Check if the form is valid
   */

  const isFormValid = (): boolean => {
    if (eventTitle == "" ||
      eventDate == "" ||
      uploadedImageUrl == "" ||
      eventPriority === EventPriority.default ||
      selectedOrganizer.logo == "" || selectedOrganizer.name == "")
      return false;

    return true;
  }

  /**
   * Upload the event
   */
  const handleUploadEvent = async () => {
    try {
      if (!isFormValid()) {
        setIsUploading(false)
        handleThrowError("Fill in all the missing fields")
        return;
      }

      if (!uploadedImage || eventPriority === EventPriority.default) {
        setIsUploading(false)
        handleThrowError("Fill in all the missing fields")
        return;
      };

      //Save the image
      const formData = new FormData();
      formData.append("uploadedImage", uploadedImage);
      setIsUploading(true)
      const imageResponse = await eventService.saveImageToCloudinary(formData)

      //Upload the event
      const data: IEvent = {
        title: eventTitle,
        date: eventDate,
        image: imageResponse,
        priority: eventPriority,
        organizer: selectedOrganizer,
      };
      await eventService.addEvent(data);
      await fetchEvents();
      setIsUploading(false)
      closePopup();
    } catch (error: any) {
      console.log({ error })
      setIsUploading(false)
      handleThrowError(error?.message)
      closePopup();
    }
  }

  useEffect(() => {
    fetchOrganizers()
  }, []);

  return (
    <div className='absolute h-[90%] min-w-[230px] w-[90%] bg-neutral-100 flex flex-row ml-auto mr-auto left-0 right-0 top-10 z-20 text-neutral-900 justify-center'>
      <Exit onClick={closePopup} />
      <div className="flex flex-col gap-y-3 w-[90%] p-4 items-center">
        {/***************** Event title *************************/}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="EventTitle" className="font-semibold text-lg">Event title</label>
          <input
            name="EventTitle"
            type="text"
            placeholder={"Event title"}
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            className="outline-none focus:outline-none py-2 px-7 w-full min-w-[100px] overflow-x-scroll border-1 border-solid rounded-2xl bg-neutral-100  font-semibold"
          />
        </div>

        {/***************** Event Date *************************/}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="EventDate" className="font-semibold text-lg">Event date and time</label>
          <input
            name="EventDate"
            type="datetime-local"
            min={currentDate}
            placeholder={"Event date and time"}
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="outline-none focus:outline-none py-2 px-7 w-full min-w-[100px] overflow-x-scroll border-1 border-solid rounded-2xl bg-neutral-100 text-neutral-900 font-semibold"
          />
        </div>

        {/***************** Event Priority *************************/}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="eventPriority" className="font-semibold text-lg">Event priority</label>

          <select name="eventPriority" className="bg-neutral-600 p-2 rounded-lg text-neutral-300 font-semibold min-w-[200px]">
            <option value={EventPriority.default} onClick={(e) => handleSelectEventPriority(e.currentTarget.value as EventPriority)}>Select</option>
            <option value={EventPriority.Highlight} onClick={(e) => handleSelectEventPriority(e.currentTarget.value as EventPriority)}>{EventPriority.Highlight}</option>
            <option value={EventPriority.Regular} onClick={(e) => handleSelectEventPriority(e.currentTarget.value as EventPriority)}>{EventPriority.Regular}</option>
          </select>
        </div>

        {/***************** Event Organizer *************************/}
        <div className="flex flex-col gap-y-2">
          <label htmlFor="eventPriority" className="font-semibold text-lg">Select Organizer</label>

          <select name="eventPriority" className="bg-neutral-600 p-2 rounded-lg text-neutral-300 font-semibold">
            <option value={""} onClick={() => handleSelectOrganizer("")}>Select</option>
            {
              organziers.map((element) => (
                <option key={element?._id} value={element?._id} onClick={(e) => handleSelectOrganizer(e.currentTarget.value)}>{element?.name}</option>
              ))
            }
          </select>
        </div>

        {/***************** Upload event image *************************/}
        <div className="relative flex flex-col h-[250px] w-[50%] min-w-[200px] gap-y-1 items-center">
          <div className="relative w-full font-semibold text-lg text-center">
            Upload music image
          </div>
          <div className="relative flex flex-col h-[224px] rounded-[20px] bg-neutral-800/75 w-full p-[20px] font-semibold text-[13px] gap-y-[20px] items-center justify-center">
            {!uploadedImage ? (
              <div className="relative flex flex-col max-h-[150px] w-[90%] items-center gap-y-[5px]">
                <img
                  src="/upload-image.svg"
                  alt="upload music file icon"
                  className="h-[40xp] w-[36px]"
                />
                <div className="w-full font-semibold text-[15px] text-center text-neutral-200">
                  Upload cover image
                </div>
                <div className="w-full text-center text-neutral-300 text-[13px]">
                  For the best experience upload only JPEG images
                </div>
                <input
                  type="file"
                  className="absolute w-full h-full opacity-0"
                  accept="image/*"
                  onChange={(e) => handleSetUploadImage(e.target.files ?? undefined)}
                />
              </div>
            ) : (
              <div className="relative flex flex-col max-h-[150px] w-[90%] items-center gap-y-[5px]">
                {!uploadedImageUrl ? (
                  <>
                    <img
                      src="/upload-image.svg"
                      alt="upload music file icon"
                      className="h-[40xp] w-[36px]"
                    />
                    <p className="w-full overflow-hidden whitespace-nowrap text-ellipsis  text-[15px] text-center">
                      {uploadedImage?.name}
                    </p>
                  </>
                ) : (
                  <>
                    <img
                      src={uploadedImageUrl}
                      alt="upload music file icon"
                      className="h-[70xp] w-[70px] max-h-[100px] object-contain"
                    />
                    <p className="w-full overflow-hidden whitespace-nowrap text-ellipsis  text-[15px] text-center">
                      {uploadedImage?.name}
                    </p>
                  </>
                )}
                <input
                  type="file"
                  className="absolute w-full h-full opacity-0"
                  accept="image/*"
                  onChange={(e) => handleSetUploadImage(e.target.files ?? undefined)}
                />
              </div>
            )}
          </div>
        </div>

        <PrimaryButton title="Upload event" onBtnClick={handleUploadEvent} className="bg-primary-500 !text-neutral-100 rounded-xl" />
      </div>
    </div >
  )
}
