import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { Video, IUser } from "@/types";
import NoResults from "@/components/NoResults";
import ProfileDetailVideos from "@/components/ProfileDetailVideos";
import Another from "@/components/Another";
import axios from "axios";
import { base_url } from "@/app/layout";


interface IProps{
    data: {
        user: IUser;
        userVideos: Video[];
        userLikedVideos: Video[];
    }
}

export default async function Page({
    params,
   }: {
    params: { id: string };
   }) {

    const {data}= await axios.get(`${base_url}/api/profile/${params.id}`)

    const { user, userVideos, userLikedVideos }: {user: IUser, userVideos: Video[], userLikedVideos: Video[]} = data;
    return (
        <div className='w-full'>
            <div className='flex gap-3 mb-4 bg-white w-full'>
            <div className='w-16 h-16 md:h-20 md:w-20'>
                  <Image alt='user-profile' src={ user.image } width={ 120 } height={ 120 }  className='rounded-full' />
                </div>

                <div className='flex flex-col justify-center'>
                  <p className='md:text-xl tracking-wider flex gap-1 items-center justify-center text-md font-bold text-black/70 lowercase'>{ user.userName.replace(" ", '') } <GoVerified className='text-blue-400'/></p>

                  <p className='capitalize text-gray-400 text-xs md:text-sm'>{ user.userName }</p>
                </div>
            </div>


            {/* <ProfileDetailVideos userVideos={ userVideos } userLikedVideos={ userLikedVideos } /> */}

            <Another userVideos={ userVideos } userLikedVideos={ userLikedVideos }/>
            
        </div>

    )
}