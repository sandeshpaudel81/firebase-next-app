import Link from 'next/link';
import React from 'react'
import { MdKeyboardArrowRight } from "react-icons/md";

const Footer = () => {
  return (
    <div className='footerBg'>
        <div className='container mx-auto px-5 pt-10 md:pt-20'>
          <div className='grid grid-cols-2 text-white text-sm'>
            <div className='col-span-2 md:col-span-1'>
              <p className='font-semibold text-xl md:text-2xl'>Quick Links</p>
              <div className='h-1 w-10 bg-primary mt-1'></div>
              <div className='flex flex-col gap-y-1 mt-6 text-slate-300'>
                <Link href='/projects'><div className='flex items-center hover:text-white gap-1'><MdKeyboardArrowRight/> Projects</div></Link>
                <Link href='/news'><div className='flex items-center hover:text-white gap-1'><MdKeyboardArrowRight/> News</div></Link>
                <Link href='/notices'><div className='flex items-center hover:text-white gap-1'><MdKeyboardArrowRight/> Notices</div></Link>
                <Link href='/team/board-committee'><div className='flex items-center hover:text-white gap-1'><MdKeyboardArrowRight/> Board Committee</div></Link>
                <Link href='/publications'><div className='flex items-center hover:text-white gap-1'><MdKeyboardArrowRight/> Publications</div></Link>
                <Link href='/gallery'><div className='flex items-center hover:text-white gap-1'><MdKeyboardArrowRight/> Gallery</div></Link>
              </div>
            </div>
            <div className='col-span-2 md:col-span-1'>
              <p className='font-semibold text-xl md:text-2xl'>Contact Us</p>
              <div className='h-1 w-10 bg-primary mt-1'></div>
              <div className='flex flex-col gap-y-1 mt-6 text-slate-300'>
                <p>Beni - 8, Myagdi</p>
                <p>Gandaki Province</p>
                <p>Phone: +977-69520895</p>
                <p>Email: kadammyagdi@gmail.com</p>
              </div>
            </div>
            <div className='col-span-2 mt-10'>
              <div className='h-[1px] w-full bg-slate-600'></div>
              <div className='py-8'>
                <p className='text-center my-1'>Copyright &copy; 2023 KADAM Myagdi. All rights reserved.</p>
                <p className='text-center my-1'>Developed by: <Link href='#'>Sandesh Prasad Paudel</Link></p>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Footer