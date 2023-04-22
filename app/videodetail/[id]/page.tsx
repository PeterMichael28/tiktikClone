import { base_url } from "@/app/layout";
import Videos from "@/components/Videos";
import CancelBtn from "@/components/videoDetailsComp/CancelBtn";

import axios from "axios";
import VideoDetailRightSide from "@/components/videoDetailsComp/VideoDetailRightSide";

type Props = {};

export default async function Page({
 params,
}: {
 params: { id: string };
}) {
 const data = await axios.get(
  `${base_url}/api/post/${params.id}`
 );
 // console.log(data.data[0]._id)

 // if(!data) return null

 // console.log(data)
 // console.log(params.id)

 return (
  <div className="flex w-full bg-white absolute top-0 left-0 flex-wrap lg:flex-nowrap lg:gap-5">
   <div className="relative w-[1000px] h-full lg:w-9/12 flex justify-center items-center bg-black/50">
    <CancelBtn />
    <div className="relative">
     <div className="lg:h-screen h-[60vh] w-full flex justify-center items-center">
      <Videos
       post={data.data[0]}
       className="cursor-pointer w-full"
      />
     </div>
    </div>
   </div>

   <div className="relative w-[1000px] md:w-[900px] lg:w-[700px] lg:h-screen">
    <VideoDetailRightSide post={data.data[0]} />
   </div>
  </div>
 );
}

// const Page = async () => {

//   console.log(params.id)

//   return (
//     <div>
//         pages
//     </div>
//   )
// }

// export default Page
