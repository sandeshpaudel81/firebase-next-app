import Link from 'next/link'
import React from 'react'

const AdminDashboard = () => {
  return (
    <div className='grid grid-cols-4 gap-5 mt-5'>
      <Link href='/admin/projects'>
        <div className='bg-gradient-to-r from-[#FF512F] to-[#DD2476] h-[130px] rounded-md p-2 col-span-2 lg:col-span-1'>
            <div className='text-end'>
                <p className='text-white font-medium'>PROJECTS</p>
            </div>
        </div>
      </Link>
      <Link href='/admin/slides'>
        <div className='bg-gradient-to-r from-[#26D0CE] to-[#1A2980] h-[130px] rounded-md p-2 col-span-2 lg:col-span-1'>
            <div className='text-end'>
                <p className='text-white font-medium'>SLIDES</p>
            </div>
        </div>
      </Link>
      <Link href='/admin/news'>
        <div className='bg-gradient-to-r from-[#E7E9BB] to-[#403B4A] h-[130px] rounded-md p-2 col-span-2 lg:col-span-1'>
            <div className='text-end'>
                <p className='text-white font-medium'>NEWS</p>
            </div>
        </div>
      </Link>
      <Link href='/admin/notices'>
        <div className='bg-gradient-to-r from-[#DA22FF] to-[#9733EE] h-[130px] rounded-md p-2 col-span-2 lg:col-span-1'>
            <div className='text-end'>
                <p className='text-white font-medium'>NOTICES</p>
            </div>
        </div>
      </Link>
      <Link href='/admin/notices'>
        <div className='bg-gradient-to-r from-[#fc6767] to-[#ec008c] h-[130px] rounded-md p-2 col-span-2 lg:col-span-1'>
            <div className='text-end'>
                <p className='text-white font-medium'>DONORS & PARTNERS</p>
            </div>
        </div>
      </Link>
      <Link href='/admin/notices'>
        <div className='bg-gradient-to-r from-[#ACBB78] to-[#799F0C] h-[130px] rounded-md p-2 col-span-2 lg:col-span-1'>
            <div className='text-end'>
                <p className='text-white font-medium'>MEMBERS</p>
            </div>
        </div>
      </Link>
      <Link href='/admin/notices'>
        <div className='bg-gradient-to-r from-[#159957] to-[#155799] h-[130px] rounded-md p-2 col-span-2 lg:col-span-1'>
            <div className='text-end'>
                <p className='text-white font-medium'>PUBLICATIONS</p>
            </div>
        </div>
      </Link>
    </div>
  )
}

export default AdminDashboard