"use client"

import { topics } from '@/utils/utils/constants';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react'

type Props = {}

const Discover = (props: Props) => {
    const query = useSearchParams()
    const topicParams = query.get('topics')
    

    

    const activeTopicStyle = "lg:border-2 hover:bg-primary lg:border-[#f51997] px-3 py-2 rounded lg:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#f51997]"
    const topicStyle = "lg:border-2 hover:bg-primary lg:border-gray-300 px-3 py-2 rounded lg:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black"
  return (
    <div className='lg:border-b-2 lg:border-gray-200 pb-6'>
        <p className='text-gray-500 font-semibold m-3 mt-4 hidden lg:block'>Popular Topics</p>
          <div className='flex gap-3 flex-wrap'>
              { topics.map( ( eachTopic ) => (
                  <Link href={ `/?topics=${ eachTopic.name }` } key={eachTopic.name}>
                      <div className={topicParams === eachTopic.name ? activeTopicStyle : topicStyle}>
                          <span className='font-bold text-2xl lg:text-base'>{ eachTopic.icon}</span>
                          <span className='font-medium text-sm hidden lg:block capitalize'>{ eachTopic.name}</span>
                      </div>
                  </Link>
              ))}
        </div>
    </div>
  )
}

export default Discover