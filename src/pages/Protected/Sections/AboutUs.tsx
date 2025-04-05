import PrimaryButton from "../../../components/PrimaryButton";
import SectionTitle from "../../../components/SectionTitle";
import { useEffect, useRef, useState } from "react";
import ConfirmComponent from "../../../components/ConfirmComponent";
import AboutUsService from "../../../redux/AboutUs/AboutUsService";
import IAboutUs, { IAboutUsUpdate } from "../../../interface/Redux/IAboutUs";
import AboutUsParagraphs from "../../../components/AboutUsParagraphs";
import ThrowAsyncError, { toggleError } from "../../../components/ThrowAsyncError";

export default function AboutUs() {
  const initialState: IAboutUs = {
    _id: "",
    title: "Enter about us title...",
    paragraphs: []
  }

  const aboutUsService = new AboutUsService();
  const [isDeletePopup, setIsDeletePopup] = useState(false);
  const [aboutUsData, setAboutUsData] = useState<IAboutUs>(initialState)

  const [updatedData, setUpdatedData] = useState<IAboutUs>(initialState)

  const paragaphsRef = useRef<HTMLTextAreaElement>(null)
  const [aboutUsTitle, setAboutUsTitle] = useState("");

  const errorRef = useRef<HTMLDivElement>(null);
  const [responseError, setResponseError] = useState("");

  /**
  * Trigger delete popup
  */
  function onDeleteClick() {
    setIsDeletePopup(true);
  }

  /**
   * Confirm delete about us paragraph
   */
  async function onYesDeleteClick() {
    const response = await aboutUsService.deleteAboutUs();
    if (response !== "Deleted about us") {
      handleThrowError("Failed to clear about us")
    }
    await fetchAboutUs()
    setAboutUsTitle("")
    setUpdatedData(initialState)
    setIsDeletePopup(false)
  }

  /**
   * Cancel delete about us paragraph
   */
  function onNoDeleteClick() {
    setIsDeletePopup(false)
  }

  /**
   * Update about us paragraph
   */
  async function onUpdateAboutUsClick() {
    if (aboutUsTitle === "" && updatedData?.paragraphs.length <= 0) {
      handleThrowError("Please enter new data");
    }
    const data: IAboutUsUpdate = {
      title: aboutUsTitle === "" ? aboutUsData?.title : aboutUsTitle,
      paragraphs: updatedData?.paragraphs?.length <= 0 ? undefined : [...aboutUsData?.paragraphs, ...updatedData?.paragraphs]
    }

    try {
      const response = await aboutUsService.updateAboutUs(data);
      if (!response || !response?._id) {
        throw new Error("Something went wrong while trying to update about us");
      }
      await fetchAboutUs();
      setAboutUsTitle("")
      setUpdatedData(initialState)
    } catch (error: any) {
      handleThrowError(error?.message ?? error);
    }
  }

  /**
   * Add the paragraph to the current list
   */
  function onAddPragraphClick() {
    const ref = paragaphsRef?.current;
    if (!ref) return;

    const value = ref.value;
    if (value === "")
      return;

    setUpdatedData((prevState) => ({
      ...prevState,
      paragraphs: [...prevState.paragraphs, value], // Create a new array
    }));
    ref.value = ""
  }

  /**
   * Fetch about us section
   */
  async function fetchAboutUs() {
    try {
      const response = await aboutUsService.getAboutUs();
      if (response?._id) { setAboutUsData(response); }
      else {
        setAboutUsData(initialState)
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  /**
   * Remove updated paragraphs
   */
  function onDeleteParagraph(paragraph: string) {
    setUpdatedData((prevState) => ({
      ...prevState,
      paragraphs: prevState.paragraphs.filter(s => s !== paragraph),
    }));
  }

  /**
  * Throw error
  * @param {*} errorMsg
  */
  const handleThrowError = (errorMsg: string) => {
    setResponseError(errorMsg);
    setTimeout(() => {
      toggleError(errorRef);
    }, 400);
  };


  useEffect(() => {
    fetchAboutUs()
  }, [])

  return (
    <div className='w-[78vw] relative left-[21vw] h-full flex flex-col gap-10 overflow-y-scroll pb-[10px] p-4'>
      <SectionTitle title="About us" />

      <div className="flex flex-col gap-y-9 w-[90%]">
        <div className="flex flex-col gap-y-2">
          <label htmlFor="AboutUsTitle" className="font-semibold text-lg">Title</label>
          <input
            name="AboutUsTitle"
            type="text"
            placeholder={aboutUsData?.title}
            value={aboutUsTitle}
            onChange={(e) => setAboutUsTitle(e.target.value)}
            className="outline-none focus:outline-none py-2 px-7 w-full min-w-[100px] overflow-x-scroll border-1 border-solid rounded-2xl bg-neutral-100 text-neutral-900 font-semibold"
          />
          <div className="flex flex-col w-full gap-y-4">
            <textarea
              ref={paragaphsRef}
              name="AboutUsParagraph"
              placeholder="Enter paragraph..."
              rows={5}
              className="resize-none outline-none focus:outline-none py-2 px-7 w-full min-w-[100px] overflow-x-scroll border-1 border-solid rounded-2xl bg-neutral-100 text-neutral-900"
            ></textarea>
            <PrimaryButton title="Add paragraph" onBtnClick={onAddPragraphClick} className="rounded-xl !self-start hover:bg-primary-500" />
          </div>
        </div>
        <div className="flex flex-col gap-y-2 text-neutral-900 rounded-2xl bg-neutral-100 p-4">
          <div className="font-semibold text-lg">Paragraphs</div>
          <AboutUsParagraphs paragraphs={aboutUsData?.paragraphs} updatedParagraphs={updatedData?.paragraphs} onDeleteParagraph={onDeleteParagraph} />
        </div>

        <div className="mt-7 w-full flex flex-row gap-x-5 justify-center">
          <PrimaryButton title="Save About us" onBtnClick={onUpdateAboutUsClick} className="!w-[220px] !h-[40px]" />
          <PrimaryButton title="Clear About us" onBtnClick={onDeleteClick} className={"bg-primary-500 !text-neutral-100 !w-[220px] !h-[40px]"} />
        </div>
      </div>


      {isDeletePopup && <>
        <div className="h-full w-full bg-neutral-900/20 absolute z-10"></div>
        <ConfirmComponent
          message="Are you sure you want to delete this section?"
          onNoClick={onNoDeleteClick}
          onYesClick={onYesDeleteClick}
        /></>}

      {/* Throw error section section */}
      <ThrowAsyncError
        responseError={responseError}
        errorRef={errorRef}
        className={"!bottom-[10%] !left-[20%]"}
      />
    </div>
  )
}
