import Events from "../../../components/Events";
import SectionTitle from "../../../components/SectionTitle";

export default function ManageEvents() {
  const temp: number[] = [1, 2, 3, 4, 5, 6, 7];

  function RenderEvents() {
    return temp.map((element) => (
      <Events key={element} />
    ))
  }

  return (
    <div className='w-[78vw] relative left-[20vw] h-full flex flex-col gap-10 overflow-y-scroll pb-[10px]'>
      <SectionTitle title="Manage events" />
      {/* Upcoming event section */}
      <div className='flex flex-col overflow-hidden w-[97%] min-h-[300px] gap-y-4'>
        <div className='text-lg font-bold flex flex-row w-full'>
          <div>Upcoming events</div>
          <div className="justify-self-end place-self-end self-end right-7 absolute cursor-pointer hover:text-primary-500">All events</div>
        </div>
        <div className='overflow-x-scroll overflow-hidden gap-x-4 flex flex-row w-[100%]'>
          <RenderEvents />
        </div>
      </div>

      {/* Previous event section */}
      <div className='flex flex-col overflow-hidden w-[97%] min-h-[300px] h-fit gap-y-4'>
        <div className='text-lg font-bold'>Previous events</div>
        <div className='overflow-x-scroll overflow-hidden gap-x-4 flex flex-row w-[100%]'>
          <RenderEvents />
        </div>
      </div>

    </div>
  )
}
