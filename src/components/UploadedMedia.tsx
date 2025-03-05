import MediaProps from "../interface/MediaProps";
import DeleteIconBtn from "./DeleteIconBtn";

export default function UploadedMedia(props: MediaProps) {
  const {
    mediaType,
    mediaLink,
    onDeleteClick,
  } = props;

  function onMediaClick() {
    window.open(mediaLink, '_blank');
  }

  return (
    <div className='relative h-[230px] min-w-[230px] w-[230px] bg-neutral-100 flex flex-row'>

      {mediaType === "Image" ?
        <img onClick={onMediaClick} src={mediaLink} className="absolute w-[230px] h-[230px] cursor-pointer"></img> :
        <video onClick={onMediaClick} src={mediaLink} className="absolute w-[230px] h-[230px] object-fill cursor-pointer"></video>}

      <div className="bg-neutral-100/60 w-[230px] z-10 absolute bottom-0 flex flex-row justify-end p-1">
        <DeleteIconBtn onDeleteClick={onDeleteClick} className="!relative !right-0" />
      </div>
    </div>
  )
}
