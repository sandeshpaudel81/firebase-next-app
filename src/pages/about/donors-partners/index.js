import Layout from '@/views/Layout';
import DonorsPartnersView from '@/views/about/donorsPartners';
import { NextSeo } from 'next-seo';
import React from 'react'

const DonorsPartners = () => {
  return (
    <div>
      <NextSeo
            title="Donors - Partners | KADAM Myagdi"
            description="These are the collaborators, donors, and partners who support us in accomplishing various projects."
            keywords="kadam myagdi, ngo collaboration, roles of ngo"
            openGraph={{
                type: 'website',
                url: 'https://kadammyagdi.org.np/about/donors-partners/',
                images: [{
                    url: 'https://www.kadammyagdi.org.np/assets/meta_images/donors-partners.png',
                    width: 1200,
                    height: 630,
                    alt: 'Donors and Partners of Kaligandaki Community Development Munch (KADAM) Myagdi',
                }],
                site_name: 'KADAM Myagdi'
            }}
        />
        <DonorsPartnersView />
    </div>
  )
}

export default DonorsPartners

DonorsPartners.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };