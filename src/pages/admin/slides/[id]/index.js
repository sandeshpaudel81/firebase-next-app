import { AdminProtected } from '@/hooks/route'
import Layout from '@/views/Layout'
import SlideAdd from '@/views/admin/slides/add'
import { useRouter } from 'next/router'
import React from 'react'

const AdminSlideDetail = () => {
    const { query: { id } } = useRouter()
    return (
        <div>
            <SlideAdd id={id}/>
        </div>
    )
}

export default AdminSlideDetail

AdminSlideDetail.getLayout = function getLayout(page) {
    return <AdminProtected><Layout>{page}</Layout></AdminProtected>;
  };