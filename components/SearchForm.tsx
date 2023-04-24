"use client"
import { BiSearch } from "react-icons/bi";
import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import axios from 'axios';
const SearchForm = () => {

    const [search, setSearch] = useState<string>('')
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (search) {
            
            router.push(`/search/${search}`)

            
        }
    }


    return (
        <div className='relative'>
            <form onSubmit={handleSearch} className='bg-white'>
                <input type='text' value={search}  onChange={(e) => setSearch(e.target.value)} placeholder='Search accounts or videos' className='bg-[#f8f8f8] p-3 md:text-sm font-medium border-2 border-gray-100 outline-none focus:border-gray-300 w-[200px]  md:mx-0 md:w-[350px] lg:w-[550px] rounded-full px-6 placeholder:text-xs'/>

                <button className='absolute md:right-5 right-6 top-4 border-l-2 border-gray-200 pl-2 sm:pl-4 text-xl text-gray-400'><BiSearch /></button>
            </form>
        </div>
    )
}


export default SearchForm;