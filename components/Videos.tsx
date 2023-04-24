"use client"

import { Video } from "@/types";
import Link from "next/link";
import React, { useState, useRef } from "react";



type Props = {
 post: Video;
 className: string
};

const Videos = ({ post, className }: Props) => {
 

 const videoRef = useRef<HTMLVideoElement>(null);

 const [vid, setVid] = useState<Video>(post)


 return (
     <video
      src={vid?.video?.asset?.url}
      loop
      ref={videoRef}
      autoPlay
      controls
      className={className}
     ></video>
 );
};

export default Videos;


