"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { Video } from "@/types";
import useAuthStore from "@/store/authStore";
import LikeButton from "@/components/videoDetailsComp/LikeButton";
import Comments from "@/components/videoDetailsComp/Comments";
import axios from "axios";
import { base_url } from "@/app/layout";
import {useRouter} from 'next/navigation'
type Props = {
 post: Video;
};

const VideoDetailRightSide = ({ post }: Props) => {
 const { userProfile }: any = useAuthStore();

    const router = useRouter()
 useEffect(() => {
     if ( !userProfile ) {
        alert('please login to continue')
        router.push('/')
    }
 }, [userProfile])
 return (
  <div className="mt-10 lg:mt-2 h-full">
   <div className="flex gap-2 p-2 cursor-pointer font-semibold rounded items-center">
    <div className="w-7 h-7 ">
     <Link href="/" className="w-full h-full">
      <>
       <Image
        alt="image"
        src={post?.postedBy?.image}
        width={20}
        height={20}
        className="rounded-full w-full h-full"
       />
      </>
     </Link>
    </div>

    <div>
     <Link href="/">
      <div className="flex flex-col gap-1">
       <p className="flex items-center gap-1 md:text-sm text-sm font-bold text-primary ">
        {post?.postedBy?.userName}{" "}
        <GoVerified className="text-blue-400 text-md" />
       </p>
      </div>
     </Link>
    </div>
   </div>

   <p className="px-10 text-md text-gray-600">
    {post?.caption}
   </p>

   <div className="mt-8 lg:mt-3 px-10">
    <LikeButton likes={post?.likes} post={post} />
   </div>

   <Comments post={post}/>
  </div>
 );
};

export default VideoDetailRightSide;
