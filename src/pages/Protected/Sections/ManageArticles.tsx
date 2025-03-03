import Articles from "../../../components/Articles";
import PrimaryButton from "../../../components/PrimaryButton";
import SectionTitle from "../../../components/SectionTitle";

export default function ManageMedia() {
  const temp: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  function RenderMedia() {
    return temp.map((element) => (
      <Articles key={element} />
    ))
  }

  return (
    <div className='w-[78vw] relative left-[20vw] h-full flex flex-col gap-10 overflow-y-scroll pb-[10px]'>
      <SectionTitle title="Manage Articles" />

      <div className='flex flex-col w-[97%] h-[84%] overflow-hidden gap-y-4'>
        <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(200px,230px))] gap-4 overflow-y-scroll justify-center'>
          <RenderMedia />
        </div>
      </div>

      <PrimaryButton title="Add article" onBtnClick={() => { }} />
    </div>
  )
}
