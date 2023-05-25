import Link from 'next/link'
import React from 'react'

const PrimaryButton = ({dispText, url}) => {
  return (
    <Link href={url}>
        <button className='rounded-md bg-primary hover:bg-primaryDark text-white border-none outline-none px-5 py-2'>
            {dispText}
        </button>
    </Link>
  )
}

export default PrimaryButton