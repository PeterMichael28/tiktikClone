"use client";

import Image from "next/image";
import Link from "next/link";
import NavUserProfile from "./NavUserProfile";
import SearchForm from "./SearchForm";





type Props = {};

const Navbar = (props: Props) => {


    
  
 return (
   
    <div className="w-full">
        <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
        <Link href="/">
            <div className="w-[100px] md:w-[130px]">
            <Image
            className="cursor-pointer"
            src={"/tiktik-logo.png"}
            alt="image"
            width={100}
            height={37}
            />
            </div>
        </Link>

        {/* search form */}
        <SearchForm />
       
        <NavUserProfile />
     
        </div>
         
    </div>
    
 );
};

export default Navbar;
