import IContactUs from "../interface/Redux/IContactUs";
import ContactUsInquiry from "./ContactUsInquiry";

interface ContactUsInquiriesProps {
  allInquiries: IContactUs[]
  onDeleteClick: (id: string) => void;
}

export function ContactUsInquiriesList(props: ContactUsInquiriesProps) {
  const {
    allInquiries,
    onDeleteClick,
  } = props;

  return allInquiries.map((element) => (
    <ContactUsInquiry
      key={element?._id}
      lastName={element?.lastName}
      firstName={element?.firstName}
      subject={element?.subject}
      company={element?.company}
      email={element?.email}
      phone={element?.phone}
      message={element?.message}
      onDeleteClick={() => onDeleteClick(element?._id ?? "")}
    />
  ))

}