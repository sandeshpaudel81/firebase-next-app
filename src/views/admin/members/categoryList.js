import Link from 'next/link';
import React from 'react'
import { FaEdit } from 'react-icons/fa';

const TeamCategoryList = () => {
    return (
        <div>
            <div className=" text-black">
                <div className="flex flex-col justify-center divide-y-2 mt-10 w-1/2">
                    <div className='bg-slate-300 p-2 flex'>
                        <div>
                            <h1 className='text-lg'>Board Committee</h1>
                        </div>
                        <div className="ml-5">
                            <Link href='/admin/members/board-committee'>
                                <FaEdit className='text-2xl text-primary hover:text-primaryDark'/>
                            </Link>
                        </div>
                    </div>
                    <div className='bg-slate-300 p-2 flex'>
                        <div>
                            <h1 className='text-lg'>Office Staffs</h1>
                        </div>
                        <div className="ml-5">
                            <Link href='/admin/members/office-staffs'>
                                <FaEdit className='text-2xl text-primary hover:text-primaryDark'/>
                            </Link>
                        </div>
                    </div>
                    <div className='bg-slate-300 p-2 flex'>
                        <div>
                            <h1 className='text-lg'>Advisors</h1>
                        </div>
                        <div className="ml-5">
                            <Link href='/admin/members/advisors'>
                                <FaEdit className='text-2xl text-primary hover:text-primaryDark'/>
                            </Link>
                        </div>
                    </div>
                    <div className='bg-slate-300 p-2 flex'>
                        <div>
                            <h1 className='text-lg'>General & Life Members</h1>
                        </div>
                        <div className="ml-5">
                            <Link href='/admin/members/general-life-members'>
                                <FaEdit className='text-2xl text-primary hover:text-primaryDark'/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeamCategoryList