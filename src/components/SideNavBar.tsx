import { JSX } from "react";
import dkMediaLogo from "../assets/dkMediaLogo.png";
import SideNavbarOptions from "./SideNavbarOptions";
import NavBarProps from "../interface/NavBarProps";
import { useNavigate } from "react-router";

export function SideNavBar(props: NavBarProps): JSX.Element {
  const { currentPage, setCurrentPage } = props;
  const navigate = useNavigate();

  /**
   * Side navbar options
   */
  const options = [
    {
      title: "Manage events",
      isActive: currentPage === "Manage events" ? true : false,
      onClick: () => {
        setCurrentPage("Manage events")
      }
    },
    {
      title: "Manage media",
      isActive: currentPage === "Manage media" ? true : false,
      onClick: () => {
        setCurrentPage("Manage media")
      }
    },
    {
      title: "Manage organizations",
      isActive: currentPage === "Manage organizations" ? true : false,
      onClick: () => {
        setCurrentPage("Manage organizations")
      }
    },
    {
      title: "Manage articles",
      isActive: currentPage === "Manage articles" ? true : false,
      onClick: () => {
        setCurrentPage("Manage articles")
      }
    },
    {
      title: "Manage contact us",
      isActive: currentPage === "Manage contact us" ? true : false,
      onClick: () => {
        setCurrentPage("Manage contact us")
      }
    },
  ]

  /**
   * Navigate back to the home page
   */
  const onLogoClick = () => {
    if (currentPage != "home") {
      setCurrentPage("home")
    }
  }


  /**
   * Navigate back to the home page
   */
  const onLogoutClick = () => {
    navigate("/login")

  }


  /**
   * Render the side navbar options
   * @returns 
   */
  function RenderSections(): JSX.Element[] {
    return options.map((section, index) => (
      <SideNavbarOptions key={index} title={section.title} isActive={section.isActive} onClick={section.onClick} />
    ))
  }

  return (
    <div className="min-w-[200px] w-[20vw] h-full absolute overflow-hidden bg-neutral-200 top-0 left-0 flex flex-col py-4 z-10">
      <img src={dkMediaLogo} alt="" className="w-[80%] relative cursor-pointer" onClick={onLogoClick} />

      <div className="flex flex-col mt-[120px] relative" >
        <RenderSections />
      </div>

      <div onClick={onLogoutClick} className="absolute bottom-0 text-neutral-900 cursor-pointer text-lg font-bold  py-8 px-4 hover:bg-neutral-600 hover:text-neutral-200 w-full">Logout</div>
    </div>
  )
}