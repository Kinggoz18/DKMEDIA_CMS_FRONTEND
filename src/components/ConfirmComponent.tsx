import ConfirmComponentProps from "../interface/ConfirmComponentProps";

export default function ConfirmComponent(props: ConfirmComponentProps) {
  const {
    message,
    onNoClick,
    onYesClick
  } = props;

  return (
    <div className="z-20 flex flex-col absolute w-[400px] h-[200px] bg-neutral-200 items-center py-8 gap-10 rounded-2xl font-semibold ml-auto mr-auto left-0 right-0 top-[25vh]">
      <div className="text-neutral-900 text-xl text-wrap w-[90%] text-center">
        {message}
      </div>
      <div className="flex flex-row gap-10">
        <div
          onClick={onYesClick}
          className="p-2 bg-neutral-600 px-8 rounded-2xl cursor-pointer hover:bg-neutral-700 active:bg-neutral-800">Yes</div>
        <div
          onClick={onNoClick}
          className="p-2 bg-primary-500 px-8 rounded-2xl cursor-pointer hover:bg-primary-500/80 active:bg-primary-500/90">No</div>
      </div>
    </div>
  )
}
