import IMedia from "../interface/Redux/IMedia";
import UploadedMedia from "./UploadedMedia";

interface RenderMediaProps {
  allMedia: [IMedia];
  onDeleteClick: (id: string) => void;
}

function MediaList(props: RenderMediaProps) {
  const { onDeleteClick, allMedia } = props;

  return allMedia.map((element, index) => (
    <UploadedMedia
      key={index}
      mediaType={element?.mediaType}
      mediaLink={element?.mediaLink}
      onDeleteClick={() => onDeleteClick(element?._id ?? "")} />
  ))
}

export default MediaList;