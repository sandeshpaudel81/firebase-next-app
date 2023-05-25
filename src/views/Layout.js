import Footer from '@/components/common/footer'
import Navbar from '@/components/common/navbar'
import Sidebar from '@/components/common/sidebar'
import { useRouter } from 'next/router'
import React from 'react'

const Layout = ({ children }) => {

    const {pathname} = useRouter()
    
    const pathnames = pathname.split('/').filter(i => i)

    if (pathname.startsWith("/admin")) {
        return (
            <div>
                <div>
                    {children}
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div>
            <Navbar />
            <Sidebar pathname={pathnames}/>
            <div>
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout