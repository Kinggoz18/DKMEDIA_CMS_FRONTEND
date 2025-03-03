import ContactUsInquiry from "../../../components/ContactUsInquiry";

export default function ManageContactUs() {
  const temp: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  function RenderInquiries() {
    return temp.map((element) => (
      <ContactUsInquiry key={element} />
    ))
  }

  return (
    <div className='w-[78vw] relative left-[20vw] h-full flex flex-col gap-10 overflow-y-scroll pb-[10px]'>
      <div className='text-3xl font-bold'>Contact us</div>
      {/* Upcoming event section */}
      <div className='flex flex-col gap-y-4 overflow-hidden w-[97%] h-[300px] '>
        <div className="w-full flex flex-col gap-y-3 ">
          <div className='font-semibold'>Contact email</div>
          <input type="email" className="outline-none focus:outline-none py-2 px-7 w-[80%] min-w-[100px] overflow-x-scroll border-1 border-solid rounded-2xl bg-amber-50 text-neutral-900" />
        </div>

        <div className="w-full flex flex-col gap-y-3 ">
          <div className='font-semibold'>Tiktok link</div>
          <input type="text" className="outline-none focus:outline-none py-2 px-7 w-[80%] min-w-[100px] overflow-x-scroll  border-1 border-solid rounded-2xl bg-amber-50 text-neutral-900" />
        </div>

        <div className="w-full flex flex-col gap-y-3 ">
          <div className='font-semibold'>Instagram link</div>
          <input type="text" className="outline-none focus:outline-none py-2 px-7 w-[80%] min-w-[100px] overflow-x-scroll  border-1 border-solid rounded-2xl bg-amber-50 text-neutral-900" />
        </div>
      </div>

      {/* Upcoming event section */}
      <div className='flex flex-col overflow-hidden w-[97%] min-h-[300px] h-[400px] gap-y-4'>
        <div className='text-lg font-bold flex flex-row'>Submitted inquiries
          <div className="cursor-pointer absolute right-8 hover:text-primary-500">
            View all
          </div>
        </div>
        <div className='w-full overflow-y-scroll flex flex-col gap-y-4'>
          <RenderInquiries />
        </div>
      </div>
    </div>
  )
}
