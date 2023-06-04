import Layout from '@/views/Layout'
import ProjectList from '@/views/admin/projects/list'
import React from 'react'

const AdminProjectList = () => {
    return (
        <div>
            <ProjectList />
        </div>
    )
}

export default AdminProjectList

AdminProjectList.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };