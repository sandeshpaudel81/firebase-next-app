import React from 'react'
import { BiMenuAltRight } from 'react-icons/bi'

const MobileHeader = () => {
    const handleClick = () => {
        
    }
    return (
        <div className='lg:hidden'>
            <div className='flex text-sm bg-primaryDark text-white'>
                <p className='p-2'>Kaligandaki Community Development Munch (KADAM)</p>
            </div>
            <div>
                <img className='w-2/3 mx-auto' src='/assets/logo.png'/>
            </div> 
            <div className='flex justify-between bg-primaryDark text-white p-2'>
                <p>Home</p>
                <div className='text-xl' onClick={handleClick}>
                    <BiMenuAltRight />
                </div>
            </div>
        </div>
    )
}

export default MobileHeader