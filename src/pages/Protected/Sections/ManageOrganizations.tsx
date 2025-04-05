import PrimaryButton from "../../../components/PrimaryButton";
import SectionTitle from "../../../components/SectionTitle";
import { Suspense, useEffect, useRef, useState } from "react";
import ConfirmComponent from "../../../components/ConfirmComponent";
import UploadOrganizationPopup from "../../../components/UploadOrganizationPopup";
import OrganizationList from "../../../components/OrganizationList";
import OrganizerService from "../../../redux/Organizers/OrganizerService";
import ThrowAsyncError, { toggleError } from "../../../components/ThrowAsyncError";
import IOrganizer from "../../../interface/Redux/IOrganizer";
import ProcessingIcon from "../../../components/ProcessingIcon";


export default function ManageMedia() {
  const [isDeletePopup, setIsDeletePopup] = useState(false);
  const [organizationToDelete, setOrganizationToDelete] = useState("");
  const [isUploadOrganizationPopup, setIsUploadOrganizationPopup] = useState(false);
  const [organizers, setOrganizers] = useState<[IOrganizer]>([{
    _id: "",
    name: "",
    logo: ""
  }])

  const organizerService = new OrganizerService();

  const [isUploading, setIsUploading] = useState(false);

  const errorRef = useRef<HTMLDivElement>(null);
  const [responseError, setResponseError] = useState("");

  /**
   * Trigger delete popup
   */
  function onDeleteClick(id: string) {
    if (!id)
      throw new Error("Id is missing");

    setIsDeletePopup(true);
    setOrganizationToDelete(id);
  }

  /**
   * Confirm delete organization action
   */
  async function onYesDeleteClick() {
    try {
      await organizerService.deleteOrganizer(organizationToDelete);
      setIsDeletePopup(false)
      setOrganizationToDelete("");
      await fetchAllOrganiziers();
    } catch (error: any) {
      setIsDeletePopup(false)
      setOrganizationToDelete("");
      handleThrowError(error?.message)
    }
  }

  /**
   * Cancel delete organization action
   */
  function onNoDeleteClick() {
    setIsDeletePopup(false)
    setOrganizationToDelete("");
  }


  /**
   * Upload organization
   */
  function onUploadOrganizationClick() {
    setIsUploadOrganizationPopup(true)
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

  /**
   * Fetch all organizers
   */
  async function fetchAllOrganiziers() {
    try {
      const response = await organizerService.getAllOrganizer();
      setOrganizers(response);
    } catch (error: any) {
      handleThrowError(error?.message ?? error)
    }
  }

  useEffect(() => {
    fetchAllOrganiziers()
  }, []);

  if (organizers[0]?._id === "") return;

  return (
    <>
      {isUploading && (
        <div className="flex items-center justify-center absolute text-lg-4 text-neutral-300 font-bold w-screen h-screen text-center z-30 bg-neutral-700/20 bg-opacity-30">
          <ProcessingIcon width={"40"} height={"40"}></ProcessingIcon>
        </div>
      )}

      <div className='w-[78vw] relative left-[21vw] h-full flex flex-col gap-10 overflow-y-scroll pb-[40px]  p-4'>
        <SectionTitle title="Manage Organizations" />

        <div className='flex flex-col w-[97%] h-[84%] overflow-hidden gap-y-4'>
          <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(200px,230px))] gap-4 overflow-y-scroll justify-center'>
            <Suspense fallback={<p>Fetching organizations...</p>}>
              <OrganizationList
                onDeleteClick={onDeleteClick}
                allOrganizations={organizers}
              />
            </Suspense>
          </div>
        </div>

        <PrimaryButton title="Add organization" onBtnClick={onUploadOrganizationClick} />

        {isDeletePopup && <>
          <div className="h-full w-full bg-neutral-900/20 absolute z-10"></div>
          <ConfirmComponent
            message="Are you sure you want to delete this organization?"
            onNoClick={onNoDeleteClick}
            onYesClick={onYesDeleteClick}
          /></>}

        {isUploadOrganizationPopup &&
          <>
            <div className="h-[98%] w-[98%] bg-neutral-900/40 absolute z-10"></div>
            <UploadOrganizationPopup
              closePopup={() => setIsUploadOrganizationPopup(false)}
              handleThrowError={handleThrowError}
              organizerService={organizerService}
              setIsUploading={setIsUploading}
              fetchAllOrganiziers={fetchAllOrganiziers}
            />
          </>}

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
