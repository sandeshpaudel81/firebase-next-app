import Layout from '@/views/Layout'
import SlideList from '@/views/admin/slides/list'
import React from 'react'

const AdminSlideList = () => {
  return (
    <div><SlideList /></div>
  )
}

export default AdminSlideList

AdminSlideList.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};