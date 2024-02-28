import { AdminProtected } from '@/hooks/route'
import Layout from '@/views/Layout'
import NewsAdd from '@/views/admin/news/add'
import { useRouter } from 'next/router'
import React from 'react'

const AdminNewsDetail = () => {
    const { query: { id } } = useRouter()
    return (
        <div>
            { id === "add" ? <NewsAdd id={id}/> : <NewsAdd id={id}/> }
        </div>
    )
}

export default AdminNewsDetail

AdminNewsDetail.getLayout = function getLayout(page) {
    return <AdminProtected><Layout>{page}</Layout></AdminProtected>;
  };