import { useState } from 'react';
import { SideNavBar } from '../../components/SideNavBar'
import ManageEvents from './Sections/ManageEvents';
import HomeSection from './Sections/HomeSection';
import ManageContactUs from './Sections/ManageContactUs';
import ManageArticles from './Sections/ManageArticles';
import ManageOrganizations from './Sections/ManageOrganizations';
import ManageMedia from './Sections/ManageMedia';
import HomeReturnSectionProps from '../../interface/HomeReturnSectionProps';

export default function Home() {
  const [currentPage, setCurrentPage] = useState("home");

  function ReturnSection(props: HomeReturnSectionProps) {
    const { currentPage } = props
    if (!currentPage) return;

    switch (currentPage) {
      case "home":
        return <HomeSection />
      case "Manage events":
        return <ManageEvents />
      case "Manage contact us":
        return <ManageContactUs />
      case "Manage articles":
        return <ManageArticles />
      case "Manage organizations":
        return <ManageOrganizations />
      case "Manage media":
        return <ManageMedia />
    }
  }

  return (
    <div className="h-screen w-screen bg-background p-4 fixed overflow-hidden flex flex-row top-0 text-neutral-100">

      <SideNavBar currentPage={currentPage} setCurrentPage={setCurrentPage}></SideNavBar>
      {/* Home section  */}
      <ReturnSection currentPage={currentPage} />
    </div>
  )
}
