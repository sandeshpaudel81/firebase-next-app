import { fetchNews } from '@/redux/slices/newsSlice'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const NewsList = () => {
    const dispatch = useDispatch()
    const {data, loading, success, error} = useSelector(state => state.news.getNews)
    useEffect(() => {
        if (!success) {
            dispatch(fetchNews())
        }
        return;
    }, [success, dispatch])
    
    return (
        <div className='container mx-auto py-10 px-2'>
            <div className='border-l-8 border-primary px-5'>
                <h2 className='text-primary font-bold text-3xl'>News <span className='text-primaryDark'>/ Events</span></h2>
                <p className='uppercase text-gray-600 text-sm font-medium mt-2'>Programs | Meetups | Affairs</p>
            </div>
            <div className='grid grid-cols-1 mt-10 gap-8 w-9/12 lg:w-1/2'>
                {
                    data?.map((item) => {
                        return <div key={item.id} className='grid grid-cols-4 bg-slate-200'>
                            <div className='col-span-4 lg:col-span-1'>
                                <img src={item.images[0]} alt={item.title} className='h-[150px] md:h-[200px] lg:h-[100px] w-full object-cover'/>
                            </div>
                            <div className='col-span-4 lg:col-span-3 p-2 h-[100px] lg:h-auto relative'>
                                <Link href={`/news/${item.id}`}><h1 className='font-bold text-primaryD'>{item.title}</h1></Link>
                                <p className='text-slate-700 text-[10px]'>{item.posted_at}</p>
                                <Link href={`/news/${item.id}`}>
                                    <button className='absolute right-2 bottom-2 font-sm rounded-md bg-primaryD hover:bg-primaryDark text-white border-none outline-none px-3 py-1'>
                                        Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default NewsList