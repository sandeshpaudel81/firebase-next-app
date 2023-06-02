import Layout from '@/views/Layout';
import VisionView from '@/views/about/vision';
import React from 'react'

const Visions = () => {
  return (
    <div>
        <VisionView />
    </div>
  )
}

export default Visions

Visions.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };