"use client"


import React, {useEffect, useState} from 'react'
import useAuthStore from "@/store/authStore";
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from "react-icons/go";
import { IUser } from "@/types";
import {useRouter} from 'next/navigation'



type Props = {}

const SuggestedAccounts = (props: Props) => {
 

  const [ isSSR, setIsSSR ] = useState( true );
  
 useEffect(() => {
  setIsSSR(false);
  }, []);

 const { allUsers, fetchAllUsers }: any = useAuthStore();
  useEffect(() => {fetchAllUsers()}, [fetchAllUsers])

  const router = useRouter()

  return (
    <>
    {!isSSR && <div className='lg:border-b-2 border-gray-200 pb-4 hidden lg:block'>
      <p className='text-gray-500 font-semibold m-3 mt-4 hidden lg:block'>Suggested Accounts</p>

      <div>
        {
          allUsers?.slice(0,6).map( (user: IUser) => (
            <Link href={`/profile/${user._id}`} key={user._id}>
              <div className='flex gap-3 hover:bg-[#f8f8f8] p-2 cursor-pointer font-semibold rounded'>
                <div className='w-8 h-8'>
                  <Image alt='user-profile' src={ user.image } width={ 34 } height={ 34 }  className='rounded-full' />
                </div>

                <div className='hidden lg:block '>
                  <p className='flex gap-1 items-center text-md font-bold text-black/70 lowercase'>{ user.userName.replace(" ", '') } <GoVerified className='text-blue-400'/></p>

                  <p className='capitalize text-gray-400 text-xs'>{ user.userName }</p>
                </div>
              </div>
            </Link>
          ))
        }
      </div>

    </div>}
    
    </>
  )
}

export default SuggestedAccounts