import { JSX } from "react";
import ButtonProps from "../interface/ButtonProps";
import googleLogo from "../assets/googleLogo.png";

export function GoogleLoginBtn(props: ButtonProps): JSX.Element {
  const {
    onBtnClick,
    title
  } = props;

  return <div onClick={() => onBtnClick()} className={"min-w-[400px] w-[50%] flex flex-row items-center font-bold rounded-2xl justify-center gap-x-4 p-4 bg-primary-500 hover:bg-primary-500/50 hover:outline-neutral-300 hover:outline-1 text-xl cursor-pointer"}>
    <img src={googleLogo} className="h-[40px] w-[40px]"></img>
    {title}
  </div>
}