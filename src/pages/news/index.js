import Layout from '@/views/Layout'
import NewsList from '@/views/news/list'
import { NextSeo } from 'next-seo'
import React from 'react'

const News = () => {
    return (
        <div>
            <NextSeo
                title="News | KADAM Myagdi"
                description="Stay updated with our latest news and updates of progress, events and more."
                keywords="news of kadam myagdi, ngo news, ngo programs"
                openGraph={{
                    type: 'website',
                    url: 'https://kadammyagdi.org.np/news/',
                    images: [{
                        url: 'https://www.kadammyagdi.org.np/assets/meta_images/news.png',
                        width: 1200,
                        height: 630,
                        alt: 'News of Kaligandaki Community Development Munch (KADAM) Myagdi',
                    }],
                    site_name: 'KADAM Myagdi'
                }}
            />
            <NewsList />
        </div>
    )
}

export default News

News.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };