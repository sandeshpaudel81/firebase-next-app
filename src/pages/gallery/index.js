import Layout from '@/views/Layout'
import GalleryList from '@/views/gallery/list'
import React from 'react'

const Gallery = () => {
    return (
        <div>
            <GalleryList />
        </div>
    )
}

export default Gallery

Gallery.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };