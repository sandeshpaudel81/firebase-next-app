import { AdminProtected } from '@/hooks/route'
import Layout from '@/views/Layout'
import AdminDonorsPartnersAdd from '@/views/admin/donors-partners/add'
import { useRouter } from 'next/router'
import React from 'react'

const AdminDonorsPartnersDetail = () => {
    const { query: { id } } = useRouter()
    return (
        <div>
            { id === "add" ? <AdminDonorsPartnersAdd id={id}/> : <AdminDonorsPartnersAdd id={id}/> }
        </div>
    )
}

export default AdminDonorsPartnersDetail

AdminDonorsPartnersDetail.getLayout = function getLayout(page) {
    return <AdminProtected><Layout>{page}</Layout></AdminProtected>;
  };