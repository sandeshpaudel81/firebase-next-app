import Layout from '@/views/Layout';
import PublicationsView from '@/views/publications/list';
import React from 'react'

const Publications = () => {
  return (
    <div>
        <PublicationsView />
    </div>
  )
}

export default Publications

Publications.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };