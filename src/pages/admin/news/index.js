import { AdminProtected } from '@/hooks/route'
import Layout from '@/views/Layout'
import NewsList from '@/views/admin/news/list'
import React from 'react'

const AdminNewsList = () => {
  return (
    <div><NewsList /></div>
  )
}

export default AdminNewsList

AdminNewsList.getLayout = function getLayout(page) {
  return <AdminProtected><Layout>{page}</Layout></AdminProtected>;
};