import { Suspense, useEffect, useState } from "react";
import ConfirmComponent from "../../../components/ConfirmComponent";
import EventService from "../../../redux/Events/EventService";
import { EventList } from "../../../components/EventList";
import IEvent from "../../../interface/Redux/IEvent";
import { EventPriority } from "../../../enums/eventPriority";


export default function HomeSection() {
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") ?? "") : "";
  const eventService = new EventService();

  const [isDeletePopup, setIsDeletePopup] = useState(false);
  const [_eventToDelete, setEventToDelete] = useState("");
  // const [isAddEventPopup, setIsAddEventPopup] = useState(false);
  const [allEvents, setAllEvents] = useState<[IEvent]>([{
    _id: "",
    title: "",
    date: "",
    image: "",
    priority: EventPriority.Regular,
    organizer: {
      name: "",
      logo: "",
    },
    ticketLink: "",
  }])

  /**
  * Trigger delete popup
  */
  function onDeleteClick(id: string) {
    if (!id)
      throw new Error("Id is missing");

    setIsDeletePopup(true);
    setEventToDelete(id);
  }

  /**
   * Confirm delete event action
   */
  function onYesDeleteClick() {
    setIsDeletePopup(false)
    setEventToDelete("");
  }

  /**
   * Cancel delete event action
   */
  function onNoDeleteClick() {
    setIsDeletePopup(false)
    setEventToDelete("");
  }

  /**
   * Fetch all events
   */
  async function fetchEvents() {
    try {
      const data = await eventService.getAllEvents();
      setAllEvents(data)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, []);

  return (
    <div className='w-[78vw] relative left-[21vw] h-full flex flex-col gap-10 overflow-y-scroll pb-[10px] p-4'>
      <div className='text-3xl font-bold'>Welcome {user?.displayName},</div>
      <div className='text-xl font-bold'>Website visits this month 1,500</div>
      {/* Upcoming event section */}
      <div className='flex flex-col overflow-hidden w-[97%] min-h-[300px] gap-y-4'>
        <div className='text-lg font-bold flex flex-row w-full'>
          <div>Upcoming events</div>
          {/* <div className="justify-self-end place-self-end self-end right-7 absolute cursor-pointer hover:text-primary-500">All events</div> */}
        </div>
        <div className='overflow-x-scroll overflow-hidden gap-x-4 flex flex-row w-[100%]'>
          <Suspense fallback={<p>Fetching events...</p>}>
            <EventList onDeleteClick={onDeleteClick} allEvents={allEvents} isUpcomingSection={true} />
          </Suspense>
        </div>
      </div>

      {/* Previous event section */}
      <div className='flex flex-col overflow-hidden w-[97%] min-h-[300px] h-fit gap-y-4'>
        <div className='text-lg font-bold'>Previous events</div>
        <div className='overflow-x-scroll overflow-hidden gap-x-4 flex flex-row w-[100%]'>
          <Suspense fallback={<p>Fetching events...</p>}>
            <EventList onDeleteClick={onDeleteClick} allEvents={allEvents} isUpcomingSection={false} />
          </Suspense>
        </div>
      </div>

      {isDeletePopup && <>
        <div className="h-full w-full bg-neutral-900/20 absolute z-10"></div>
        <ConfirmComponent
          message="Are you sure you want to delete this Event?"
          onNoClick={onNoDeleteClick}
          onYesClick={onYesDeleteClick}
        /></>}
    </div>
  )
}
