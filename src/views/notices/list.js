import CenteredLoading from '@/components/common/Loader'
import { fetchNotices } from '@/redux/slices/noticeSlice'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const NoticeList = () => {
    const dispatch = useDispatch()
    const {data, loading, success, error} = useSelector(state => state.notice.getNotices)
    useEffect(() => {
        if (!success) {
            dispatch(fetchNotices())
        }
        return;
    }, [success, dispatch])
    
    return (
        <div className='container mx-auto py-10 px-2'>
            <div className='border-l-8 border-primary px-5'>
                <h2 className='text-primary font-bold text-3xl'>Notices <span className='text-primaryDark'>/ Announcements</span></h2>
                <p className='uppercase text-gray-600 text-sm font-medium mt-2'>Stay in the know</p>
            </div>
            {
                loading ?
                <CenteredLoading /> :
                data.length > 0 ?
                <div className='grid grid-cols-1 mt-10 gap-8 w-9/12 lg:w-1/2'>
                    {
                        data?.map((item) => {
                            return <div key={item.id} className='grid grid-cols-4 bg-slate-200'>
                                <div className='col-span-4 lg:col-span-1'>
                                    {
                                        item.metaImage ?
                                        <img src={item.metaImage} alt={item.title} className='h-[150px] md:h-[200px] lg:h-[100px] w-full object-cover'/> :
                                        <img src='/assets/meta_images/notices.png' alt={item.title} className='h-[150px] md:h-[200px] lg:h-[100px] w-full object-cover'/>
                                    }
                                </div>
                                <div className='col-span-4 lg:col-span-3 p-2 h-[100px] lg:h-auto relative'>
                                    <Link href='/notices/[id]' as={`/notices/${item.metaId}`}><h1 className='font-bold text-primaryD'>{item.title}</h1></Link>
                                    <p className='text-slate-700 text-[10px]'>{item.posted_at}</p>
                                    <Link href='/notices/[id]' as={`/notices/${item.metaId}`}>
                                        <button className='absolute right-2 bottom-2 font-sm rounded-md bg-primaryD hover:bg-primaryDark text-white border-none outline-none px-3 py-1'>
                                            Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        })
                    }
                </div> :
                <p className='mt-10 text-center text-red-600'>Oops, No notices have been uploaded yet.</p>
            }
        </div>
    )
}

export default NoticeList