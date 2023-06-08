import { toggleSidebar } from '@/redux/slices/sidebarSlice'
import { AdminNavbarMenu } from '@/utils/constants'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { GrClose } from 'react-icons/gr'
import { useDispatch, useSelector } from 'react-redux'

const AdminNavbar = ({pathname}) => {
    const dispatch = useDispatch()
    
    const handleCloseSidebar = () => {
        dispatch(toggleSidebar(false))
    }

    useEffect(() => {
        dispatch(toggleSidebar(false))
      }, [pathname])

  return (
    <div className='w-60 h-full bg-primaryDark text-primary'>
      <div className='flex flex-col'>
        <div className='bg-primaryDark lg:bg-primaryExtraLight text-center'>
            <div className='absolute right-2 top-2 block lg:hidden text-white' onClick={handleCloseSidebar}><GrClose /></div>
            <img className='w-40 mx-auto hidden lg:block' src='/assets/logo.png' alt='KADAM Myagdi'/>
            <p className='font-bold text-3xl hidden lg:block'>ADMIN</p>
            <p className='font-bold text-3xl block lg:hidden text-white'>MENU</p>
        </div>
        {
          AdminNavbarMenu.map((item) => {
            return <div key={item.id} className='text-white font-medium flex flex-col'>
                <Link href={item.url}>
                  <div className="hover:bg-primary flex flex-row items-center cursor-pointer px-3 py-3">
                    <p>{item.name}</p> 
                  </div>
                  <div className='bg-slate-500 h-[1px] w-full'></div>
                </Link>
              </div>
          })
        }
      </div>
    </div>
  )
}

export default AdminNavbar