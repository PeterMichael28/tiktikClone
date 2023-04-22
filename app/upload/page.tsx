"use client";

import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { client } from "@/utils/utils/client";
import { SanityAssetDocument } from "@sanity/client";
import { topics } from "@/utils/utils/constants";
import useAuthStore from '@/store/authStore'
import { useRouter } from 'next/navigation';
import { base_url } from "../layout";


type Props = {};

const Upload = (props: Props) => {
 const [isLoading, setIsLoading] = useState(false);
 const [videoAsset, setVideoAsset] = useState<string>();
 const [wrongFileType, setWrongFileType] = useState(false)
 const [selectedVideo, setSelectedVideo] = useState<any>()
 const [captions, setCaptions] = useState('')
 const [category, setCategory] = useState(topics[0].name)

 const {userProfile}: {userProfile: any} = useAuthStore()

 const router = useRouter()

    const uploadVideo = async ( e: any ) => {
        setWrongFileType(false) 
       
     const selectedFile = e.target.files[0]
     const fileTypes = ['video/mp4', 'video/webm', 'video/ogg']

     
     if (fileTypes.includes(selectedFile.type)) {
        setVideoAsset(URL.createObjectURL(e.target.files[0]));
       setSelectedVideo(e.target.files[0])
       
        //  console.log(data)
            // setVideoAsset(data)
     } else {
         setWrongFileType(true)
         
     }

    
     
    }

    const postVideo = async () => {

        setIsLoading(true)
        if ( !selectedVideo ) {
            alert('there is no video to post')
            setIsLoading(false)
            return
        } else {
            const videoUpload = await client.assets.upload( 'file', selectedVideo, {
             contentType: selectedVideo.type,
             filename: selectedVideo.name
        } )

            const doc = {
                _type: 'post',
                caption: captions,
                video: {
                    _type: 'file',
                    asset: {
                        _type: 'reference',
                        _ref: videoUpload?._id
                    }
                },
                userId: userProfile?._id,
                postedBy: {
                    _type: 'postedBy',
                    _ref: userProfile?._id
                },
                topic: category
            }

            try{
                const data = await axios.post(`${base_url}/api/postvideo`, doc)
               
            setIsLoading(false)
            router.push('/')
            }catch {
                console.log('axiosError')
            setIsLoading(false)
            }
           
            

            // router.push('/')
        }
        // if ( captions && category && videoAsset ) {
            setIsLoading(false)
        // }
        // console.log(category, captions, videoAsset)
    }
    
    

 return (
  <div className="flex w-full h-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#f8f8f8] justify-center">
   <div className="bg-white rounded-lg  h-fit lg:h-[80vh] flex gap-10 flex-wrap justify-center items-center p-14 pt-6">
    <div>
     <div>
      <p className="text-2xl font-bold">Upload Video</p>
      <p className="text-md text-gray-400 mt-1">
       Post a video to your account
      </p>
     </div>

     <div className="border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-full md:w-[340px] p-10 cursor-pointer hover:border-red-200 hover:bg-gray-100 transition-all duration-200">
      
       <div>
        {videoAsset ? (
         <div>
            <video src={videoAsset} loop controls className='rounded-xl h-[300px] bg-black'></video>
         </div>
        ) : (
         <label className="cursor-pointer">
          <div className="flex flex-col items-center justify-center h-full">
           <div className="flex flex-col items-center justify-center">
            <p className="text-xl font-bold">
             <FaCloudUploadAlt className="text-6xl text-gray-300" />
            </p>
            <p className="text-xl font-semibold">
             Upload Video
            </p>
           </div>

           <p className="text-gray-400 text-center text-xs mt-2 leading-2">
            MP4 or WebM or ogg <br /> 70 x 1200 or higher{" "}
            <br /> up to 10 minutes <br /> less than 2gb
           </p>
           <p className="bg-[#f51997] text-center mt-10 rounded text-white text-md font-medium w-52 outline-none p-2">
            Select File
           </p>
          </div>

          <input type="file" name='upload-video' className="w-0 h-0" onChange={uploadVideo} />
         </label>
        )}
       </div>
     
      
      {wrongFileType && (
        <p className='text-center text-xl text-red-400 font-semibold mt-4 w-[250px]'>Please select a video file</p>
      )}
     </div>

    </div>
     <div className='flex flex-col gap-3 pb-10'>
        <label htmlFor="caption" className="text-md font-medium">Caption</label>
        <input type="text" id='caption' placeholder='This is a beautiful video'  value={captions} onChange={(e) => setCaptions(e.target.value)} className="rounded outline-none text-md border-2 border-gray-200 p-2 placeholder::text-gray-300 placeholder::text-sm"/>
        <label htmlFor="category" className="text-md font-medium">Choose a Category</label>
        <select name="" id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="outline-none border-2 border-gray-200 text-md capitalize p-2 rounded cursor-pointer">
            {topics.map((topic) => (
                <option value={topic.name} key={topic.name} className="outline-none capitalize text-gray-700 text-md p-2 hover:bg-slate-300">{topic.name }</option>
            ))}
        </select>

        <div className="flex gap-6 mt-10">
            <button 
                onClick={() => {
                    setVideoAsset('')
                    setCategory(topics[0].name)
                    setCaptions('')
                }} 
                type="button" 
                className="border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none">
                    Discard
            </button>

             <button onClick={postVideo} type="button" className={`bg-[#f51997] hover:bg-[transparent] hover:text-[#f51997] hover:border hover:border-[#f51997] transition-all duration-300 text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none`}>{isLoading ? 'Posting... ': 'Post'}</button>
        </div>
     </div>
   </div>
  </div>
 );
};

export default Upload;
