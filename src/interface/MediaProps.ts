import { mediaType } from "../enums/mediaType";

export default interface MediaProps {
  _id?: string;
  mediaType: mediaType;
  mediaLink: string;
  onDeleteClick?: () => void;
}