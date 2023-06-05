import Layout from '@/views/Layout'
import NewsList from '@/views/news/list'
import React from 'react'

const News = () => {
    return (
        <div>
            <NewsList />
        </div>
    )
}

export default News

News.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };