import { useState } from "react"
import PrimaryButton from "./PrimaryButton";
import UploadOrganizationProps from "../interface/UploadOrganizationProps";
import Exit from "./Exit";
import IOrganizer from "../interface/Redux/IOrganizer";
import EventService from "../redux/Events/EventService";

export default function UploadOrganizationPopup(props: UploadOrganizationProps) {
  const {
    closePopup,
    handleThrowError,
    organizerService,
    setIsUploading,
    fetchAllOrganiziers, } = props;

  const eventService = new EventService();

  const [organizationName, setOrganizationName] = useState("");
  const [uploadedImage, setUploadedImage] = useState<File>();
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  /**
  * Save the organizer
  * @returns
  */
  async function onUploadClick() {
    if (!uploadedImage || organizationName === "") {
      handleThrowError("Please fill in all the required filleds.")
      return;
    } else {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("media", uploadedImage);
      try {
        const uploadedLogoUrl = await eventService.saveImageToCloudinary(formData);

        if (!uploadedLogoUrl) {
          throw new Error("Something went wrong, while uploading the logo to cloudinary");
        }

        const data: IOrganizer = {
          name: organizationName,
          logo: uploadedLogoUrl,
        }

        const newOrganizer = await organizerService.addOrganizer(data);
        if (!newOrganizer || !newOrganizer?._id) {
          throw new Error("Something went wrong while uploading the media")
        }

        setUploadedImage(undefined)
        setUploadedImageUrl("")
        setIsUploading(false);
        await fetchAllOrganiziers();
        closePopup()
      } catch (error: any) {
        handleThrowError(error?.message ?? error);
        setUploadedImage(undefined)
        setUploadedImageUrl("")
        setIsUploading(false);
        closePopup()
      }
    }
  }

  /**
   * Handler to set uploaded image
   * @param {*} files
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
      const url = URL.createObjectURL(blob);

      if (!url) return;
      setUploadedImageUrl(url);
      setUploadedImage(file);
    };
  };


  return (
    <div className="z-20 grid grid-flow-row justify-center absolute w-[450px] h-fit bg-neutral-200 py-10 gap-3 rounded-2xl font-semibold ml-auto mr-auto left-0 right-0 top-[20vh] text-neutral-900">
      <div className="absolute top-2 right-4 w-full flex flex-col place-items-end"><Exit onClick={closePopup} /></div>

      <div className="w-full text-left mb-1">
        Add an organization
      </div>
      <div className="w-full flex flex-col gap-y-3 relative">
        <div className='font-semibold'>Name: </div>
        <input
          type="text"
          className="outline-none focus:outline-none py-2 px-7 w-full min-w-[100px] max-w-[400px] overflow-x-scroll border-1 border-solid rounded-2xl bg-neutral-100 "
          value={organizationName}
          onChange={(e) => setOrganizationName(e.target.value)}
        />
      </div>

      <div className="w-full flex flex-col gap-y-3 items-center">
        <div className='font-semibold w-full text-left'>Logo: </div>
        <input
          type="file"
          className="outline-none cursor-pointer focus:outline-none py-2 px-7 w-full max-w-[400px] min-w-[100px] overflow-x-scroll  border-1 border-solid rounded-2xl bg-neutral-100 "
          onChange={(e) => handleSetUploadImage(e.target.files ?? undefined)}
        />
        {
          uploadedImageUrl !== "" && <img src={uploadedImageUrl} alt="Uploaded image" className="w-[250px] h-[200px] object-contain" />
        }
      </div>

      <PrimaryButton title="Save" onBtnClick={onUploadClick} className="place-self-center bg-primary-500 !text-neutral-100 rounded-xl" />
    </div>
  )
}
