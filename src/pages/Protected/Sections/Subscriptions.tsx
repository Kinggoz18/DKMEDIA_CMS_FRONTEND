import { Suspense, useEffect, useRef, useState } from "react";
import ConfirmComponent from "../../../components/ConfirmComponent";
import SubscriptionList from "../../../components/SubscriptionList";
import SubscriptionService from "../../../redux/Subscription/SubscriptionService";
import { ISubscription } from "../../../interface/Redux/ISubscription";
import ThrowAsyncError, { toggleError } from "../../../components/ThrowAsyncError";


export default function Subscriptions() {
  const subscriptionService = new SubscriptionService();

  const [isDeletePopup, setIsDeletePopup] = useState(false);
  const [subscriptionToDelete, setSubscriptionToDelete] = useState("");
  const errorRef = useRef<HTMLDivElement>(null);
  const [responseError, setResponseError] = useState("");

  const [allSubscriptions, setAllSubscriptions] = useState<[ISubscription]>([{
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
  }]);

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

  /**
   * Trigger delete popup
   */
  async function onDeleteClick(id: string) {
    if (!id)
      throw new Error("Id is missing");

    setIsDeletePopup(true);
    setSubscriptionToDelete(id);
  }

  /**
   * Confirm delete subscription action
   */
  async function onYesDeleteClick() {
    console.log("Deleting subscription with id: ", subscriptionToDelete)
    const response = await subscriptionService.deleteSubscription(subscriptionToDelete);
    setSubscriptionToDelete("");

    if (response !== "Subscription deleted") {
      handleThrowError("Failed to delete media")
    }
    await fetchSubscriptions()
    setIsDeletePopup(false)
  }

  /**
   * Cancel delete subscription action
   */
  function onNoDeleteClick() {
    setIsDeletePopup(false)
    setSubscriptionToDelete("");
  }


  async function fetchSubscriptions() {
    const allSubscriptions = await subscriptionService.getAllSubscription();
    setAllSubscriptions(allSubscriptions);
  }

  useEffect(() => {
    fetchSubscriptions()
  }, [])

  console.log({ allSubscriptions })

  if (allSubscriptions[0]?._id === "") return;

  return (
    <div className='w-[78vw] relative left-[21vw] h-full flex flex-col gap-10 overflow-y-scroll pb-[10px] p-4'>
      <div className='text-3xl font-bold'>Manage subscriptions</div>

      {/* Contact us inquiries section */}
      <div className='flex flex-col overflow-hidden w-[97%] min-h-[300px] h-[90%] gap-y-4'>
        <div className='text-lg font-bold flex flex-row'>Subscriptions</div>

        <div className="cursor-pointer absolute right-8 hover:text-primary-500 text-lg">
          Total:{" " + allSubscriptions.length}
        </div>

        <div className='w-full flex flex-col gap-y-4 overflow-hidden overflow-y-scroll'>
          <Suspense fallback={<p>Fetching subscriptions...</p>}>
            <SubscriptionList
              allSubscriptions={allSubscriptions}
              onDeleteClick={onDeleteClick}
            />
          </Suspense>
        </div>
      </div>

      {isDeletePopup && <>
        <div className="h-full w-full bg-neutral-900/20 absolute z-10"></div>
        <ConfirmComponent
          message="Are you sure you want to delete this subscription?"
          onNoClick={onNoDeleteClick}
          onYesClick={onYesDeleteClick}
        /></>}

      {/* Throw error section section */}
      <ThrowAsyncError
        responseError={responseError}
        errorRef={errorRef}
        className={"!bottom-[10%] !left-[20%]"}
      />
    </div>
  )
}
