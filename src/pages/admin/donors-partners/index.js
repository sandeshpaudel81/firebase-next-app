import React from 'react'
import { AdminProtected } from '@/hooks/route'
import Layout from '@/views/Layout'
import AdminDonorsPartnersList from '@/views/admin/donors-partners/list'

const AdminDonorsPartners = () => {
    return (
        <div><AdminDonorsPartnersList /></div>
    )
}

export default AdminDonorsPartners

AdminDonorsPartners.getLayout = function getLayout(page) {
  return <AdminProtected><Layout>{page}</Layout></AdminProtected>;
};