import ExitProps from "../interface/ExitProps";

/**
 * Exit button component
 * @param className Additional styles to include.
 * @param onClick On click function 
 * @returns A JSX element
 */
const Exit = (props: ExitProps) => {
  const { className = "", onClick } = props;

  return (
    <div
      className={`h-[1.7rem] w-[1.7rem] bg-primary-500 relative p-2 mt-2 cursor-pointer rounded-md ${className}`}
      onClick={onClick}
    >
      <img
        className="h-full w-full rounded-12xs max-w-full overflow-hidden max-h-full"
        alt=""
        src="/exitIcon.svg"
      />
    </div>
  );
};

export default Exit;
