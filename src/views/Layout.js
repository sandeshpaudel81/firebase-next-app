import Footer from '@/components/common/footer'
import Navbar from '@/components/common/navbar'
import { useRouter } from 'next/router'
import React from 'react'

const Layout = ({ children }) => {

    const { pathname } = useRouter()

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
            <div>
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout