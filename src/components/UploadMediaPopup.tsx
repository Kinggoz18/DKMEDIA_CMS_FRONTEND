import { useState } from "react"
import PrimaryButton from "./PrimaryButton";
import UploadMediaProps from "../interface/UploadMediaProps";

export default function UploadMediaPopup(props: UploadMediaProps) {
  const { closePopup } = props;
  const [mediaLogo, setMediaLogo] = useState("");

  function onUploadClick() {
    console.log("Uploading media")
    closePopup()
  }

  return (
    <div className="z-20 grid grid-flow-row justify-center absolute w-[450px] h-fit bg-neutral-200 py-10 gap-3 rounded-2xl font-semibold ml-auto mr-auto left-0 right-0 top-[20vh] text-neutral-900">
      <div className="w-full text-left mb-1">
        Add media
      </div>

      <div className="w-full flex flex-col gap-y-3 ">
        <input
          type="file"
          className="outline-none cursor-pointer focus:outline-none py-2 px-7 w-full max-w-[400px] min-w-[100px] overflow-x-scroll  border-1 border-solid rounded-2xl bg-neutral-100 "
          value={mediaLogo}
          onChange={(e) => setMediaLogo(e.target.value)}
        />
      </div>

      <PrimaryButton title="Upload" onBtnClick={onUploadClick} className="place-self-center bg-primary-500 !text-neutral-100" />
    </div>
  )
}
