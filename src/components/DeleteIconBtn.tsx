import deleteIcon from '../assets/deleteIcon.svg';
import DeleteIconBtnProps from '../interface/DeleteIconBtnProps';

export default function DeleteIconBtn(props: DeleteIconBtnProps) {
  const { onDeleteClick, className } = props;
  return (
    <img onClick={onDeleteClick} src={deleteIcon} className={`h-[24px] absolute right-6 cursor-pointer ${className}`}></img>
  )
}
