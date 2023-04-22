import React from "react";
import { MdOutlineVideocamOff } from "react-icons/md";
import { BiCommentX } from "react-icons/bi";
import { FaUserSlash } from "react-icons/fa";
type Props = {
 text: string;
};

const NoResults = ({ text }: Props) => {
 return (
  <div className="flex flex-col justify-center items-center h-full w-full">
   <p className="text-8xl">
    {text === "No comments yet! Be the first to comment" ? (
     <BiCommentX />
    ) : text.includes("Accounts") ? (
     <FaUserSlash />
    ) : (
     <MdOutlineVideocamOff />
    )}
   </p>
   <p className="text-lg text-center text-gray-400">
    {text}
   </p>
  </div>
 );
};

export default NoResults;
