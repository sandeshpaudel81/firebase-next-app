import Link from 'next/link'
import React from 'react'

const NewsList = () => {
    return (
        <div className='container mx-auto py-10 px-2'>
            <div className='border-l-8 border-primary px-5'>
                <h2 className='text-primary font-bold text-3xl'>News <span className='text-primaryDark'>/ Events</span></h2>
                <p className='uppercase text-gray-600 text-sm font-medium mt-2'>Programs | Meetups | Affairs</p>
            </div>
            <div className='grid grid-cols-1 mt-10 gap-8 w-9/12 lg:w-1/2'>
                <div className='grid grid-cols-4 bg-slate-200'>
                    <div className='col-span-4 lg:col-span-1'>
                        <img src='/assets/car1.jpg' className='h-[150px] md:h-[200px] lg:h-[100px] w-full object-cover'/>
                    </div>
                    <div className='col-span-4 lg:col-span-3 p-2 h-[100px] lg:h-auto relative'>
                        <Link href='/notices/id'><h1 className='font-bold text-primaryD'>News Title News Title News Title News Title News</h1></Link>
                        <p className='text-slate-700 text-[10px]'>04 June 2023</p>
                        <Link href='/notices/id'>
                            <button className='absolute right-2 bottom-2 font-sm rounded-md bg-primaryD hover:bg-primaryDark text-white border-none outline-none px-3 py-1'>
                                Details
                            </button>
                        </Link>
                    </div>
                </div>
                <div className='grid grid-cols-4 bg-slate-200'>
                    <div className='col-span-4 lg:col-span-1'>
                        <img src='/assets/car1.jpg' className='h-[150px] md:h-[200px] lg:h-[100px] w-full object-cover'/>
                    </div>
                    <div className='col-span-4 lg:col-span-3 p-2 relative'>
                        <h1 className='font-bold text-primaryD'>News Title News Title</h1>
                        <p className='text-slate-700 text-[10px]'>04 June 2023</p>
                        <button className='absolute right-2 bottom-2 font-sm rounded-md bg-primaryD hover:bg-primaryDark text-white border-none outline-none px-3 py-1'>
                            Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewsList