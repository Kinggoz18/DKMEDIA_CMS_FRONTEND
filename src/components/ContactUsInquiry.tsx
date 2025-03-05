import { useState } from "react";
import ContactUsProps from "../interface/ContactUsProps";
import DeleteIconBtn from "./DeleteIconBtn";

export default function ContactUsInquiry(props: ContactUsProps) {
  const {
    firstName,
    lastName,
    subject,
    company,
    email,
    phone,
    message, onDeleteClick } = props;

  const [isFullMessage, setIsFullMessage] = useState(false);

  /**
   * Show inquiry message
   */
  function onViewMessageClick() {
    setIsFullMessage(!isFullMessage);
  }

  return (
    <div className={`relative min-h-[140px] min-w-[300px] text-neutral-900 bg-neutral-100 rounded-md flex flex-col p-2 gap-y-1 ${isFullMessage ? "min-h-fit pb-10" : "h-[200px]"}`}>
      <DeleteIconBtn onDeleteClick={onDeleteClick} />
      <div className="flex flex-row">
        <div className="font-semibold pr-2">Name:</div>
        {firstName + " " + lastName}
      </div>
      <div className="flex flex-row gap-x-1">
        <div className="font-semibold pr-2">Contact:</div>
        <div className="border-r-[1.6px] border-neutral-400 pr-2">{email}</div>
        <div>{phone}</div>
      </div>
      {
        company && <div className="flex flex-row gap-x-1">
          <div className="font-semibold pr-1">Company:</div>
          <div>{company}</div></div>
      }
      <div className="flex flex-row gap-x-1">
        <div className="font-semibold pr-1">Subject:</div>
        <div>{subject}</div></div>
      {!isFullMessage ?
        <div
          onClick={onViewMessageClick}
          className="cursor-pointer absolute bottom-2 text-right w-[98%] hover:text-primary-500 font-semibold">View message</div> :
        <> <div className="relative flex flex-col">
          <div className="font-semibold">Message</div>
          {message}
        </div>
          <div
            onClick={onViewMessageClick}
            className="cursor-pointer absolute bottom-2 text-right w-[98%] hover:text-primary-500 font-semibold">Hide message</div>
        </>
      }
    </div>
  )
}
