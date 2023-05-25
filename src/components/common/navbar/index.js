import { NavbarMenu } from '@/utils/constants'
import Link from 'next/link'
import React from 'react'
import PrimaryButton from '../button'
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaFacebookF, FaYoutube, FaPhoneAlt } from "react-icons/fa";
import {GrMail} from "react-icons/gr"

const Navbar = ({pathname}) => {
  return (
    <div className='hidden lg:block'>
      <div className='flex text-sm bg-primaryDark text-white items-center justify-between'>
        <p className='bg-primaryD p-2'>Kaligandaki Community Development Munch (KADAM)</p>
        <div className='flex p-2 space-x-3'>
          <Link className='flex items-center space-x-1 hover:text-primaryLight' href="telto:+977-69520895">
            <FaPhoneAlt />
            <p>+977-69520895</p>
          </Link>
          <Link className='flex items-center space-x-1 hover:text-primaryLight' href="mailto:kadammyagdi@gmail.com">
            <GrMail />
            <p>kadammyagdi@gmail.com</p>
          </Link>
          <Link className='flex items-center space-x-1 hover:text-primaryLight' href="https://www.facebook.com/">
            <FaFacebookF />
          </Link>
          <Link className='flex items-center space-x-1 hover:text-primaryLight' href="https://www.facebook.com/">
            <FaYoutube />
          </Link>
        </div>
      </div>
      <div className='flex bg-primaryExtraLight justify-between p-3 items-center'>
        <img className='w-40' src='/assets/logo.png'/>
        {
          NavbarMenu.map((item) => {
            return <div key={item.id} className='uppercase text-slate-800 font-medium flex flex-col items-center group'>
                <Link href={item.url}>
                  <div className={item.url === pathname ? `hover:text-primaryDark flex flex-row items-center cursor-pointer border-b-2 border-primaryDark text-primaryDark` : `hover:text-primaryDark flex flex-row items-center cursor-pointer`}>
                    <p>{item.name}</p> 
                    {item.subMenu && <MdKeyboardArrowDown className='ml-1 font-semibold'/>}
                  </div>
                </Link>
                <div className='group-hover:flex flex-col bg-primaryLight hidden absolute top-[90px] rounded-md z-50'>
                {
                  item.subMenu && item.subMenu.map((menu) => {
                    return <Link href={menu.url} key={menu.id} className='p-2 hover:bg-primaryD hover:text-white hover:rounded-md border-b-2 border-slate-300'>
                      <p>{menu.name}</p>
                    </Link>
                  })
                }
                </div>
              </div>
          })
        }
        <PrimaryButton dispText="DONATE" url="/donate" />
      </div>
    </div>
  )
}

export default Navbar