import { ISubscription } from "../interface/Redux/ISubscription";
import DeleteIconBtn from "./DeleteIconBtn";

interface subscriptionListProps {
  allSubscriptions: [ISubscription]
  onDeleteClick: (id: string) => void
}

export default function SubscriptionList(props: subscriptionListProps) {
  const { allSubscriptions, onDeleteClick } = props;

  return allSubscriptions.map((element) => (
    <div
      key={element?._id}
      className={`relative min-w-[300px] text-neutral-900 bg-neutral-100 rounded-md flex flex-col p-2 gap-y-1  h-[100px]`}
    >
      <DeleteIconBtn onDeleteClick={() => onDeleteClick(element?._id)} />
      <div className="flex flex-row">
        <div className="font-semibold pr-2">Name:</div>
        {element?.firstName + " " + element?.lastName}
      </div>
      <div className="flex flex-row gap-x-1">
        <div className="font-semibold pr-2">Contact:</div>
        <div className="border-neutral-400 pr-2">{element?.email}</div>
      </div>

    </div>
  ))
}