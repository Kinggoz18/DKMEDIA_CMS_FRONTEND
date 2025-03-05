import OrganizerProps from "../interface/OrganizerProps";
import DeleteIconBtn from "./DeleteIconBtn";

export default function Organizations(props: OrganizerProps) {
  const { name,
    logo,
    onDeleteClick, } = props;


  return (
    <div className='relative rounded-2xl grid grid-flow-row h-[200px] min-w-[230px] w-[230px] bg-neutral-100 justify-center items-center text-neutral-900'>
      <div className="flex flex-col items-center gap-3 w-full">
        <img src={logo} className="w-[79px] h-[79px]"></img>
        <div className="w-[200px] overflow-hidden whitespace-nowrap overflow-ellipsis">{name + name}</div>
      </div>
      <DeleteIconBtn onDeleteClick={onDeleteClick} className="bottom-2" />
    </div>
  )
}
