import Image from 'next/image'
import { Inter } from 'next/font/google'
import axios from 'axios'
import { Video } from '@/types';
import VideoCard from '@/components/VideoCard';
import NoResults from '@/components/NoResults';
import { base_url } from '@/utils/utils/constants';
const inter = Inter({ subsets: ['latin'] })




export default async function Home({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {

let res: any;
  // console.log(searchParams.topics)
  if ( searchParams.topics ) {
     res = await axios.get(`${base_url}/api/discover/${searchParams.topics}`)
  } else {
    res = await axios.get(`${base_url}/api/post`)
  }
  

  const videos = res.data

  return (
    <main className={`${inter.className} flex flex-col gap-10 videos h-full`}>
      {
        videos.length ? (
          videos.map( ( video: Video ) => (
            <VideoCard post={video} key={video._id} />
          )) 
        ) : (
          <NoResults text={`No Videos ${searchParams.topics && 'for this category'  }`} />
        )
      }
    </main>
  )
}


