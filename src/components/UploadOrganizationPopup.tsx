import { useState } from "react"
import PrimaryButton from "./PrimaryButton";
import UploadOrganizationProps from "../interface/UploadOrganizationProps";

export default function UploadOrganizationPopup(props: UploadOrganizationProps) {
  const { closePopup } = props;
  const [organizationName, setOrganizationName] = useState("");
  const [organizationLogo, setOrganizationLogo] = useState("");

  function onUploadClick() {
    console.log("Uploading organization")
    closePopup()
  }

  return (
    <div className="z-20 grid grid-flow-row justify-center absolute w-[450px] h-fit bg-neutral-200 py-10 gap-3 rounded-2xl font-semibold ml-auto mr-auto left-0 right-0 top-[20vh] text-neutral-900">
      <div className="w-full text-left mb-1">
        Add an organization
      </div>
      <div className="w-full flex flex-col gap-y-3 relative">
        <div className='font-semibold'>Name: </div>
        <input
          type="text"
          className="outline-none focus:outline-none py-2 px-7 w-full min-w-[100px] max-w-[400px] overflow-x-scroll border-1 border-solid rounded-2xl bg-neutral-100 "
          value={organizationName}
          onChange={(e) => setOrganizationName(e.target.value)}
        />
      </div>

      <div className="w-full flex flex-col gap-y-3 ">
        <div className='font-semibold'>Logo: </div>
        <input
          type="file"
          className="outline-none cursor-pointer focus:outline-none py-2 px-7 w-full max-w-[400px] min-w-[100px] overflow-x-scroll  border-1 border-solid rounded-2xl bg-neutral-100 "
          value={organizationLogo}
          onChange={(e) => setOrganizationLogo(e.target.value)}
        />
      </div>

      <PrimaryButton title="Upload" onBtnClick={onUploadClick} className="place-self-center bg-primary-500 !text-neutral-100" />
    </div>
  )
}
