import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { getFileNameFromUrl } from '../../../firebase-config'
import Link from 'next/link'
import { fetchNotices } from '@/redux/slices/noticeSlice'
import CenteredLoading from '@/components/common/Loader'
import { NextSeo } from 'next-seo'

const NoticeDetailView = ({noticeId}) => {
    const [noticeData, setnoticeData] = useState(null)
    const [metaImage, setmetaImage] = useState("")
    const dispatch = useDispatch()
    const {data, loading, success, error} = useSelector(state => state.notice.getNotices)
    useEffect(() => {
        if (!success) {
            dispatch(fetchNotices())
        } else {
            filterData()
        }
    }, [success, dispatch])

    const filterData = () => {
        setnoticeData(data.find((item) => item.id===noticeId))
    }
    useEffect(() => {
        if(noticeData !== null) {
            if(noticeData?.images.length > 0) {
                setmetaImage(noticeData.images[0])
            } else {
                setmetaImage("https://www.kadammyagdi.org.np/assets/meta_images/notices.png")
            }
        }
    }, [noticeData])

    return (
        <div>
            <NextSeo
                title={`${noticeData?.title} | KADAM Myagdi`}
                description={`${noticeData?.content.substring(0,120)}`}
                keywords="notices of kadam myagdi, ngo notices, ngo vacancies"
                openGraph={{
                    type: 'article',
                    url: `https://kadammyagdi.org.np/news/${noticeData?.id}/`,
                    images: [{
                        url: metaImage,
                        width: 1200,
                        height: 630,
                        alt: 'Notices of Kaligandaki Community Development Munch (KADAM) Myagdi',
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
                            <h1 className='font-bold text-2xl'>{noticeData?.title}</h1>
                            <small className='text-slate-700'>{noticeData?.posted_at}</small>
                            <p className='mt-5'>{noticeData?.content}</p>
                        </div>
                        <div>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                                {
                                    noticeData?.images?.map((im, index) => {
                                        return <div key={index}><img src={im} alt={noticeData?.title}/></div>
                                    })
                                }
                            </div>
                            <p className='font-medium my-3'>Related Files</p>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                                {
                                    noticeData?.relatedFiles?.map((rF, index) => {
                                        return <Link key={index} href={rF} target='_blank'>
                                            <div className='bg-primaryExtraLight p-2 rounded-md capitalize border-2 border-slate-300 hover:border-primary'>{getFileNameFromUrl(rF)} <span className='text-slate-500 italic'>- Click here</span></div>
                                        </Link>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default NoticeDetailView