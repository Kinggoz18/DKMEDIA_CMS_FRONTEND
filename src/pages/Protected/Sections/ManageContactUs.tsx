import { useEffect, useRef, useState } from "react";
import ConfirmComponent from "../../../components/ConfirmComponent";
import PrimaryButton from "../../../components/PrimaryButton";
import ThrowAsyncError, { toggleError } from "../../../components/ThrowAsyncError";
import ProcessingIcon from "../../../components/ProcessingIcon";
import IContactUs from "../../../interface/Redux/IContactUs";
import { ContactService } from "../../../redux/Contact/ContactService";
import { ContactUsService } from "../../../redux/Contact/ContactUsService";
import { ContactUsInquiriesList } from "../../../components/InquiriesList";
import IContact, { IContactUpdate } from "../../../interface/Redux/IContact";

export default function ManageContactUs() {
  const contactService = new ContactService();
  const contactUsService = new ContactUsService();

  const [isDeletePopup, setIsDeletePopup] = useState(false);
  const [inquiryToDelete, setInquiryToDelete] = useState("");

  const [isUploading, _setIsUploading] = useState(false);
  const errorRef = useRef<HTMLDivElement>(null);
  const [responseError, setResponseError] = useState("");
  const [contactInfo, setContactInfo] = useState<IContact>({
    email: "",
    instagramLink: "",
    tiktokLink: "",
  })

  const [newEmail, setNewEmail] = useState("");
  const [newInstagram, setNewInstagram] = useState("");
  const [newTikTok, setNewTikTok] = useState("");

  const [allInquiries, setAllInquires] = useState<IContactUs[]>([{
    _id: "",
    firstName: "",
    lastName: "",
    subject: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  }])

  /**
   * Trigger delete popup
   */
  function onDeleteClick(id: string) {
    if (!id)
      throw new Error("Id is missing");

    setIsDeletePopup(true);
    setInquiryToDelete(id);
  }

  /**
   * Confirm delete inquiry action
   */
  async function onYesDeleteClick() {
    console.log("Deleting inquiry with id: ", inquiryToDelete)
    try {
      await contactUsService.deleteContactUsInquiry(inquiryToDelete);
      setIsDeletePopup(false)
      setInquiryToDelete("");
      await fetchInquires();
    } catch (error: any) {
      setIsDeletePopup(false)
      setInquiryToDelete("");
      handleThrowError(error?.message)
    }
  }

  /**
   * Cancel delete inquiry action
   */
  function onNoDeleteClick() {
    setIsDeletePopup(false)
    setInquiryToDelete("");
  }

  /**
 * Check if the url is valid
 */
  function isValidURL(input: string) {
    try {
      new URL(input);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Update contact
   */
  async function onUpdateContactClick() {
    if (newEmail === "" && newInstagram === "" && newTikTok === "") {
      return handleThrowError("Please fill in empty fields");
    }

    if (newInstagram !== "" && !isValidURL(newInstagram)) {
      return handleThrowError("Please enter a valid link");
    }

    if (newTikTok !== "" && !isValidURL(newTikTok)) {
      return handleThrowError("Please enter a valid link");
    }

    try {
      const data: IContactUpdate = {
        email: newEmail !== "" ? newEmail : undefined,
        instagramLink: newInstagram !== "" ? newInstagram : undefined,
        tiktokLink: newTikTok !== "" ? newTikTok : undefined,
      }

      const response = await contactService.addContact(data);
      if (!response || !response?._id) {
        throw new Error('Sorry, something went wrong while trying to update contact information')
      }
      await fecthContactInfo();
      setNewEmail("")
      setNewInstagram("")
      setNewTikTok("")
    } catch (error: any) {
      return handleThrowError(error?.message ?? error);
    }
  }

  /**
   * Fetch all inquiries
   */
  async function fetchInquires() {
    try {
      const data = await contactUsService.getAllContactUsInquiry();
      setAllInquires(data)
    } catch (error: any) {
      console.log({ error })
      handleThrowError(error?.message)
    }
  }

  /**
   * Fetch contact information
   */
  async function fecthContactInfo() {
    try {
      const data = await contactService.getContacts();
      setContactInfo(data)
    } catch (error: any) {
      console.log({ error })
      handleThrowError(error?.message)
    }
  }

  /**
  * Throw error
  * @param {*} errorMsg
  */
  const handleThrowError = (errorMsg: string) => {
    setResponseError(errorMsg);
    setTimeout(() => {
      toggleError(errorRef);
    }, 400);
  };

  useEffect(() => {
    fecthContactInfo();
    fetchInquires();
  }, []);

  if (allInquiries[0]?._id === "") return;

  return (
    <>
      {isUploading && (
        <div className="flex items-center justify-center absolute text-lg-4 text-neutral-300 font-bold w-screen h-screen text-center z-30 bg-neutral-700/20 bg-opacity-30">
          <ProcessingIcon width={"40"} height={"40"}></ProcessingIcon>
        </div>
      )}

      <div className='w-[78vw] relative left-[21vw] h-full flex flex-col gap-6 overflow-y-scroll  p-4'>
        <div className='text-3xl font-bold'>Contact us</div>
        {/* Contact section */}
        <div className='flex flex-col gap-y-4 overflow-hidden w-[97%] h-[450px] relative'>
          <div className="w-full flex flex-col gap-y-3 ">
            <div className='font-semibold'>Contact email</div>
            <input
              type="email"
              placeholder={contactInfo?.email}
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="outline-none focus:outline-none py-2 px-7 w-[80%] min-w-[100px] overflow-x-scroll border-1 border-solid rounded-2xl bg-neutral-100 text-neutral-900"
            />
          </div>

          <div className="w-full flex flex-col gap-y-3 ">
            <div className='font-semibold'>Tiktok link</div>
            <input
              type="text"
              value={newTikTok}
              onChange={(e) => setNewTikTok(e.target.value)}
              placeholder={contactInfo?.tiktokLink}
              className="outline-none focus:outline-none py-2 px-7 w-[80%] min-w-[100px] overflow-x-scroll  border-1 border-solid rounded-2xl bg-neutral-100 text-neutral-900"
            />
          </div>

          <div className="w-full flex flex-col gap-y-3 ">
            <div className='font-semibold'>Instagram link</div>
            <input
              type="text"
              value={newInstagram}
              onChange={(e) => setNewInstagram(e.target.value)}
              placeholder={contactInfo?.instagramLink}
              className="outline-none focus:outline-none py-2 px-7 w-[80%] min-w-[100px] overflow-x-scroll  border-1 border-solid rounded-2xl bg-neutral-100 text-neutral-900"
            />
          </div>

          <PrimaryButton title="Update contact" onBtnClick={onUpdateContactClick} className="absolute left-2 bottom-0 rounded-lg" />
        </div>

        {/* Contact us inquiries section */}
        <div className='flex flex-col overflow-hidden w-[97%] min-h-[300px] h-[60%] gap-y-4'>
          <div className='text-lg font-bold flex flex-row'>Submitted inquiries
            <div className="cursor-pointer absolute right-8 hover:text-primary-500">
              View all
            </div>
          </div>
          <div className='w-full overflow-y-scroll flex flex-col gap-y-4'>
            <ContactUsInquiriesList
              allInquiries={allInquiries}
              onDeleteClick={onDeleteClick}
            />
          </div>
        </div>

        {isDeletePopup && <>
          <div className="h-[98%] w-[98%] bg-neutral-900/20 absolute z-10"></div>
          <ConfirmComponent
            message="Are you sure you want to delete this inquiry?"
            onNoClick={onNoDeleteClick}
            onYesClick={onYesDeleteClick}
          /></>}

        {/* Throw error section section */}
        <ThrowAsyncError
          responseError={responseError}
          errorRef={errorRef}
          className={"!bottom-[10%] !left-[20%]"}
        />
      </div>
    </>

  )
}
