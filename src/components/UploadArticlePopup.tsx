import { useState } from "react"
import PrimaryButton from "./PrimaryButton";
import UploadArticleProps from "../interface/UploadArticleProps";

export default function UploadArticlePopup(props: UploadArticleProps) {
  const { closePopup } = props;
  const [articleTitle, setArticleTitle] = useState("");
  const [articleLink, setArticleLink] = useState("");

  function onUploadClick() {
    console.log("Uploading article")
    closePopup()
  }

  return (
    <div className="z-20 grid grid-flow-row justify-center absolute w-[450px] h-fit bg-neutral-200 py-10 gap-3 rounded-2xl font-semibold ml-auto mr-auto left-0 right-0 top-[20vh] text-neutral-900">
      <div className="w-full text-left mb-1">
        Upload an article
      </div>
      <div className="w-full flex flex-col gap-y-3 relative">
        <div className='font-semibold'>Title: </div>
        <input
          type="text"
          className="outline-none focus:outline-none py-2 px-7 w-full min-w-[100px] overflow-x-scroll border-1 border-solid rounded-2xl bg-neutral-100 "
          value={articleTitle}
          onChange={(e) => setArticleTitle(e.target.value)}
        />
      </div>

      <div className="w-full flex flex-col gap-y-3 ">
        <div className='font-semibold'>Link: </div>
        <input
          type="url"
          className="outline-none focus:outline-none py-2 px-7 w-full min-w-[100px] overflow-x-scroll  border-1 border-solid rounded-2xl bg-neutral-100 "
          value={articleLink}
          onChange={(e) => setArticleLink(e.target.value)}
        />
      </div>

      <PrimaryButton title="Upload" onBtnClick={onUploadClick} className="place-self-center bg-primary-500 !text-neutral-100" />
    </div>
  )
}
