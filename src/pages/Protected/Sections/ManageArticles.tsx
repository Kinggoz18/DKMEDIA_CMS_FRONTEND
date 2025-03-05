import { useState } from "react";
import Articles from "../../../components/Articles";
import PrimaryButton from "../../../components/PrimaryButton";
import SectionTitle from "../../../components/SectionTitle";
import ArticleProps from "../../../interface/ArticleProps";
import ConfirmComponent from "../../../components/ConfirmComponent";
import UploadArticlePopup from "../../../components/UploadArticlePopup";

export default function ManageMedia() {
  const temp: ArticleProps[] = [
    {
      _id: "123",
      title: "Exploring Life & Business with Isaac Owolabi of Dkmedia305",
      articleLink: "https://voyagehouston.com/interview/exploring-life-business-with-isaac-owolabi-of-dkmedia305/"
    },
    {
      _id: "123",
      title: "Exploring Life & Business with Isaac Owolabi of Dkmedia305",
      articleLink: "https://voyagehouston.com/interview/exploring-life-business-with-isaac-owolabi-of-dkmedia305/"
    },
    {
      _id: "123",
      title: "Exploring Life & Business with Isaac Owolabi of Dkmedia305",
      articleLink: "https://voyagehouston.com/interview/exploring-life-business-with-isaac-owolabi-of-dkmedia305/"
    },
    {
      _id: "123",
      title: "Exploring Life & Business with Isaac Owolabi of Dkmedia305",
      articleLink: "https://voyagehouston.com/interview/exploring-life-business-with-isaac-owolabi-of-dkmedia305/"
    },
    {
      _id: "123",
      title: "Exploring Life & Business with Isaac Owolabi of Dkmedia305",
      articleLink: "https://voyagehouston.com/interview/exploring-life-business-with-isaac-owolabi-of-dkmedia305/"
    },
    {
      _id: "123",
      title: "Exploring Life & Business with Isaac Owolabi of Dkmedia305",
      articleLink: "https://voyagehouston.com/interview/exploring-life-business-with-isaac-owolabi-of-dkmedia305/"
    },
    {
      _id: "123",
      title: "Exploring Life & Business with Isaac Owolabi of Dkmedia305",
      articleLink: "https://voyagehouston.com/interview/exploring-life-business-with-isaac-owolabi-of-dkmedia305/"
    },
  ];
  const [isDeletePopup, setIsDeletePopup] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState("");
  const [isUploadArticlePopup, setIsUploadArticlePopup] = useState(false);

  /**
   * Trigger delete popup
   */
  function onDeleteClick(id: string) {
    if (!id)
      throw new Error("Id is missing");

    setIsDeletePopup(true);
    setArticleToDelete(id);
  }

  /**
   * Confirm delete article action
   */
  function onYesDeleteClick() {
    console.log("Deleting article with id: ", articleToDelete)
    setIsDeletePopup(false)
    setArticleToDelete("");
  }

  /**
   * Cancel delete article action
   */
  function onNoDeleteClick() {
    setIsDeletePopup(false)
    setArticleToDelete("");
  }


  /**
   * Upload article
   */
  function onUploadArticleClick() {
    console.log("Updating contact section")
    setIsUploadArticlePopup(true)
  }

  /**
 * Render articles
 * @returns 
 */
  function RenderArticles() {
    return temp.map((element, index) => (
      <Articles
        key={index}
        _id={element?._id}
        articleLink={element?.articleLink}
        onDeleteClick={() => onDeleteClick(element?._id ?? "")}
        title={element?.title}
      />
    ))
  }

  return (
    <div className='w-[78vw] relative left-[21vw] h-full flex flex-col gap-10 overflow-y-scroll pb-[10px]'>
      <SectionTitle title="Manage Articles" />

      <div className='flex flex-col w-[97%] h-[84%] overflow-hidden gap-y-4'>
        <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(200px,230px))] gap-4 overflow-y-scroll justify-center'>
          <RenderArticles />
        </div>
      </div>

      <PrimaryButton title="Add article" onBtnClick={onUploadArticleClick} />

      {isDeletePopup && <>
        <div className="h-full w-full bg-neutral-900/20 absolute z-10"></div>
        <ConfirmComponent
          message="Are you sure you want to delete this article?"
          onNoClick={onNoDeleteClick}
          onYesClick={onYesDeleteClick}
        /></>}

      {isUploadArticlePopup &&
        <>
          <div className="h-full w-full bg-neutral-900/20 absolute z-10"></div>
          <UploadArticlePopup closePopup={() => setIsUploadArticlePopup(false)} />
        </>}
    </div>
  )
}
