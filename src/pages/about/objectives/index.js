import Layout from '@/views/Layout';
import ObjectivesView from '@/views/about/objectives';
import React from 'react'

const Objectives = () => {
  return (
    <div>
        <ObjectivesView />
    </div>
  )
}

export default Objectives

Objectives.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };