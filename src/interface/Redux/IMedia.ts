import { mediaType } from "../../enums/mediaType";

export default interface IMedia {
  _id?: string;
  mediaType: mediaType;
  mediaLink: string;
}