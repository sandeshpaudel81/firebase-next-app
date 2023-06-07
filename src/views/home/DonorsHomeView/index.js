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
        <div className='grid grid-cols-4 pt-10 gap-10'>
            {
                data?.map((item, index) => {
                    return <div key={index} className='col-span-2 md:col-span-1'>
                        <img src={item.logoUrl} className='w-9/12 mx-auto'/>
                    </div>
                })
            }
            
        </div>
  )
}

export default DonorsHomeView