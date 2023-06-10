import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNews } from '@/redux/slices/newsSlice'
import CenteredLoading from '@/components/common/Loader'

const NewsDetailView = ({id}) => {
    const [newsData, setnewsData] = useState(null)
    const dispatch = useDispatch()
    const {data, loading, success, error} = useSelector(state => state.news.getNews)
    useEffect(() => {
        if (!success) {
            dispatch(fetchNews())
        } else {
            filterData()
        }
    }, [success, dispatch])
    const filterData = () => {
        setnewsData(data.find((item) => item.metaId===id))
    }
    
    return (
        <div>
            <div className='container mx-auto px-5 md:px-2 py-10'>
                {
                    loading ?
                    <CenteredLoading /> :
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                        <div>
                            <h1 className='font-bold text-2xl'>{newsData?.title}</h1>
                            <small className='text-slate-700'>{newsData?.posted_at}</small>
                            <p className='mt-5'>{newsData?.content}</p>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                            {
                                newsData?.images?.map((im, index) => {
                                    return <div key={index}><img src={im} alt={newsData?.title}/></div>
                                })
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default NewsDetailView