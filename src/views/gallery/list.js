import ImageViewer from '@/components/common/ImageViewer'
import { fetchNews } from '@/redux/slices/newsSlice'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const GalleryList = () => {
    
    const data = [
        {
            name: 'Untitled'
        },
        {
            name: 'General Meeting'
        }
    ]
    
    return (
        <div className='container mx-auto py-10 px-2'>
            <div className='border-l-8 border-primary px-5'>
                <h2 className='text-primary font-bold text-3xl'>Gallery <span className='text-primaryDark'>/ Albums</span></h2>
                <p className='uppercase text-gray-600 text-sm font-medium mt-2'>Our Captivating Visual Journey</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-10 gap-10'>
                {
                    data?.map((item, index) => {
                        return <Link href={`/gallery/${item.id}`} key={index}>
                            <div className='w-full h-[200px] p-1 border-r-2 border-b-2 border-primaryDark group hover:border-l-2 hover:border-t-2'>
                                <div className='p-1 h-full border-r-2 border-b-2 border-primaryDark group-hover:border-l-2 group-hover:border-t-2'>
                                    <img src='assets/car1.jpg' className='h-full w-full'/>
                                </div>
                            </div>
                            <p className='font-medium text-center mt-2'>{item.name}</p>
                        </Link>
                    })
                }
            </div>
        </div>
    )
}

export default GalleryList