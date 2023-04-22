"use client"

import { MdOutlineCancel } from 'react-icons/md';
import { useRouter } from 'next/navigation';

function CancelBtn(){

    const router = useRouter()
    return (
        <div className='absolute top-6 left-2 lg:left-6 flex gap-6 z-50 cursor-pointer' onClick={() => router.back()}>
          <p className='text-white text-[35px]'><MdOutlineCancel /></p>
        </div>
    )
}


export default CancelBtn