import Organizations from "./Organizations";
import IOrganizer from "../interface/Redux/IOrganizer";

interface OrganizationListProps {
  allOrganizations: [IOrganizer],
  onDeleteClick: (id: string) => void
}

export default function OrganizationList(props: OrganizationListProps) {
  const {
    onDeleteClick,
    allOrganizations
  } = props;

  return allOrganizations.map((element, index) => (
    <Organizations key={index}
      name={element?.name}
      logo={element?.logo}
      onDeleteClick={() => onDeleteClick(element?._id ?? "")}
    />
  ))
}
