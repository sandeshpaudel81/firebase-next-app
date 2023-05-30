import { NavbarMenu } from '@/utils/constants'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import PrimaryButton from '../button'
import { MdKeyboardArrowRight } from "react-icons/md";
import { GrClose, GrMail } from "react-icons/gr";
import { BiMenuAltRight } from "react-icons/bi";
import { FaFacebookF, FaPhoneAlt, FaYoutube } from 'react-icons/fa';

const Sidebar = ({pathname}) => {
  const [sidebar, setsidebar] = useState(false)
  const sidebarHandler = () => {
    setsidebar(!sidebar)
  }
  useEffect(() => {
    setsidebar(false)
  }, [pathname])
  
  return ( <div>
      <div className='lg:hidden'>
            <div className='flex text-sm bg-primaryDark text-white'>
                <p className='p-2'>Kaligandaki Community Development Munch (KADAM)</p>
            </div>
            <div>
                <img className='w-2/3 mx-auto' src='/assets/logo.png'/>
            </div> 
            <div className='flex justify-between bg-primaryDark text-white p-2'>
                <div className='text-xl cursor-pointer' onClick={sidebarHandler}>
                    <BiMenuAltRight />
                </div>
                <div className='flex items-center'>
                  <span>Home</span>
                  {
                    pathname?.map((item, index) => 
                    <div key={index} className='flex items-center'>
                      <MdKeyboardArrowRight />
                      {
                        item != "[id]" && <span>{item}</span>
                      }
                    </div>
                    )
                  }
                </div>
            </div>
      </div>
      <div className={sidebar ? 'lg:hidden':'hidden'}>
          <div className='w-9/12 md:w-5/12 bg-primaryDark flex flex-col h-screen fixed overflow-y-scroll space-y-2 text-white py-5 z-50'>
              <div className='flex flex-row items-center justify-between mb-10 px-10'>
                <p className='text-2xl'>Menu</p>
                <div className='bg-white p-2 rounded-full cursor-pointer' onClick={sidebarHandler}><GrClose /></div>
              </div>
              <div className='flex flex-col divide-y-2 divide-slate-500 px-10 uppercase'>
              {
                  NavbarMenu.map((item) => {
                      return <div key={item.id} className='py-2 flex flex-col'>
                        <Link href={item.url}>
                          <div className='flex flex-row items-center'>
                            <p>{item.name}</p>
                            {
                              item.subMenu ? <MdKeyboardArrowRight className='ml-1 font-semibold'/> : null
                            }
                          </div>
                        </Link>
                        <div className='flex flex-col divide-y-2 divide-slate-500 ml-10'>
                          {
                            item.subMenu && item.subMenu.map((menu) => {
                              return <Link href={menu.url} key={menu.id} className='py-2'>
                                <p>{menu.name}</p>
                              </Link>
                            })
                          }
                        </div>
                      </div>
                  })
              }
              <div className='pt-2'>
                <PrimaryButton dispText="DONATE" url="/donate"/>
              </div>
              </div>
              <div className='flex flex-col p-2 items-center text-sm space-y-2'>
                <Link className='flex items-center space-x-1 hover:text-primaryLight' href="telto:+977-69520895">
                    <FaPhoneAlt />
                    <p>+977-69520895</p>
                </Link>
                <Link className='flex items-center space-x-1 hover:text-primaryLight' href="mailto:kadammyagdi@gmail.com">
                    <GrMail />
                    <p>kadammyagdi@gmail.com</p>
                </Link>
                <div className='flex flex-row space-x-3'>
                  <Link className='flex items-center space-x-1 hover:text-primaryLight' href="https://www.facebook.com/">
                      <FaFacebookF />
                  </Link>
                  <Link className='flex items-center space-x-1 hover:text-primaryLight' href="https://www.facebook.com/">
                      <FaYoutube />
                  </Link>
                </div>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Sidebar