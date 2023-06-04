import Layout from '@/views/Layout'
import NoticeDetailView from '@/views/notices/detail'
import { useRouter } from 'next/router'
import React from 'react'

const NoticeDetail = () => {
  const { query: { id } } = useRouter()
  
  return (
    <div>
        <NoticeDetailView id={id}/>
    </div>
  )
}

export default NoticeDetail

NoticeDetail.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };