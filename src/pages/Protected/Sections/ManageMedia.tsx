import PrimaryButton from "../../../components/PrimaryButton";
import SectionTitle from "../../../components/SectionTitle";
import { Suspense, useEffect, useRef, useState } from "react";
import ConfirmComponent from "../../../components/ConfirmComponent";
import UploadMediaPopup from "../../../components/UploadMediaPopup";
import MediaService from "../../../redux/Media/MediaService";
import MediaList from "../../../components/MediaList";
import IMedia from "../../../interface/Redux/IMedia";
import { mediaType } from "../../../enums/mediaType";
import ThrowAsyncError, { toggleError } from "../../../components/ThrowAsyncError";
import ProcessingIcon from "../../../components/ProcessingIcon";

export default function ManageMedia() {
  const mediaService = new MediaService();
  const [isDeletePopup, setIsDeletePopup] = useState(false);
  const [mediaToDelete, setMediaToDelete] = useState("");
  const [isUploadMediaPopup, setIsUploadMediaPopup] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [allMedia, setAllMedia] = useState<[IMedia]>([{
    _id: "",
    mediaType: mediaType.Default,
    mediaLink: "",
  }])

  const errorRef = useRef<HTMLDivElement>(null);
  const [responseError, setResponseError] = useState("");

  /**
  * Trigger delete popup
  */
  function onDeleteClick(id: string) {
    if (!id)
      throw new Error("Id is missing");

    setIsDeletePopup(true);
    setMediaToDelete(id);
  }

  /**
   * Confirm delete media action
   */
  async function onYesDeleteClick() {
    const response = await mediaService.deleteMedia(mediaToDelete);
    setMediaToDelete("");

    if (response !== "deleted successfuly") {
      handleThrowError("Failed to delete media")
    }
    await fetchAllMedia()
    setIsDeletePopup(false)
  }

  /**
   * Cancel delete media action
   */
  function onNoDeleteClick() {
    setIsDeletePopup(false)
    setMediaToDelete("");
  }

  /**
   * Upload media
   */
  function onUploadMediaClick() {
    setIsUploadMediaPopup(true)
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
   * Fetch all media
   */
  async function fetchAllMedia() {
    try {
      const response = await mediaService.getAllMedia();
      setAllMedia(response);
    } catch (error: any) {
      console.log({ error });
      handleThrowError(error?.message ?? error);
    }
  }

  useEffect(() => {
    fetchAllMedia()
  }, [])

  if (allMedia[0]?._id === "") return;

  return (<>
    {isUploading && (
      <div className="flex items-center justify-center absolute text-lg-4 text-neutral-300 font-bold w-screen h-screen text-center z-30 bg-neutral-700/20 bg-opacity-30">
        <ProcessingIcon width={"40"} height={"40"}></ProcessingIcon>
      </div>
    )}
    <div className='w-[78vw] relative left-[21vw] h-full flex flex-col gap-10 overflow-y-scroll pb-[40px]  p-4'>
      <SectionTitle title="Manage Media" />

      <div className='relative flex flex-col w-[97%] h-[84%] overflow-hidden gap-y-4'>
        <div className='text-lg font-bold'>Uploaded Recaps</div>
        <div className='relative w-full grid grid-cols-[repeat(auto-fill,minmax(200px,230px))] gap-4 overflow-y-scroll justify-center'>
          <Suspense fallback={<p>Fetching media...</p>}>
            <MediaList onDeleteClick={onDeleteClick} allMedia={allMedia} />
          </Suspense>
        </div>
      </div>

      <PrimaryButton title="Upload media" onBtnClick={onUploadMediaClick} />

      {/* Delete event section */}
      {isDeletePopup && <>
        <div className="h-[98%] w-[98%] bg-neutral-900/40 absolute z-10"></div>
        <ConfirmComponent
          message="Are you sure you want to delete this Event?"
          onNoClick={onNoDeleteClick}
          onYesClick={onYesDeleteClick}
        /></>}

      {isUploadMediaPopup &&
        <>
          <div className="h-full w-full bg-neutral-900/40 absolute z-10"></div>
          <UploadMediaPopup
            closePopup={() => setIsUploadMediaPopup(false)}
            handleThrowError={handleThrowError}
            mediaService={mediaService}
            setIsUploading={setIsUploading}
            fetchAllMedia={fetchAllMedia}
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
