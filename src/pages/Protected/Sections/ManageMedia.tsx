import PrimaryButton from "../../../components/PrimaryButton";
import SectionTitle from "../../../components/SectionTitle";
import UploadedMedia from "../../../components/UploadedMedia";
import MediaProps from "../../../interface/MediaProps";
import { mediaType } from "../../../enums/mediaType";
import { useState } from "react";
import ConfirmComponent from "../../../components/ConfirmComponent";
import UploadMediaPopup from "../../../components/UploadMediaPopup";

interface RenderMediaProps {
  onDeleteClick: (id: string) => void;
}

function RenderMedia(props: RenderMediaProps) {
  const { onDeleteClick } = props;

  const temp: MediaProps[] = [{
    _id: "1234",
    mediaType: mediaType.Image,
    mediaLink: "https://res.cloudinary.com/dw1wmzgy1/image/upload/v1733239467/samples/man-on-a-street.jpg",
  },
  {
    _id: "1234",
    mediaType: mediaType.Video,
    mediaLink: "https://res.cloudinary.com/dw1wmzgy1/video/upload/v1716828011/Ido/igbu7zgurrig9senvuni.mp4",
  },
  {
    _id: "1234",
    mediaType: mediaType.Image,
    mediaLink: "https://res.cloudinary.com/dw1wmzgy1/image/upload/v1733239467/samples/man-on-a-street.jpg",
  },
  {
    _id: "1234",
    mediaType: mediaType.Video,
    mediaLink: "https://res.cloudinary.com/dw1wmzgy1/video/upload/v1716828011/Ido/igbu7zgurrig9senvuni.mp4",
  },
  {
    _id: "1234",
    mediaType: mediaType.Image,
    mediaLink: "https://res.cloudinary.com/dw1wmzgy1/image/upload/v1733239467/samples/man-on-a-street.jpg",
  },
  {
    _id: "1234",
    mediaType: mediaType.Video,
    mediaLink: "https://res.cloudinary.com/dw1wmzgy1/video/upload/v1716828011/Ido/igbu7zgurrig9senvuni.mp4",
  },
  {
    _id: "1234",
    mediaType: mediaType.Image,
    mediaLink: "https://res.cloudinary.com/dw1wmzgy1/image/upload/v1733239467/samples/man-on-a-street.jpg",
  },
  {
    _id: "1234",
    mediaType: mediaType.Video,
    mediaLink: "https://res.cloudinary.com/dw1wmzgy1/video/upload/v1716828011/Ido/igbu7zgurrig9senvuni.mp4",
  },
  {
    _id: "1234",
    mediaType: mediaType.Image,
    mediaLink: "https://res.cloudinary.com/dw1wmzgy1/image/upload/v1733239467/samples/man-on-a-street.jpg",
  },
  {
    _id: "1234",
    mediaType: mediaType.Video,
    mediaLink: "https://res.cloudinary.com/dw1wmzgy1/video/upload/v1716828011/Ido/igbu7zgurrig9senvuni.mp4",
  },
  {
    _id: "1234",
    mediaType: mediaType.Image,
    mediaLink: "https://res.cloudinary.com/dw1wmzgy1/image/upload/v1733239467/samples/man-on-a-street.jpg",
  },
  {
    _id: "1234",
    mediaType: mediaType.Video,
    mediaLink: "https://res.cloudinary.com/dw1wmzgy1/video/upload/v1716828011/Ido/igbu7zgurrig9senvuni.mp4",
  },
  {
    _id: "1234",
    mediaType: mediaType.Image,
    mediaLink: "https://res.cloudinary.com/dw1wmzgy1/image/upload/v1733239467/samples/man-on-a-street.jpg",
  },
  {
    _id: "1234",
    mediaType: mediaType.Video,
    mediaLink: "https://res.cloudinary.com/dw1wmzgy1/video/upload/v1716828011/Ido/igbu7zgurrig9senvuni.mp4",
  },
  {
    _id: "1234",
    mediaType: mediaType.Image,
    mediaLink: "https://res.cloudinary.com/dw1wmzgy1/image/upload/v1733239467/samples/man-on-a-street.jpg",
  },
  {
    _id: "1234",
    mediaType: mediaType.Video,
    mediaLink: "https://res.cloudinary.com/dw1wmzgy1/video/upload/v1716828011/Ido/igbu7zgurrig9senvuni.mp4",
  },
  ];

  return temp.map((element, index) => (
    <UploadedMedia
      key={index}
      mediaType={element?.mediaType}
      mediaLink={element?.mediaLink}
      onDeleteClick={() => onDeleteClick(element?._id ?? "")} />
  ))
}

export default function ManageMedia() {
  const [isDeletePopup, setIsDeletePopup] = useState(false);
  const [mediaToDelete, setMediaToDelete] = useState("");
  const [isUploadMediaPopup, setIsUploadMediaPopup] = useState(false);

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
  function onYesDeleteClick() {
    console.log("Deleting media with id: ", mediaToDelete)
    setIsDeletePopup(false)
    setMediaToDelete("");
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
    console.log("Updating contact section")
    setIsUploadMediaPopup(true)
  }

  return (
    <div className='w-[78vw] relative left-[21vw] h-full flex flex-col gap-10 overflow-y-scroll pb-[10px]'>
      <SectionTitle title="Manage Media" />

      <div className='relative flex flex-col w-[97%] h-[84%] overflow-hidden gap-y-4'>
        <div className='text-lg font-bold'>Uploaded Recaps</div>
        <div className='relative w-full grid grid-cols-[repeat(auto-fill,minmax(200px,230px))] gap-4 overflow-y-scroll justify-center'>
          <RenderMedia onDeleteClick={onDeleteClick} />
        </div>
      </div>

      <PrimaryButton title="Upload media" onBtnClick={onUploadMediaClick} />

      {isDeletePopup && <>
        <div className="h-full w-full bg-neutral-900/20 absolute z-10"></div>
        <ConfirmComponent
          message="Are you sure you want to delete this organization?"
          onNoClick={onNoDeleteClick}
          onYesClick={onYesDeleteClick}
        /></>}

      {isUploadMediaPopup &&
        <>
          <div className="h-full w-full bg-neutral-900/20 absolute z-10"></div>
          <UploadMediaPopup closePopup={() => setIsUploadMediaPopup(false)} />
        </>}
    </div>
  )
}
