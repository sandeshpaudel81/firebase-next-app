import CenteredLoading from '@/components/common/Loader';
import PrimaryButton from '@/components/common/button';
import { fetchDonorsPartners } from '@/redux/slices/donorsPartnersSlice';
import Link from 'next/link';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const AdminDonorsPartnersList = () => {
    const dispatch = useDispatch();
    const {loading, data, success} = useSelector(state => state.donorsPartners.getDonorsPartners);
    
    useEffect(() => {
        if (!success){
            dispatch(fetchDonorsPartners())
        }
    }, [dispatch, success]);

    return (
        loading ? 
        <CenteredLoading/> : 
        <div className='grid grid-cols-4 gap-5 py-5 md:py-10'>
            <div className='col-span-4 flex justify-end'>
                <PrimaryButton url='/admin/donors-partners/add' dispText='Add New'/>
            </div>
            {data?.map((dp) => {
                return <Link key={dp.id} href={`/admin/donors-partners/${dp.id}`} className='col-span-4 md:col-span-1'>
                    <div className=' bg-primaryExtraLight hover:bg-primaryLight rounded-md p-2 group flex flex-col items-center'>
                        <div className='w-[150px] h-[150px]'>
                            <img src={dp.logoUrl} className='w-full h-full object-contain'/>
                        </div>
                        <p className='text-center font-medium text-md md:text-lg'>{dp.name}</p>
                    </div>
                </Link>
            })}
            
        </div>
    )
}

export default AdminDonorsPartnersList