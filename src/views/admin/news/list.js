import PrimaryButton from '@/components/common/button';
import { fetchNews } from '@/redux/slices/newsSlice';
import React, { useEffect } from 'react'
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
            <div className="flex flex-col justify-center">
                {/* <div className="w-full bg-white">
                    {
                        news.map((oneNews) => {
                            <div key={oneNews.id} className='bg-slate-300 p-2'>
                                <h1>{oneNews.title}</h1>
                                <p>{oneNews.posted_at}</p>
                            </div>
                        })
                    }
                </div> */}
                {
                    news.map((oneNews) => (
                        <div key={oneNews.id} className='bg-slate-300 p-2'>
                            <h1>{oneNews.title}</h1>
                            <p>{oneNews.posted_at}</p>
                        </div>
                    ))
                }
            </div>
            </div>
        </div>
    )
}

export default NewsList