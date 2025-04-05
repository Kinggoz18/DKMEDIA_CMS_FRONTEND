import EventsProps from "../interface/EventsProps";
import DeleteIconBtn from "./DeleteIconBtn";

export default function Events(props: EventsProps) {
  const {
    _id,
    title,
    date,
    image,
    organizer,
    isUpcoming,
    onDeleteClick, } = props;

  if (!_id || _id === "") {
    return null;
  }
  const datetime = date;
  const [newDate, time] = datetime.split("T");

  return (
    <div className='relative h-[250px] min-w-[250px] bg-neutral-100'>
      <div className="h-full w-full bg-neutral-900/50 absolute z-10 text-neutral-50 p-4 gap-y-4 flex flex-col">
        <div className="relative text-2xl font-bold text-center">
          {title}
        </div>

        <div className="relative text-xl font-bold text-center flex flex-col gap-y-1">
          <span>{newDate}</span>
          <span>{time}</span>
        </div>

        <div className='relative rounded-md grid grid-flow-row min-w-full bg-neutral-100/60 justify-center items-center text-neutral-900 p-2'>

          <div className="flex flex-col gap-3 w-full items-center">
            <img src={organizer?.logo} className="w-[49px] h-[49px] rounded-full"></img>
            <div className="w-[200px] overflow-hidden whitespace-nowrap overflow-ellipsis font-semibold">{organizer.name}</div>
          </div>
        </div>

        {isUpcoming &&
          <div className='absolute bottom-0 left-0 min-w-full w-full bg-neutral-100/30 justify-center items-center text-neutral-900'>
            <DeleteIconBtn onDeleteClick={onDeleteClick} className="!relative !left-[87%]" />
          </div>}

      </div>
      <img src={image === "" ? undefined : image} alt={"Event image"} className="absolute w-full h-full top-0 object-cover" />
    </div>
  )
}
