import Layout from '@/views/Layout'
import NewsDetailView from '@/views/news/detail'
import { useRouter } from 'next/router'
import React from 'react'

const NewsDetail = () => {
  const { query: { id } } = useRouter()
  
  return (
    <div>
        <NewsDetailView newsId={id}/>
    </div>
  )
}

export default NewsDetail

NewsDetail.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };