import { useState } from 'react';
import { SideNavBar } from '../../components/SideNavBar'
import ManageEvents from './Sections/ManageEvents';
import HomeSection from './Sections/HomeSection';
import ManageContactUs from './Sections/ManageContactUs';
import ManageArticles from './Sections/ManageArticles';
import ManageOrganizations from './Sections/ManageOrganizations';
import ManageMedia from './Sections/ManageMedia';
import HomeReturnSectionProps from '../../interface/HomeReturnSectionProps';
import AboutUs from './Sections/AboutUs';
import Subscriptions from './Sections/Subscriptions';

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
    case "About us":
      return <AboutUs />
    case "Subscription":
      return <Subscriptions />
  }
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div className="h-screen w-screen bg-background fixed overflow-hidden flex flex-row top-0 text-neutral-100">

      <SideNavBar currentPage={currentPage} setCurrentPage={setCurrentPage}></SideNavBar>
      {/* Home section  */}
      <ReturnSection currentPage={currentPage} />
    </div>
  )
}
