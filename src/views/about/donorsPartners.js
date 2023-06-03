import Link from 'next/link'
import React from 'react'

const DonorsPartnersView = () => {

    return (
        <div className='container mx-auto py-10 px-2'>
            <div className='border-l-8 border-primary px-5'>
                <h2 className='text-primary font-bold text-3xl'>Our <span className='text-primaryDark'>Donors/partners</span></h2>
                <p className='uppercase text-gray-600 text-sm font-medium mt-2'>With Whom We Work</p>
            </div>
            <div className='grid grid-cols-2 mt-10 gap-5'>
                <div className='col-span-2 lg:col-span-1 grid grid-cols-6 p-3 border-[1px] border-slate-300 shadow-lg shadow-black rounded-md gap-2'>
                    <div className='col-span-6 lg:col-span-2'>
                        <img src='/assets/download.png' alt='donors logo' className='mx-auto'/>
                    </div>
                    <div className='col-span-6 lg:col-span-4 px-2 text-center lg:text-start'>
                        <p className='font-semibold text-2xl lg:text-3xl'>Good Neighbors International Nepal</p>
                        <p className='text-sm mt-2'>Good Neighbors International (GNI) is an international developmental and humanitarian organization that responds to the call of the most neglected and vulnerable beyond the barriers of race, nationality, religion, ideology and geographical distance. We work in 35 countries around the world.</p>
                        <Link href='https://gninepal.org/'><p className='text-primaryDark hover:text-slate-900 hover:underline'>Visit Website</p></Link>
                    </div>
                    <div className='col-span-6 h-[2px] bg-slate-400'></div>
                    <div className='col-span-6'>
                        <p className='font-medium mb-3'>Contribution/Role</p>
                        <p>Good Neighbors International, a valued collaborator, has been instrumental in transforming rural communities through education and health initiatives. They establish learning centers, provide quality education, and promote literacy. Additionally, they establish healthcare programs, clinics, and raise awareness for improved well-being. Together, we create sustainable change for a brighter future.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DonorsPartnersView