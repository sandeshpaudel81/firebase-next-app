import { fetchDonorsPartners } from '@/redux/slices/donorsPartnersSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const DonorsHomeView = () => {
    const {data, success} = useSelector(state => state.donorsPartners.getDonorsPartners)
    const dispatch = useDispatch()
    useEffect(() => {
        if(!success) {
            dispatch(fetchDonorsPartners())
        }
    }, [dispatch, success])
    return (
        <div className='grid grid-cols-6 pt-10 gap-5'>
            {
                data?.map((item, index) => {
                    return <div key={index} className='col-span-3 md:col-span-2 lg:col-span-1'>
                        <img src={item.logoUrl} alt={item.name} className='w-[100px] h-[100px] mx-auto bg-transparent object-contain'/>
                        <p className='text-[12px] text-center'>{item.name}</p>
                    </div>
                })
            }
            
        </div>
  )
}

export default DonorsHomeView