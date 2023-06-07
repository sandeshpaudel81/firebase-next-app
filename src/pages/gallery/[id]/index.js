import Layout from '@/views/Layout'
import GalleryDetailView from '@/views/gallery/detail'
import { useRouter } from 'next/router'
import React from 'react'

const GalleryDetail = () => {
  const { query: { id } } = useRouter()
  
  return (
    <div>
        <GalleryDetailView id={id}/>
    </div>
  )
}

export default GalleryDetail

GalleryDetail.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};