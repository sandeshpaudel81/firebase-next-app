import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNews } from '@/redux/slices/newsSlice'
import CenteredLoading from '@/components/common/Loader'
import { NextSeo } from 'next-seo'

const NewsDetailView = ({newsId}) => {
    const [newsData, setnewsData] = useState(null)
    const [metaImage, setmetaImage] = useState("")
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
        setnewsData(data.find((item) => item.id===newsId))
    }
    useEffect(() => {
        if(newsData !== null) {
            if(newsData?.images.length > 0) {
                setmetaImage(newsData.images[0])
            } else {
                setmetaImage("https://www.kadammyagdi.org.np/assets/meta_images/news.png")
            }
        }
    }, [newsData])
    
    return (
        <div>
            <NextSeo
                title={`${newsData?.title} | KADAM Myagdi`}
                description={`${newsData?.content.substring(0,120)}`}
                keywords="news of kadam myagdi, ngo news, ngo programs"
                openGraph={{
                    type: 'article',
                    url: `https://kadammyagdi.org.np/news/${newsData?.id}/`,
                    images: [{
                        url: metaImage,
                        width: 1200,
                        height: 630,
                        alt: 'News of Kaligandaki Community Development Munch (KADAM) Myagdi',
                    }],
                    site_name: 'KADAM Myagdi'
                }}
            />
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