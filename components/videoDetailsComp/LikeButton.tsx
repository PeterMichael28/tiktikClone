"use client";

import { useState, useEffect } from "react";
import { MdFavorite } from "react-icons/md";
import useAuthStore from "@/store/authStore";
import axios from "axios";
import { base_url } from '@/utils/utils/constants';
import { Video } from "@/types";

interface IProps {
 post: Video;
 likes: any[];
}

const LikeButton = ({ likes, post }: IProps) => {
    const [isSSR, setIsSSR] = useState(true);
    useEffect(() => {
     setIsSSR(false);
    }, []);


 const { userProfile }: any = useAuthStore();
 const [alreadyLiked, setAlreadyLiked] = useState(false);
 const [allLikes, setAllLikes] = useState(likes);
 const filterLikes = allLikes?.filter(
  (like) => like._ref === userProfile?._id
 );
 


 useEffect(() => {
  if (filterLikes && filterLikes.length > 0) {
   setAlreadyLiked(true);
  } else {
   setAlreadyLiked(false);
  }
 }, [allLikes, filterLikes]);

//  console.log(allLikes)
//  console.log(post)

 const handleLike = async (like: boolean) => {
  if (userProfile !== null) {
   if (filterLikes && filterLikes.length > 0) {
    setAllLikes(
     allLikes?.filter(
      (like) => like._ref !== userProfile._id
     )
    );
    setAlreadyLiked(false);
    const { data } = await axios.put(
     `${base_url}/api/like`,
     {
      userId: userProfile._id,
      postId: post._id,
      like: false,
     }
    );
    setAllLikes([...data.likes]);
   } else {
    setAllLikes((pre) => [
     ...pre,
     { _ref: userProfile._id },
    ]);
    setAlreadyLiked(true);
    const { data } = await axios.put(
     `${base_url}/api/like`,
     {
      userId: userProfile._id,
      postId: post._id,
      like: true,
     }
    );

    setAllLikes([...data.likes]);
   }
  }
 };

 return (
  <div>
   {!isSSR && (
    <div className="gap-2 flex">
     {userProfile !== null && (
      <div className="mt-1 flex flex-col justify-center items-center cursor-pointer">
       {alreadyLiked ? (
        <div
         className="bg-[#f1f1f2] rounded-full p-2 md:p-3 text-[#f51997]"
         onClick={() => handleLike(true)}
        >
         {" "}
         <MdFavorite className="text-lg md:text-2xl" />
        </div>
       ) : (
        <div
         className="bg-[#f1f1f2] rounded-full p-2 md:p-3"
         onClick={() => handleLike(false)}
        >
         {" "}
         <MdFavorite className="text-lg md:text-2xl" />
        </div>
       )}
       <p className="text-md font-semibold">
        {allLikes?.length}
       </p>
      </div>
     )}
    </div>
   )}
  </div>
 );
};

export default LikeButton;
