import { AdminProtected } from '@/hooks/route'
import Layout from '@/views/Layout'
import NoticesList from '@/views/admin/notices/list'
import React from 'react'

const AdminNoticeList = () => {
  return (
    <div><NoticesList /></div>
  )
}

export default AdminNoticeList

AdminNoticeList.getLayout = function getLayout(page) {
  return <AdminProtected><Layout>{page}</Layout></AdminProtected>;
};