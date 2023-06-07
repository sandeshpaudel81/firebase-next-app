import Layout from '@/views/Layout';
import VMGOView from '@/views/about/vmgo';
import React from 'react'

const VMGO = () => {
  return (
    <div>
        <VMGOView />
    </div>
  )
}

export default VMGO

VMGO.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };