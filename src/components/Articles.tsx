import ArticleProps from "../interface/ArticleProps";
import DeleteIconBtn from "./DeleteIconBtn";

export default function Articles(props: ArticleProps) {
  const {
    title,
    articleLink,
    onDeleteClick,
  } = props;

  return (
    <div className='relative flex flex-col h-[170px] min-w-[230px] max-w-[230px] bg-neutral-100 p-2 items-center justify-center'>
      <div className="text-neutral-900 font-semibold w-[200px] overflow-hidden overflow-ellipsis whitespace-nowrap">{title}</div>
      <p className="w-[200px] overflow-hidden overflow-ellipsis whitespace-nowrap text-blue-700 cursor-pointer">
        <a href={articleLink} target="blank">
          {articleLink}
        </a>
      </p>
      <DeleteIconBtn onDeleteClick={onDeleteClick} className="bottom-2" />
    </div >
  )
}
