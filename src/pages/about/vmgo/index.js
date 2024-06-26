import Layout from '@/views/Layout';
import VMGOView from '@/views/about/vmgo';
import { NextSeo } from 'next-seo';
import React from 'react'

const VMGO = () => {
  return (
    <div>
        <NextSeo
            title="VMGO | KADAM Myagdi"
            description="Our Vision, Our Mission, Our Goals & Our Objectives"
            keywords="kadam myagdi, vmgo of ngo, vision of ngo, ngo goals, objectives, mission of ngo"
            openGraph={{
                type: 'website',
                url: 'https://kadammyagdi.org.np/about/vmgo',
                images: [{
                    url: 'https://www.kadammyagdi.org.np/assets/meta_images/vmgo.png',
                    width: 1200,
                    height: 630,
                    alt: 'Vision, Mission, Goals and Objectives of Kaligandaki Community Development Munch (KADAM) Myagdi',
                }],
                site_name: 'KADAM Myagdi'
            }}
        />
        <VMGOView />
    </div>
  )
}

export default VMGO

VMGO.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };