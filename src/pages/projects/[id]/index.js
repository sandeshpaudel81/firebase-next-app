import Layout from '@/views/Layout'
import ProjectDetailView from '@/views/projects/projectDetail'
import { useRouter } from 'next/router'
import React from 'react'

const ProjectDetail = () => {
  const { query: { id } } = useRouter()
  return (
    <div>
        <ProjectDetailView id={id}/>
    </div>
  )
}

export default ProjectDetail

ProjectDetail.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };