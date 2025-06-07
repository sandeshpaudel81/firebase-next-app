import Link from 'next/link'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGallery } from '@/redux/slices/gallerySlice'
import CenteredLoading from '@/components/common/Loader'

const GalleryList = () => {
    const dispatch = useDispatch()
    const {data, loading, error, success} = useSelector(state => state.gallery.getGallery)
    useEffect(() => {
        if(!success){
            dispatch(fetchGallery())
        }
        return;
    }, [success, dispatch])
    
    return (
        <div className='container mx-auto px-5 md:px-10 lg:px-20 xl:px-48 py-10'>
            <div className='border-l-8 border-primary px-5'>
                <h2 className='text-primary font-bold text-3xl'>Gallery <span className='text-primaryDark'>/ Albums</span></h2>
                <p className='uppercase text-gray-600 text-sm font-medium mt-2'>Our Captivating Visual Journey</p>
            </div>
            {
                loading ?
                <CenteredLoading /> :
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-10 gap-10'>
                    {
                        data?.map((item) => {
                            return <Link href={`/gallery/${item.id}`} key={item.id}>
                                <div className='w-full h-[200px] p-1 border-r-2 border-b-2 border-primaryDark group hover:border-l-2 hover:border-t-2'>
                                    <div className='p-1 h-full border-r-2 border-b-2 border-primaryDark group-hover:border-l-2 group-hover:border-t-2'>
                                        <img src={item.images[0].image} className='h-full w-full object-cover' alt={item.name}/>
                                    </div>
                                </div>
                                <p className='font-medium text-center mt-2'>{item.name}</p>
                            </Link>
                        })
                    }
                </div>
            }
        </div>
    )
}

export default GalleryList