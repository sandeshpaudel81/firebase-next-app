import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { getFileNameFromUrl } from '../../../firebase-config'
import Link from 'next/link'
import { fetchNotices } from '@/redux/slices/noticeSlice'

const NoticeDetailView = ({noticeId}) => {
    const dispatch = useDispatch()
    const {data, loading, success, error} = useSelector(state => state.notice.getNotices)
    useEffect(() => {
        if (!success) {
            dispatch(fetchNotices())
        }
        return;
    }, [success, dispatch])
    return (
        <div className='container mx-auto px-5 md:px-2 py-10'>
            {
                data?.map((item) => {
                    const {id} = item;
                    if (id === noticeId) {
                        return <div key={id} className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                            <div>
                                <h1 className='font-bold text-2xl'>{item.title}</h1>
                                <small className='text-slate-700'>{item.posted_at}</small>
                                <p className='mt-5'>{item.content}</p>
                            </div>
                            <div>
                                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                                    {
                                        item.images?.map((im, index) => {
                                            return <div key={index}><img src={im} alt={item.title}/></div>
                                        })
                                    }
                                </div>
                                <p className='font-medium my-3'>Related Files</p>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                                    {
                                        item.relatedFiles?.map((rF, index) => {
                                            return <Link key={index} href={rF} target='_blank'>
                                                <div className='bg-primaryExtraLight p-2 rounded-md capitalize border-2 border-slate-300 hover:border-primary'>{getFileNameFromUrl(rF)} <span className='text-slate-500 italic'>- Click here</span></div>
                                            </Link>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    }
                })
            }
        </div>
    )
}

export default NoticeDetailView