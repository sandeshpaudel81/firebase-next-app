import Layout from '@/views/Layout'
import SlideAdd from '@/views/admin/slides/add'
import SlideDetail from '@/views/admin/slides/detail'
import { useRouter } from 'next/router'
import React from 'react'

const AdminSlideDetail = () => {
    const { query: { id } } = useRouter()
    return (
        <div>
            { id === "add" ? <SlideAdd /> : <SlideDetail id={id}/> }
        </div>
    )
}

export default AdminSlideDetail

AdminSlideDetail.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };