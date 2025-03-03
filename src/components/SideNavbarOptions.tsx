import NavBarSectionProps from '../interface/NavBarSectionProps'

export default function SideNavbarOptions(props: NavBarSectionProps) {
  const { title, onClick, isActive = true } = props;
  return (
    <div onClick={onClick} className={`cursor-pointer text-lg font-bold py-8 px-4 hover:bg-neutral-600 hover:text-neutral-200 ${!isActive ?
      "text-neutral-700  active:bg-neutral-800 active:text-neutral-200" :
      "bg-neutral-800 text-neutral-200 active:bg-neutral-800 active:text-neutral-200"}`}>
      {title}
    </div>
  )
}
