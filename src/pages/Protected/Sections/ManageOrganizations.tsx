import Organizations from "../../../components/Organizations";
import PrimaryButton from "../../../components/PrimaryButton";
import SectionTitle from "../../../components/SectionTitle";
import OrganizerProps from "../../../interface/OrganizerProps";
import madeInParadiseLogo from '../../../assets/madeInParadiseSample.png'
import afroStripLogo from '../../../assets/afroStripSample.png'
import { useState } from "react";
import ConfirmComponent from "../../../components/ConfirmComponent";
import UploadOrganizationPopup from "../../../components/UploadOrganizationPopup";

export default function ManageMedia() {
  const [isDeletePopup, setIsDeletePopup] = useState(false);
  const [organizationToDelete, setOrganizationToDelete] = useState("");
  const [isUploadOrganizationPopup, setIsUploadOrganizationPopup] = useState(false);

  const temp: OrganizerProps[] = [{
    _id: "1234",
    name: "MADE IN PARADISE - miami",
    logo: madeInParadiseLogo,
  },
  {
    _id: "1234",
    name: "The Afrostrip Experience",
    logo: afroStripLogo,
  },
  {
    _id: "1234",
    name: "MADE IN PARADISE - miami",
    logo: madeInParadiseLogo,
  },
  {
    _id: "1234",
    name: "The Afrostrip Experience",
    logo: afroStripLogo,
  },
  ];

  /**
 * Trigger delete popup
 */
  function onDeleteClick(id: string) {
    if (!id)
      throw new Error("Id is missing");

    setIsDeletePopup(true);
    setOrganizationToDelete(id);
  }

  /**
   * Confirm delete organization action
   */
  function onYesDeleteClick() {
    console.log("Deleting organization with id: ", organizationToDelete)
    setIsDeletePopup(false)
    setOrganizationToDelete("");
  }

  /**
   * Cancel delete organization action
   */
  function onNoDeleteClick() {
    setIsDeletePopup(false)
    setOrganizationToDelete("");
  }


  /**
   * Upload organization
   */
  function onUploadOrganizationClick() {
    console.log("Updating contact section")
    setIsUploadOrganizationPopup(true)
  }

  function RenderOrganizations() {
    return temp.map((element, index) => (
      <Organizations key={index}
        name={element?.name}
        logo={element?.logo}
        onDeleteClick={() => onDeleteClick(element?._id ?? "")}
      />
    ))
  }


  return (
    <div className='w-[78vw] relative left-[21vw] h-full flex flex-col gap-10 overflow-y-scroll pb-[10px]'>
      <SectionTitle title="Manage Organizations" />

      <div className='flex flex-col w-[97%] h-[84%] overflow-hidden gap-y-4'>
        <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(200px,230px))] gap-4 overflow-y-scroll justify-center'>
          <RenderOrganizations />
        </div>
      </div>

      <PrimaryButton title="Add organization" onBtnClick={onUploadOrganizationClick} />

      {isDeletePopup && <>
        <div className="h-full w-full bg-neutral-900/20 absolute z-10"></div>
        <ConfirmComponent
          message="Are you sure you want to delete this organization?"
          onNoClick={onNoDeleteClick}
          onYesClick={onYesDeleteClick}
        /></>}

      {isUploadOrganizationPopup &&
        <>
          <div className="h-full w-full bg-neutral-900/20 absolute z-10"></div>
          <UploadOrganizationPopup closePopup={() => setIsUploadOrganizationPopup(false)} />
        </>}
    </div>
  )
}
