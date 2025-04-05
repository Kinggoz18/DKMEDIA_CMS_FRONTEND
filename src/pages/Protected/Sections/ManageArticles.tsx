import { useEffect, useRef, useState } from "react";
import Articles from "../../../components/Articles";
import PrimaryButton from "../../../components/PrimaryButton";
import SectionTitle from "../../../components/SectionTitle";
import ConfirmComponent from "../../../components/ConfirmComponent";
import UploadArticlePopup from "../../../components/UploadArticlePopup";
import IArticle from "../../../interface/Redux/IArticle";
import { ArticleService } from "../../../redux/Article/ArticleService";
import ThrowAsyncError, { toggleError } from "../../../components/ThrowAsyncError";
import ProcessingIcon from "../../../components/ProcessingIcon";

interface ArticlesListProps {
  allArticles: [IArticle],
  onDeleteClick: (id: string) => void
}

/**
* Render articles
* @returns 
*/
function ArticlesList(props: ArticlesListProps) {
  const { allArticles, onDeleteClick } = props;

  return allArticles.map((element, index) => (
    <Articles
      key={index}
      _id={element?._id}
      articleLink={element?.link}
      onDeleteClick={() => onDeleteClick(element?._id ?? "")}
      title={element?.title}
    />
  ))
}

export default function ManageMedia() {
  const articleService = new ArticleService();
  const [isDeletePopup, setIsDeletePopup] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState("");
  const [isUploadArticlePopup, setIsUploadArticlePopup] = useState(false);


  const [isUploading, setIsUploading] = useState(false);

  const errorRef = useRef<HTMLDivElement>(null);
  const [responseError, setResponseError] = useState("");

  const [articleData, setArticleData] = useState<[IArticle]>([{
    _id: "",
    title: "",
    link: ""
  }]);

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
  async function onYesDeleteClick() {
    try {
      await articleService.deleteArticle(articleToDelete);
      setIsDeletePopup(false)
      setArticleToDelete("");
      await fetchAllArticles();
    } catch (error: any) {
      setIsDeletePopup(false)
      setArticleToDelete("");
      handleThrowError(error?.message)
    }
  }

  /**
   * Cancel delete article action
   */
  function onNoDeleteClick() {
    setIsDeletePopup(false)
    setArticleToDelete("");
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

  /**
   * Upload article
   */
  function onUploadArticleClick() {
    setIsUploadArticlePopup(true)
  }

  /**
   * Fetch all articles
   */
  async function fetchAllArticles() {
    const allArticles = await articleService.getAllArticle();
    setArticleData(allArticles)
  }

  useEffect(() => {
    fetchAllArticles();
  }, []);

  if (articleData[0]?._id === "") return;

  return (
    <>
      {isUploading && (
        <div className="flex items-center justify-center absolute text-lg-4 text-neutral-300 font-bold w-screen h-screen text-center z-30 bg-neutral-700/20 bg-opacity-30">
          <ProcessingIcon width={"40"} height={"40"}></ProcessingIcon>
        </div>
      )}

      <div className='w-[78vw] relative left-[21vw] h-full flex flex-col gap-10 overflow-y-scroll pb-[40px] p-4'>
        <SectionTitle title="Manage Articles" />

        <div className='flex flex-col w-[97%] h-[84%] overflow-hidden gap-y-4'>
          <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(200px,230px))] gap-4 overflow-y-scroll justify-center'>
            <ArticlesList allArticles={articleData} onDeleteClick={onDeleteClick} />
          </div>
        </div>

        <PrimaryButton title="Add article" onBtnClick={onUploadArticleClick} />

        {isDeletePopup && <>
          <div className="h-[98%] w-[98%] bg-neutral-900/20 absolute z-10"></div>
          <ConfirmComponent
            message="Are you sure you want to delete this article?"
            onNoClick={onNoDeleteClick}
            onYesClick={onYesDeleteClick}
          /></>}

        {isUploadArticlePopup &&
          <>
            <div className="h-[98%] w-[98%] bg-neutral-900/20 absolute z-10"></div>
            <UploadArticlePopup
              closePopup={() => setIsUploadArticlePopup(false)}
              setIsUploading={setIsUploading}
              handleThrowError={handleThrowError}
              fetchArticles={fetchAllArticles}
              articleService={articleService}
            />
          </>}

        {/* Throw error section section */}
        <ThrowAsyncError
          responseError={responseError}
          errorRef={errorRef}
          className={"!bottom-[10%] !left-[20%]"}
        />
      </div>
    </>
  )
}
