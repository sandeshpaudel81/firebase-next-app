import CenteredLoading from '@/components/common/Loader'
import { fetchPublications } from '@/redux/slices/publicationSlice'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const PublicationsView = () => {
    const dispatch = useDispatch()
    const {data, loading, success} = useSelector(state => state.publications.getPublications)
    useEffect(() => {
        if(!success){
            dispatch(fetchPublications())
        }
        return;
    }, [])
    
    return (
        <div className='container mx-auto py-10 px-2'>
            <div className='border-l-8 border-primary px-5'>
                <h2 className='text-primary font-bold text-3xl'>Publications <span className='text-primaryDark'>/ Literatures</span></h2>
                <p className='uppercase text-gray-600 text-sm font-medium mt-2'>Our Published Resources, Reports and Literatures</p>
            </div>
            {
                loading ?
                <CenteredLoading /> :
                <div className='grid grid-cols-4 gap-5 mt-10'>
                    {
                        data?.map((item) => {
                            return <div key={item.id} className='col-span-4 md:col-span-2 lg:col-span-1'>
                                <Link href={item.file} target='_blank'>
                                    <div className='p-3 border-[1px] border-slate-300 shadow-md shadow-black hover:shadow-primaryDark hover:text-primaryDark rounded-md'>
                                        <p className='font-semibold'>{item.name}</p>
                                    </div>
                                </Link>
                            </div>
                        })
                    }
                </div>
            }
        </div>
    )
}

export default PublicationsView