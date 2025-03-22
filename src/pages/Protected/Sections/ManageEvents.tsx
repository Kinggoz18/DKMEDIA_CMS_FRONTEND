import SectionTitle from "../../../components/SectionTitle";
import { Suspense, useEffect, useRef, useState } from "react";
import ConfirmComponent from "../../../components/ConfirmComponent";
import { EventList } from "../../../components/EventList";
import EventService from "../../../redux/Events/EventService";
import IEvent from "../../../interface/Redux/IEvent";
import { EventPriority } from "../../../enums/eventPriority";
import AddEventPopup from "../../../components/AddEventPopup";
import PrimaryButton from "../../../components/PrimaryButton";
import ThrowAsyncError, { toggleError } from "../../../components/ThrowAsyncError";
import ProcessingIcon from "../../../components/ProcessingIcon";

export default function ManageEvents() {
  const eventService = new EventService();

  const [isDeletePopup, setIsDeletePopup] = useState(false);
  const [eventToDelete, setEventToDelete] = useState("");
  const [isAddEventPopup, setIsAddEventPopup] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const errorRef = useRef<HTMLDivElement>(null);
  const [responseError, setResponseError] = useState("");


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
  async function onYesDeleteClick() {
    console.log("Deleting event with id: ", eventToDelete)
    try {
      await eventService.deleteEvent(eventToDelete);
      setIsDeletePopup(false)
      setEventToDelete("");
      await fetchEvents();
    } catch (error: any) {
      setIsDeletePopup(false)
      setEventToDelete("");
      handleThrowError(error?.message)
    }
  }

  /**
   * Cancel delete event action
   */
  function onNoDeleteClick() {
    setIsDeletePopup(false)
    setEventToDelete("");
  }

  /**
   * Toggle add event popup
   */
  function handleToggleAddEvent() {
    setIsAddEventPopup(true);
  }

  /**
   * Fetch all events
   */
  async function fetchEvents() {
    try {
      const data = await eventService.getAllEvents();
      setAllEvents(data)
    } catch (error: any) {
      console.log({ error })
      handleThrowError(error?.message)

    }
  }

  /**
  * Throw error
  * @param {*} errorMsg
  */
  const handleThrowError = (errorMsg: string) => {
    setResponseError(errorMsg);
    setTimeout(() => {
      toggleError(errorRef);
    }, 400);
  };

  useEffect(() => {
    fetchEvents()
  }, []);

  return (<>
    {isUploading && (
      <div className="flex items-center justify-center absolute text-lg-4 text-neutral-300 font-bold w-screen h-screen text-center z-30 bg-neutral-700/20 bg-opacity-30">
        <ProcessingIcon width={"40"} height={"40"}></ProcessingIcon>
      </div>
    )}
    <div className='w-[78vw] relative left-[21vw] h-full flex flex-col gap-10 overflow-y-scroll !pb-[40px] p-4'>
      {/* Uploading overlay */}

      <SectionTitle title="Manage events" />
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

      <PrimaryButton title="Add event" onBtnClick={handleToggleAddEvent} className="bg-primary-500 !text-neutral-100 rounded-xl" />

      {/* Throw error section section */}
      <ThrowAsyncError
        responseError={responseError}
        errorRef={errorRef}
        className={"!bottom-[10%] !left-[20%]"}
      />

      {/* Delete event section */}
      {isDeletePopup && <>
        <div className="h-[95%] w-[95%] bg-neutral-900/40 absolute z-10"></div>
        <ConfirmComponent
          message="Are you sure you want to delete this Event?"
          onNoClick={onNoDeleteClick}
          onYesClick={onYesDeleteClick}
        /></>}

      {/* Add event section */}
      {isAddEventPopup &&
        <>
          <div className="h-[95%] w-[95%] bg-neutral-900/40 absolute z-10"></div>
          <AddEventPopup closePopup={() => setIsAddEventPopup(false)} eventService={eventService} fetchEvents={fetchEvents} handleThrowError={handleThrowError} setIsUploading={setIsUploading} />
        </>}
    </div>
  </>

  )
}
