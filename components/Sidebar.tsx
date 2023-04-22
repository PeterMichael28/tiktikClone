"use client"

import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { CodeResponse, CredentialResponse, GoogleLogin, TokenResponse, googleLogout } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { AiOutlineMenu, AiFillHome } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import Discover from './Discover';
import SuggestedAccounts from './SuggestedAccounts';
import Footer from './Footer';


type Props = {}

function Sidebar( { }: Props ) {
    

    const [ showSideBar, setShowSideBar ] = useState( true )
    const userProfile = false

    const responseMessage = (response: CredentialResponse) => {
        console.log(response)
    };
    const errorMessage = () => {
        console.log('Login Failed');
    };

    const normalLink = `flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#f51997] rounded`
  return (
      <div>
          <div className='block lg:hidden m-2 ml-4 mt-3 text-xl cursor-pointer' onClick={() => setShowSideBar((prev) => !prev)}>
              {showSideBar ? <ImCancelCircle /> : <AiOutlineMenu />}
          </div>

          { showSideBar && (
              <div className='lg:w-[300px] w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3'>
                  <div className='lg:border-b-2 border-gray-200 lg:pb-4'>
                      <Link href='/'>
                          <div className={normalLink}>
                              <p className='text-2xl'><AiFillHome /> </p>
                              <span className='text-xl hidden lg:block'>For You</span>
                          </div>
                      </Link>
                  </div>
                  
                  <Discover />
                  <SuggestedAccounts />
                  <Footer />
              </div>

            
          )}
    </div>
  )
}

export default Sidebar