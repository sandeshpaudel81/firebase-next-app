import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFileNameWithoutExt } from '../../../firebase-config'
import Link from 'next/link'
import { fetchNotices } from '@/redux/slices/noticeSlice'
import CenteredLoading from '@/components/common/Loader'

const NoticeDetailView = ({id}) => {
    const [noticeData, setnoticeData] = useState(null)
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
        setnoticeData(data.find((item) => item.metaId===id))
    }

    return (
        <div>
            <div className='container mx-auto px-5 md:px-10 lg:px-20 xl:px-72 py-10'>
                {
                    loading ?
                    <CenteredLoading /> :
                    <div>
                        <h1 className='font-bold text-2xl'>{noticeData?.title}</h1>
                        <small className='text-slate-700'>{noticeData?.posted_at}</small>
                        <p className='mt-5' dangerouslySetInnerHTML={{__html: noticeData?.content}}></p>
                        <p className='font-medium my-3'>Related Files</p>
                        <div className='flex flex-col gap-2'>
                            {
                                noticeData?.files?.map((rF, index) => {
                                    return <Link key={index} href={rF} target='_blank'>
                                        <div className='bg-primaryExtraLight p-2 rounded-md capitalize border-2 border-slate-300 hover:border-primary w-52'>{getFileNameWithoutExt(rF)} <span className='text-slate-500 italic'>- Click here</span></div>
                                    </Link>
                                })
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default NoticeDetailView