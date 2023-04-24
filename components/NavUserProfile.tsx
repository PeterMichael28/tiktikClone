"use client";

import React, { useState, useEffect } from "react";
import useAuthStore from "@/store/authStore";
import {
 GoogleLogin,
 googleLogout,
} from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { AiOutlineLogout } from "react-icons/ai";

import { IoMdAdd } from "react-icons/io";
import { createOrGetUser } from "@/utils/utils/index";
import Image from "next/image";
import Link from "next/link";
import { IUser } from "@/types";
import {useRouter} from 'next/navigation'

type Props = {
    userProfile: any;
    addUser: ( user: any ) => any;
    removeUser: () => any;
};

const NavUserProfile = () => {
  const [ isSSR, setIsSSR ] = useState( true );
  
  useEffect(() => {
   setIsSSR(false);
   }, []);



 const {
  userProfile,
  addUser,
  removeUser,
}: Props = useAuthStore();

 const errorMessage = () => {
  console.log("Error");
 };

 const router = useRouter();




 return (
  <>
  {!isSSR && (
        <div>
        {userProfile? (
         <div className="flex gap-5 md:gap-10">
          <Link href="/upload">
           <button className="border-2 px-2 py-1 md:px-4 text-md font-semibold flex items-center gap-2">
            <IoMdAdd className="text-xl" />{" "}
            <span className="hidden md:block">Upload</span>
           </button> 
          </Link>
     
          {userProfile?.image && (
           <Link href={`/profile/${userProfile?._id}`}>
            <>
             <Image
              alt="image"
              src={userProfile?.image}
              width={35}
              height={35}
              className="rounded-full cursor-pointer"
             />
            </>
           </Link>
          )}
     
          <button
           className="px-2"
           onClick={() => {
            googleLogout();
            removeUser();
            router.push('/')
           }}
          >
           <AiOutlineLogout color="red" fontSize={21} />
          </button>
         </div>
        ) : (
         <GoogleLogin
          onSuccess={(response) =>
           createOrGetUser(response, addUser)
          }
          onError={errorMessage}
          text="signin"
         />
        )}
       </div>
  )}
  </>


 );
}; 

export default NavUserProfile;
