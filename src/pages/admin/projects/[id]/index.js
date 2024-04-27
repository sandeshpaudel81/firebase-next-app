import Layout from '@/views/Layout'
import ProjectDetail from '@/views/admin/projects/detail'
import { useRouter } from 'next/router'
import React from 'react'
import dynamic from 'next/dynamic'
import { AdminProtected } from '@/hooks/route'

const ProjectAdd = dynamic(() => import('../../../../views/admin/projects/add'), {
  ssr: false
})

const AdminProjectDetail = () => {
    const { query: { id } } = useRouter()
    return (
        <div>
            { id === "add" ? <ProjectAdd id={id} /> : <ProjectAdd id={id}/> }
        </div>
    )
}

export default AdminProjectDetail

AdminProjectDetail.getLayout = function getLayout(page) {
    return <AdminProtected><Layout>{page}</Layout></AdminProtected>;
  };