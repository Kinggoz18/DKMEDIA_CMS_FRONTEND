import { useState } from "react";
import ContactUsInquiry from "../../../components/ContactUsInquiry";
import ContactUsProps from "../../../interface/ContactUsProps";
import ConfirmComponent from "../../../components/ConfirmComponent";
import PrimaryButton from "../../../components/PrimaryButton";

export default function ManageContactUs() {
  const [isDeletePopup, setIsDeletePopup] = useState(false);
  const [inquiryToDelete, setInquiryToDelete] = useState("");

  const temp: ContactUsProps[] = [{
    _id: "65e5f3c9a1b2c34567890abc",
    firstName: "John",
    lastName: "Doe",
    subject: "Potential colaboration.",
    company: "Tech Innovations Ltd.",
    email: "john.doe@example.com",
    phone: "+1-555-123-4567",
    message: "Hello, I am reaching out regarding a potential collaboration between our companies. We have been following your work closely and are very impressed with your solutions in the industry. Our team believes that there is a strong alignment between our business objectives, and we would love to explore ways in which we can work together. Please let me know a convenient time for a call to discuss this further. Hello, I am reaching out regarding a potential collaboration between our companies. We have been following your work closely and are very impressed with your solutions in the industry. Our team believes that there is a strong alignment between our business objectives, and we would love to explore ways in which we can work together. Please let me know a convenient time for a call to discuss this further."
  },
  {
    _id: "65e5f3c9a1b2c34567890abd",
    firstName: "Jane",
    lastName: "Smith",
    subject: "Potential colaboration.",
    email: "jane.smith@example.com",
    phone: "+1-555-987-6543",
    message: "I wanted to reach out regarding a query I have about your services. I have been researching different providers, and your company caught my attention due to its reputation for excellent customer support and innovative solutions. Before proceeding further, I would love to get some clarity on your pricing structure and any available customizations. Looking forward to your response at your earliest convenience."
  },
  {
    _id: "65e5f3c9a1b2c34567890abc",
    firstName: "John",
    lastName: "Doe",
    subject: "Potential collaboration.",
    company: "Tech Innovations Ltd.",
    email: "john.doe@example.com",
    phone: "+1-555-123-4567",
    message: "Hello, I am reaching out regarding a potential collaboration between our companies. We have been following your work closely and are very impressed with your solutions in the industry. Our team believes that there is a strong alignment between our business objectives, and we would love to explore ways in which we can work together. Please let me know a convenient time for a call to discuss this further."
  },
  {
    _id: "65e5f3c9a1b2c34567890abd",
    firstName: "Jane",
    lastName: "Smith",
    subject: "Potential collaboration.",
    company: "Tech Innovations Ltd.",
    email: "john.doe@example.com",
    phone: "+1-555-987-6543",
    message: "I wanted to reach out regarding a query I have about your services. I have been researching different providers, and your company caught my attention due to its reputation for excellent customer support and innovative solutions. Before proceeding further, I would love to get some clarity on your pricing structure and any available customizations. Looking forward to your response at your earliest convenience."
  },
  {
    _id: "65e5f3c9a1b2c34567890abc",
    firstName: "John",
    lastName: "Doe",
    subject: "Potential collaboration.",
    company: "Tech Innovations Ltd.",
    email: "john.doe@example.com",
    phone: "+1-555-123-4567",
    message: "Hello, I am reaching out regarding a potential collaboration between our companies. We have been following your work closely and are very impressed with your solutions in the industry. Our team believes that there is a strong alignment between our business objectives, and we would love to explore ways in which we can work together. Please let me know a convenient time for a call to discuss this further."
  },
  {
    _id: "65e5f3c9a1b2c34567890abd",
    firstName: "Jane",
    lastName: "Smith",
    subject: "Potential collaboration.",
    email: "john.doe@example.com",
    company: "Tech Innovations Ltd.",
    phone: "+1-555-987-6543",
    message: "I wanted to reach out regarding a query I have about your services. I have been researching different providers, and your company caught my attention due to its reputation for excellent customer support and innovative solutions. Before proceeding further, I would love to get some clarity on your pricing structure and any available customizations. Looking forward to your response at your earliest convenience."
  },
  {
    _id: "65e5f3c9a1b2c34567890abc",
    firstName: "John",
    lastName: "Doe",
    subject: "Potential collaboration.",
    company: "Tech Innovations Ltd.",
    email: "john.doe@example.com",
    phone: "+1-555-123-4567",
    message: "Hello, I am reaching out regarding a potential collaboration between our companies. We have been following your work closely and are very impressed with your solutions in the industry. Our team believes that there is a strong alignment between our business objectives, and we would love to explore ways in which we can work together. Please let me know a convenient time for a call to discuss this further."
  },
  {
    _id: "65e5f3c9a1b2c34567890abd",
    firstName: "Jane",
    lastName: "Smith",
    subject: "Potential collaboration.",
    email: "john.doe@example.com",
    company: "Tech Innovations Ltd.",
    phone: "+1-555-987-6543",
    message: "I wanted to reach out regarding a query I have about your services. I have been researching different providers, and your company caught my attention due to its reputation for excellent customer support and innovative solutions. Before proceeding further, I would love to get some clarity on your pricing structure and any available customizations. Looking forward to your response at your earliest convenience."
  },
  {
    _id: "65e5f3c9a1b2c34567890abc",
    firstName: "John",
    lastName: "Doe",
    subject: "Potential collaboration.",
    company: "Tech Innovations Ltd.",
    email: "john.doe@example.com",
    phone: "+1-555-123-4567",
    message: "Hello, I am reaching out regarding a potential collaboration between our companies. We have been following your work closely and are very impressed with your solutions in the industry. Our team believes that there is a strong alignment between our business objectives, and we would love to explore ways in which we can work together. Please let me know a convenient time for a call to discuss this further."
  },
  {
    _id: "65e5f3c9a1b2c34567890abd",
    firstName: "Jane",
    lastName: "Smith",
    subject: "Potential collaboration.",
    email: "john.doe@example.com",
    company: "Tech Innovations Ltd.",
    phone: "+1-555-987-6543",
    message: "I wanted to reach out regarding a query I have about your services. I have been researching different providers, and your company caught my attention due to its reputation for excellent customer support and innovative solutions. Before proceeding further, I would love to get some clarity on your pricing structure and any available customizations. Looking forward to your response at your earliest convenience."
  },
  {
    _id: "65e5f3c9a1b2c34567890abc",
    firstName: "John",
    lastName: "Doe",
    subject: "Potential collaboration.",
    company: "Tech Innovations Ltd.",
    email: "john.doe@example.com",
    phone: "+1-555-123-4567",
    message: "Hello, I am reaching out regarding a potential collaboration between our companies. We have been following your work closely and are very impressed with your solutions in the industry. Our team believes that there is a strong alignment between our business objectives, and we would love to explore ways in which we can work together. Please let me know a convenient time for a call to discuss this further."
  },
  {
    _id: "65e5f3c9a1b2c34567890abd",
    firstName: "Jane",
    lastName: "Smith",
    subject: "Potential collaboration.",
    email: "john.doe@example.com",
    company: "Tech Innovations Ltd.",
    phone: "+1-555-987-6543",
    message: "I wanted to reach out regarding a query I have about your services. I have been researching different providers, and your company caught my attention due to its reputation for excellent customer support and innovative solutions. Before proceeding further, I would love to get some clarity on your pricing structure and any available customizations. Looking forward to your response at your earliest convenience."
  }
    , {
    _id: "65e5f3c9a1b2c34567890abc",
    firstName: "John",
    lastName: "Doe",
    subject: "Potential collaboration.",
    company: "Tech Innovations Ltd.",
    email: "john.doe@example.com",
    phone: "+1-555-123-4567",
    message: "Hello, I am reaching out regarding a potential collaboration between our companies. We have been following your work closely and are very impressed with your solutions in the industry. Our team believes that there is a strong alignment between our business objectives, and we would love to explore ways in which we can work together. Please let me know a convenient time for a call to discuss this further."
  },
  {
    _id: "65e5f3c9a1b2c34567890abd",
    firstName: "Jane",
    lastName: "Smith",
    subject: "Potential collaboration.",
    email: "john.doe@example.com",
    company: "Tech Innovations Ltd.",
    phone: "+1-555-987-6543",
    message: "I wanted to reach out regarding a query I have about your services. I have been researching different providers, and your company caught my attention due to its reputation for excellent customer support and innovative solutions. Before proceeding further, I would love to get some clarity on your pricing structure and any available customizations. Looking forward to your response at your earliest convenience."
  }];

  /**
   * Render contact us inquiries
   * @returns 
   */
  function RenderInquiries() {
    return temp.map((element, index) => (
      <ContactUsInquiry
        key={index}
        lastName={element?.lastName}
        firstName={element?.firstName}
        subject={element.subject}
        company={element?.company}
        email={element?.email}
        phone={element?.phone}
        message={element?.message}
        onDeleteClick={() => onDeleteClick(element?._id ?? "")}
      />
    ))
  }


  /**
   * Trigger delete popup
   */
  function onDeleteClick(id: string) {
    if (!id)
      throw new Error("Id is missing");

    setIsDeletePopup(true);
    setInquiryToDelete(id);
  }

  /**
   * Confirm delete inquiry action
   */
  function onYesDeleteClick() {
    console.log("Deleting inquiry with id: ", inquiryToDelete)
    setIsDeletePopup(false)
    setInquiryToDelete("");
  }

  /**
   * Cancel delete inquiry action
   */
  function onNoDeleteClick() {
    setIsDeletePopup(false)
    setInquiryToDelete("");
  }

  /**
   * Update contact
   */
  function onUpdateContactClick() {
    console.log("Updating contact section")
  }

  return (
    <div className='w-[78vw] relative left-[21vw] h-full flex flex-col gap-10 overflow-y-scroll pb-[10px]'>
      <div className='text-3xl font-bold'>Contact us</div>
      {/* Contact section */}
      <div className='flex flex-col gap-y-4 overflow-hidden w-[97%] h-[400px] relative'>
        <div className="w-full flex flex-col gap-y-3 ">
          <div className='font-semibold'>Contact email</div>
          <input type="email" className="outline-none focus:outline-none py-2 px-7 w-[80%] min-w-[100px] overflow-x-scroll border-1 border-solid rounded-2xl bg-neutral-100 text-neutral-900" />
        </div>

        <div className="w-full flex flex-col gap-y-3 ">
          <div className='font-semibold'>Tiktok link</div>
          <input type="text" className="outline-none focus:outline-none py-2 px-7 w-[80%] min-w-[100px] overflow-x-scroll  border-1 border-solid rounded-2xl bg-neutral-100 text-neutral-900" />
        </div>

        <div className="w-full flex flex-col gap-y-3 ">
          <div className='font-semibold'>Instagram link</div>
          <input type="text" className="outline-none focus:outline-none py-2 px-7 w-[80%] min-w-[100px] overflow-x-scroll  border-1 border-solid rounded-2xl bg-neutral-100 text-neutral-900" />
        </div>

        <PrimaryButton title="Update contact" onBtnClick={onUpdateContactClick} className="absolute left-2 bottom-0 rounded-lg" />
      </div>

      {/* Contact us inquiries section */}
      <div className='flex flex-col overflow-hidden w-[97%] min-h-[300px] h-[60%] gap-y-4'>
        <div className='text-lg font-bold flex flex-row'>Submitted inquiries
          <div className="cursor-pointer absolute right-8 hover:text-primary-500">
            View all
          </div>
        </div>
        <div className='w-full overflow-y-scroll flex flex-col gap-y-4'>
          <RenderInquiries />
        </div>
      </div>

      {isDeletePopup && <>
        <div className="h-full w-full bg-neutral-900/20 absolute z-10"></div>
        <ConfirmComponent
          message="Are you sure you want to delete this inquiry?"
          onNoClick={onNoDeleteClick}
          onYesClick={onYesDeleteClick}
        /></>}
    </div>
  )
}
