import { Video } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

import {GoVerified} from 'react-icons/go';
import Videos from './Videos';


type Props = {
  post: Video
}

const VideoCard = ({post}: Props) => {

  // console.log(post._id)
  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
      <div>
        <div className='flex gap-1 p-2 cursor-pointer font-semibold rounded items-center'>
          <div className='md:w-6 md:h-6 w-5 h-5 '>
            <Link href={`/profile/${post?.postedBy?._id}`} className='w-full h-full'>
              <>
              <Image alt='image' src={post.postedBy.image} width={20} height={20} className='rounded-full w-full h-full' />
              </>
            </Link>
            </div>

            <div>
            <Link href={`/profile/${post?.postedBy?._id}`}>
              <div className='flex items-center gap-1'>
                <p className='flex items-center gap-1 md:text-sm text-xs font-bold text-primary '>
                  { post.postedBy.userName } {' '}
                  <GoVerified className='text-blue-400 text-md'/>
                </p>
                {/* <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>{ post.postedBy.userName }</p> */}
              </div>
            </Link>
            </div>
        </div>
      </div>

      <div className="lg:ml-20 flex gap-4 relative">
   <div
    className="rounded-3xl"
   >
    <Link href={`/videodetail/${post._id}`}>
      
      <Videos post={ post } className="lg:w-[450px] h-[250px] md:h-[400px] lg:h-[400px] w-[250px] sm:h-[330px] sm:w-[390px] rounded-2xl cursor-pointer bg-gray-100"/>
    </Link>

    </div>
    </div>
    </div>
  )
}

export default VideoCard