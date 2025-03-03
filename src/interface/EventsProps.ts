import OrganizerProps from "./OrganizerProps";

export default interface EventsProps {
  title: string;
  date: string;
  image: string;
  priority: string;
  organizer: OrganizerProps;
  isUpcoming: boolean;
}