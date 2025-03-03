import ButtonProps from "../interface/ButtonProps";

export default function PrimaryButton(props: ButtonProps) {
  const {
    title,
    onBtnClick
  } = props;

  return (
    <div onClick={onBtnClick} className="cursor-pointer w-fit py-2 px-10 bg-amber-50 text-neutral-900 font-bold self-center hover:bg-neutral-800 hover:text-neutral-200 active:bg-neutral-600 active:text-neutral-200">{title}</div>
  )
}
