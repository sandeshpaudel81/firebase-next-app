import AdminNavbar from '@/components/common/AdminNavbar'
import Footer from '@/components/common/footer'
import Navbar from '@/components/common/navbar'
import Sidebar from '@/components/common/sidebar'
import { useRouter } from 'next/router'
import React from 'react'
import { BiMenuAltRight } from 'react-icons/bi'
import { MdKeyboardArrowRight } from "react-icons/md";
import { toggleSidebar } from '@/redux/slices/sidebarSlice'
import { useDispatch, useSelector } from 'react-redux'

const Layout = ({ children }) => {
    const dispatch = useDispatch()

    const {pathname} = useRouter()
    
    const pathnames = pathname.split('/').filter(i => i)

    const {sidebar} = useSelector(state => state.sidebar)

    const handleOpenSidebar = () => {
        dispatch(toggleSidebar(true))
    }

    if (pathname.startsWith("/admin")) {
        return (
            <div className='flex h-screen'>
                <div className={sidebar ? `fixed block lg:block bg-white top-0 h-screen` : `hidden lg:block bg-white top-0 h-screen`}>
                    <AdminNavbar pathname={pathname}/>
                </div>
                <div className='overflow-y-scroll w-full px-5'>
                    <div className='bg-primaryExtraLight text-primary text-center lg:hidden'>
                        <img className='w-40 mx-auto' src='/assets/logo.png'/>
                        <p className='font-bold text-3xl'>ADMIN</p>
                    </div>
                    <div className='flex bg-primaryDark text-white p-2 mt-2 rounded-md items-center justify-between'>
                        <div className='flex'>
                        {
                            pathnames?.map((item, index) => 
                            <div key={index} className='flex items-center'>
                            <MdKeyboardArrowRight />
                            {
                                item != "[id]" && <span className='capitalize'>{item}</span>
                            }
                            </div>
                            )
                        }
                        </div>
                        <div className='lg:hidden' onClick={handleOpenSidebar}><BiMenuAltRight /></div>
                    </div>
                    {children}
                </div>
            </div>
        )
    }

    return (
        <div>
            <Navbar pathname={pathname}/>
            <Sidebar pathname={pathnames}/>
            <div>
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout