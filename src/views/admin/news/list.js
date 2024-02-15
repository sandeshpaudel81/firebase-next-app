import PrimaryButton from '@/components/common/button';
import { fetchNews } from '@/redux/slices/newsSlice';
import Link from 'next/link';
import React, { useEffect } from 'react'
import { FaEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

const NewsList = () => {
    const dispatch = useDispatch();
    const {data: news, success: newsSuccess} = useSelector(state => state.news.getNews)

    useEffect(() => {
        if (!newsSuccess){
            dispatch(fetchNews())
        }
    }, [dispatch, newsSuccess])
    return (
        <div>
        <div className='flex justify-end py-2'>
                <PrimaryButton url='/admin/news/add' dispText='Add New'/>
        </div>
        <div className="bg-gray-100 text-black px-5">
            <div className="flex flex-col justify-center divide-y-2">
                {
                    news.map((oneNews) => (
                        <div key={oneNews.id} className='bg-slate-300 p-2 flex'>
                            <div>
                                <h1 className='text-lg'>{oneNews.title}</h1>
                                <p className='text-sm text-gray-600'>{oneNews.posted_at}</p>
                            </div>
                            <div className="ml-5">
                                <Link href={`/admin/news/${oneNews.id}`}>
                                    <FaEdit className='text-2xl text-primary hover:text-primaryDark'/>
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </div>
            </div>
        </div>
    )
}

export default NewsList