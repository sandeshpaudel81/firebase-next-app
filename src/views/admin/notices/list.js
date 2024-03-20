import PrimaryButton from '@/components/common/button';
import { fetchNotices } from '@/redux/slices/noticeSlice';
import Link from 'next/link';
import React, { useEffect } from 'react'
import { FaEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

const NoticesList = () => {
    const dispatch = useDispatch();
    const {data: notices, success: noticesSuccess} = useSelector(state => state.notice.getNotices)

    useEffect(() => {
        if (!noticesSuccess){
            dispatch(fetchNotices())
        }
    }, [dispatch, noticesSuccess])
    return (
        <div>
        <div className='flex justify-end py-2'>
                <PrimaryButton url='/admin/notices/add' dispText='Add New'/>
        </div>
        <div className="bg-gray-100 text-black px-5">
            <div className="flex flex-col justify-center divide-y-2">
                {
                    notices.map((oneNotice) => (
                        <div key={oneNotice.id} className='bg-slate-300 p-2 flex'>
                            <div>
                                <h1 className='text-lg'>{oneNotice.title}</h1>
                                <p className='text-sm text-gray-600'>{oneNotice.posted_at}</p>
                            </div>
                            <div className="ml-5">
                                <Link href={`/admin/notices/${oneNotice.id}`}>
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

export default NoticesList