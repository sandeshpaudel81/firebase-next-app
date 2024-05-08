import Layout from '@/views/Layout'
import NoticeList from '@/views/notices/list'
import { NextSeo } from 'next-seo'
import React from 'react'

const Notices = () => {
    return (
        <div>
            <NextSeo
                title="Notices | KADAM Myagdi"
                description="Stay updated with notices and announcements about vacancies, events and more."
                keywords="notices of kadam myagdi, ngo notices, ngo vacancies"
                openGraph={{
                    type: 'website',
                    description: 'Stay updated with notices and announcements about vacancies, events and more.',
                    url: 'https://kadammyagdi.org.np/notices/',
                    images: [{
                        url: 'https://www.kadammyagdi.org.np/assets/meta_images/notices.png',
                        width: 1200,
                        height: 630,
                        alt: 'Notices of Kaligandaki Community Development Munch (KADAM) Myagdi',
                    }],
                    site_name: 'KADAM Myagdi'
                }}
            />
            <NoticeList />
        </div>
    )
}

export default Notices

Notices.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};