import { useState } from "react"
import PrimaryButton from "./PrimaryButton";
import UploadMediaProps from "../interface/UploadMediaProps";
import { mediaType } from "../enums/mediaType";
import Exit from "./Exit";
import EventService from "../redux/Events/EventService";
import IMedia from "../interface/Redux/IMedia";

export default function UploadMediaPopup(props: UploadMediaProps) {
  const { closePopup, handleThrowError, mediaService, setIsUploading, fetchAllMedia } = props;
  const [mediaLogo, setMediaLogo] = useState("");
  const [selectedType, setSelectedType] = useState<mediaType>(mediaType.Default);

  const [uploadedMedia, setUploadedMedia] = useState<File>();
  const [uploadedMediaUrl, setUploadedMediaUrl] = useState("");

  const eventService = new EventService();

  /**
   * On upload media click
   */
  async function onUploadClick() {
    setIsUploading(true);
    console.log("Uploading media")
    if (!uploadedMedia) return;

    if (uploadedMedia?.type.includes("video/") && selectedType !== mediaType.Video) {
      handleThrowError("Please select the correct media type or upload the correct meida");
      setIsUploading(false);
      return;
    }

    if (uploadedMedia?.type.includes("image/") && selectedType !== mediaType.Image) {
      handleThrowError("Please select the correct media type or upload the correct meida");
      setIsUploading(false);
      return;
    }


    const formData = new FormData();
    formData.append("media", uploadedMedia);

    //Upload the media
    let uploadedMediaUrl = null;
    try {
      if (selectedType == mediaType.Video) {
        uploadedMediaUrl = await eventService.saveVideoToCloudinary(formData)
      }

      if (selectedType == mediaType.Image) {
        uploadedMediaUrl = await eventService.saveImageToCloudinary(formData)
      }

      console.log({ uploadedMediaUrl });

      if (!uploadedMediaUrl) {
        throw new Error("Something went wrong, while uploading the media to cloudinary");
      }

      const data: IMedia = {
        mediaType: selectedType,
        mediaLink: uploadedMediaUrl,
      }

      const response = await mediaService.addMedia(data)
      if (!response || !response?._id) {
        throw new Error("Something went wrong while uploading the media")
      }

      setSelectedType(mediaType.Default)
      setUploadedMedia(undefined)
      setUploadedMediaUrl("")
      setIsUploading(false);
      await fetchAllMedia();
      closePopup()
    } catch (error: any) {
      handleThrowError(error?.message ?? error);
      setSelectedType(mediaType.Default)
      setUploadedMedia(undefined)
      setUploadedMediaUrl("")
      setIsUploading(false);
      return;
    }

  }

  /**
 * Handler to set uploaded image
 * @param {*} files
 * @returns
 */
  const handleSetUploadedMedia = (files?: FileList) => {
    //Check the file and media type have been selected
    if (!files) {
      handleThrowError("Select a media to upload");
      return
    };

    if (selectedType === mediaType.Default) {
      handleThrowError("Select the type of media you want to upload");
      return
    };

    const file = files[0];
    const fileSize = Number((file.size / (1024 * 1024)).toFixed(2));
    let isFileLarge = false;
    //Check the media size 
    if (selectedType === mediaType.Image) {
      if (fileSize > 10) {
        handleThrowError("Image file is too large.");
        setUploadedMedia(undefined);
        setUploadedMediaUrl("");
        isFileLarge = true;
        return;
      }
    }

    if (selectedType === mediaType.Video) {
      if (fileSize > 90) {
        handleThrowError("Video file is too large.");
        setUploadedMedia(undefined);
        setUploadedMediaUrl("");
        isFileLarge = true;
        return;
      }
    }

    if (!isFileLarge) {
      //Save the media
      const fr = new FileReader();
      fr.readAsArrayBuffer(file);
      fr.onload = function () {
        if (!fr.result) return;

        const blob = new Blob([fr.result]);
        console.log({ blob });
        const url = URL.createObjectURL(blob);

        if (!url) return;
        setUploadedMediaUrl(url);
        setUploadedMedia(file);
      };
    }
  };

  console.log({ uploadedMediaUrl, uploadedMedia, selectedType })
  return (
    <div className="z-20 grid grid-flow-row justify-center absolute w-[450px] h-fit bg-neutral-200 py-10 gap-3 rounded-2xl font-semibold ml-auto mr-auto left-0 right-0 top-[20vh] text-neutral-900 p-4">
      <div className="absolute top-2 right-4 w-full flex flex-col place-items-end"><Exit onClick={closePopup} /></div>
      <div className="w-full text-left mb-1 font-bold text-lg">
        Upload a media
      </div>

      <div className="w-full flex flex-col gap-y-3 items-center">
        <ul className="w-full list-decimal">
          <li>Select the media type (Image, video).</li>
          <li>Then select your media</li>
        </ul>

        <select name="media_type_option" id="" className="bg-neutral-600 text-neutral-100 p-2 rounded-md w-[95%]">
          <option value={mediaType.Default} onClick={() => setSelectedType(mediaType.Default)}>Select media type</option>
          <option value={mediaType.Image} onClick={() => setSelectedType(mediaType.Image)}>{mediaType.Image}</option>
          <option value={mediaType.Video} onClick={() => setSelectedType(mediaType.Video)}>{mediaType.Video}</option>
        </select>

        <input
          type="file"
          className={`outline-none cursor-pointer focus:outline-none py-2 px-7 w-full max-w-[400px] min-w-[100px] overflow-x-scroll rounded-2xl bg-neutral-100 ${selectedType === mediaType?.Default ? "!bg-neutral-800/40 !text-neutral-300" : ""}`}
          onChange={(e) => handleSetUploadedMedia(e.target.files ?? undefined)}
          disabled={selectedType === mediaType?.Default ? true : false}
          accept={selectedType === mediaType?.Image ? "image/*" : "video/*"}
        />
        {
          uploadedMediaUrl !== "" ?
            selectedType === mediaType?.Image ? <img src={uploadedMediaUrl} alt="Uploaded image" className="w-[250px] h-[200px] object-contain" /> :
              selectedType === mediaType?.Video ? <video src={uploadedMediaUrl} controls playsInline className="w-[250px] h-[200px] object-contain" /> : <></>
            : <></>
        }
      </div>

      <PrimaryButton title="Upload" onBtnClick={onUploadClick} className="place-self-center bg-primary-500 !text-neutral-100" />
    </div>
  )
}
