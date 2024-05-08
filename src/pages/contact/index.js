import Layout from '@/views/Layout'
import ContactView from '@/views/contact'
import { NextSeo } from 'next-seo'
import React from 'react'

const Contact = () => {
    return (
        <div>
            <NextSeo
                title="Contact | KADAM Myagdi"
                description="Contact us if you have any queries to KADAM Myagdi"
                keywords="contact to kadam myagdi, contact us"
                openGraph={{
                    type: 'website',
                    url: 'https://kadammyagdi.org.np/contact',
                    description: 'Keep in touch with KADAM',
                    images: [{
                        url: 'https://www.kadammyagdi.org.np/assets/meta_images/homepage.png',
                        width: 1200,
                        height: 630,
                        alt: 'Kaligandaki Community Development Munch (KADAM) Myagdi',
                    }],
                    site_name: 'KADAM Myagdi'
                }}
            />
            <ContactView />
        </div>
    )
}

export default Contact

Contact.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };