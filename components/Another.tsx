"use client"
import { Video, IUser } from "@/types";
import { useState, useEffect } from 'react';
import VideoCard from '@/components/VideoCard';
import NoResults from "@/components/NoResults";


interface IProps {
    userLikedVideos: Video[];
    userVideos: Video[];
}

const Another = ({userVideos, userLikedVideos}: IProps) => {

     const [current, setCurrent] = useState<string>('video')
    const [videoList, setVideoList] = useState<Video[]>([])

    

    useEffect( () => {
        if ( current === 'video') {
            setVideoList(userVideos)
        } else if ( current === 'liked' ) {
            setVideoList(userLikedVideos)
        } else {
            return;
        }
    }, [current, userLikedVideos, userVideos])


    const videos: string = (current === 'video') ? 'border-b-2 border-black' : 'text-gray-400'
    const liked: string = (current === 'liked') ? 'border-b-2 border-black' : 'text-gray-400'

    return (
        <div>
               <div className='flex gap-10 my-10 border-b-2 border-gray-200 bg-white w-full'>
                <p className={ `text-lg font-semibold cursor-pointer  mt-2 ${videos}` } onClick={() => setCurrent('video')}>
                    Videos
                </p>
                <p className={ `text-lg font-semibold cursor-pointer  mt-2 ${liked}` } onClick={() => setCurrent('liked')}>
                    liked
                </p>
                </div>

                <div className='flex gap-6 flex-wrap md:justify-start'>
                { videoList.length > 0 ? 
                    videoList.map( ( video: Video, i: number ) => (
                            <VideoCard post={video} key={i} />
                        ))
                    // <div>Loading...</div>
                    : <NoResults text={ `No ${current === 'liked' ? 'liked' : ''} videos yet` } />}
                </div>
        </div>
    )
}


export default Another;