import Layout from '@/views/Layout'
import ProjectList from '@/views/projects'
import React from 'react'

const Project = () => {
    return (
        <div>
            <ProjectList />
        </div>
    )
}

export default Project

Project.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };