import { fetchDonorsPartners } from '@/redux/slices/donorsPartnersSlice'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const DonorsPartnersView = () => {
    const dispatch = useDispatch()
    const {loading, success, data, error} = useSelector(state => state.donorsPartners.getDonorsPartners)
    useEffect(() => {
        if(!success) {
            dispatch(fetchDonorsPartners())
        }
    }, [success])
    
    return (
        <div className='container mx-auto py-10 px-2'>
            <div className='border-l-8 border-primary px-5'>
                <h2 className='text-primary font-bold text-3xl'>Our <span className='text-primaryDark'>Donors/partners</span></h2>
                <p className='uppercase text-gray-600 text-sm font-medium mt-2'>With Whom We Work</p>
            </div>
            <div className='grid grid-cols-2 mt-10 gap-5'>
                {
                    data?.map((item) => {
                        return <div key={item.id} className='col-span-2 lg:col-span-1 grid grid-cols-6 p-3 border-[1px] border-slate-300 shadow-lg shadow-black rounded-md gap-2'>
                            <div className='col-span-6 lg:col-span-2'>
                                <img src={item.logoUrl} alt={item.name} className='mx-auto'/>
                            </div>
                            <div className='col-span-6 lg:col-span-4 px-2 text-center lg:text-start'>
                                <p className='font-semibold text-2xl lg:text-3xl'>{item.name}</p>
                                <p className='text-sm mt-2'>{item.description}</p>
                                <Link href={item.website}><p className='text-primaryDark hover:text-slate-900 hover:underline'>Visit Website</p></Link>
                            </div>
                            <div className='col-span-6 h-[2px] bg-slate-400'></div>
                            <div className='col-span-6'>
                                <p className='font-medium mb-3'>Contribution/Role</p>
                                <p>{item.contribution}</p>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default DonorsPartnersView