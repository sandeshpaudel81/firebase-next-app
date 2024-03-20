import { AdminProtected } from '@/hooks/route'
import Layout from '@/views/Layout'
import NoticeAdd from '@/views/admin/notices/add'
import { useRouter } from 'next/router'
import React from 'react'

const AdminNoticeDetail = () => {
    const { query: { id } } = useRouter()
    return (
        <div>
            { id === "add" ? <NoticeAdd id={id}/> : <NoticeAdd id={id}/> }
        </div>
    )
}

export default AdminNoticeDetail

AdminNoticeDetail.getLayout = function getLayout(page) {
    return <AdminProtected><Layout>{page}</Layout></AdminProtected>;
  };