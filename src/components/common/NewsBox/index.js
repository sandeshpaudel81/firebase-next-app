import React from 'react'
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaRegHourglass } from "react-icons/fa";
import Link from 'next/link';

const NewsBox = (props) => {
    const {image, title, content, id} = props
    return (
      <div className='col-span-4 md:col-span-1 shadow-lg h-72 relative group overflow-hidden' key={id}>
          <div className='absolute bg-primary rounded-full right-2 top-2 z-30 text-white'>
              <div className='flex flex-col items-center font-semibold w-14 h-14'>
                  <h3 className='text-2xl'>30</h3>
                  <p className='text-sm uppercase'>Oct</p>
              </div>
          </div>
          <div className='overflow-hidden z-10'>
              <img src={image} alt={title} className='w-full h-[200px] object-cover object-center group-hover:scale-[1.1] group-hover:blur-[1px] duration-300'/>
          </div>
          <div className='bg-primaryExtraLight absolute p-5 bottom-[-90px] group-hover:bottom-0 duration-500 z-20'>
              <h2 className='text-xl font-bold'>{title}</h2>
              <p className='text-gray-700 h-24 opacity-0 overflow-hidden group-hover:opacity-100 text-sm'>{content}</p>
              <small className='flex items-center mt-2 font-medium text-gray-600 opacity-0 group-hover:opacity-100'><FaRegHourglass className='mr-2'/>5 min read</small>
          </div>
          <div className='absolute bottom-0 right-0 bg-primary z-40 text-white'>
              <Link href="#"><div className='p-2 text-sm'>Read more.. </div></Link>
          </div>
      </div>
    )
}

export default NewsBox