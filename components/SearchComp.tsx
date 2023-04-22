"use client";
import { Video, IUser } from "@/types";
import { useState } from "react";
import NoResults from "@/components/NoResults";
import VideoCard from "@/components/VideoCard";
import useAuthStore from "@/store/authStore";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import Image from "next/image";

interface IProps {
 data: Video[];
 search: string;
}

const SearchComp = ({ data, search }: IProps) => {
 const [current, setCurrent] = useState<string>("accounts");
 const [videoList, setVideoList] = useState<Video[]>([]);

 const { allUsers }: any = useAuthStore();

console.log(allUsers)

 const accounts: string =
  current === "accounts"
   ? "border-b-2 border-black"
   : "text-gray-400";
 const videos: string =
  current === "videos"
   ? "border-b-2 border-black"
   : "text-gray-400";

 const searchedAccountsResults = allUsers.filter(
  (users: IUser) =>
   users.userName
    .toLowerCase()
    .includes(search.toLowerCase())
 );

 // useEffect( () => {
 //     if ( current === 'video') {
 //         setVideoList(userVideos)
 //     } else if ( current === 'liked' ) {
 //         setVideoList(userLikedVideos)
 //     } else {
 //         return;
 //     }
 // }, [current, userLikedVideos, userVideos])

 return (
  <div>
   <div className="flex gap-10 my-10 border-b-2 border-gray-200 bg-white w-full">
    <p
     className={`text-lg font-semibold cursor-pointer  mt-2 ${accounts}`}
     onClick={() => setCurrent("accounts")}
    >
     Accounts
    </p>
    <p
     className={`text-lg font-semibold cursor-pointer  mt-2 ${videos}`}
     onClick={() => setCurrent("videos")}
    >
     Videos
    </p>
   </div>

   {current === "accounts" ? (
    <div className="md:mt-16 flex flex-col space-y-10">

      
     {searchedAccountsResults &&
     searchedAccountsResults.length > 0 ? (
      searchedAccountsResults.map(
       (user: IUser, i: number) => (
        <Link
         href={`/profile/${user?._id}`}
         className=""
         key={i}
        >
            <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200 '>
            <div className="w-10 h-10">
          <Image
           alt="user-profile"
           src={user?.image}
           width={50}
           height={50}
           className="rounded-full"
          />
         </div>

         <div className="flex flex-col gap-1">
          <p className="flex gap-1 items-center text-sm md:text-md font-bold text-black/50 capitalize">
           <span>
            {user?.userName}
            {/* {comment?.postedBy?.userName || comment?.userName} */}
           </span>
           <GoVerified className="text-blue-400" />
          </p>

          <p className='capitalize text-gray-400 text-sm'>{ user.userName }</p>
         </div>
          </div>
        </Link>
      
       )
      )
     ) : (
      <NoResults
       text={`No Accounts Results for ${search}`}
      />
     )}
    </div>
   ) : (
    <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
     {data && data.length > 0 ? (
      data.map((video: Video, i: number) => (
       <VideoCard post={video} key={i} />
      ))
     ) : (
      <NoResults text={`No Video Results for ${search}`} />
     )}
    </div>
   )}
  </div>
 );
};

export default SearchComp;
