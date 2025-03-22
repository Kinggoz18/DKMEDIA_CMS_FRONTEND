import Events from "./Events";
import IEvent from "../interface/Redux/IEvent";

interface RenderEventsProps {
  isUpcomingSection: boolean,
  allEvents: [IEvent]
  onDeleteClick: (id: string) => void;
}

export function EventList(props: RenderEventsProps) {
  const {
    allEvents,
    isUpcomingSection,
    onDeleteClick,
  } = props;

  return <>{
    allEvents.map((element, index) => {
      const isUpcoming = new Date(element.date).getTime() > new Date().getTime();
      if (!isUpcoming === isUpcomingSection) return null;

      return <Events
        key={index}
        _id={element._id}
        title={element?.title}
        date={element?.date}
        image={element?.image}
        priority={element?.priority}
        organizer={element?.organizer}
        isUpcoming={isUpcoming}
        onDeleteClick={() => onDeleteClick(element?._id ?? "")}
      />
    })
  }</>

}