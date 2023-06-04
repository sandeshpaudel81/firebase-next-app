import Layout from '@/views/Layout';
import DonorsPartnersView from '@/views/about/donorsPartners';
import React from 'react'

const DonorsPartners = () => {
  return (
    <div>
        <DonorsPartnersView />
    </div>
  )
}

export default DonorsPartners

DonorsPartners.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };