import React, { useEffect, useState } from 'react'

const ObjectivesView = () => {

    const [render, setrender] = useState(false)
    const objectiveHtml = '<p><strong>Objectives</strong> Here</p>'
    useEffect(() => {
        setrender(true)
    },[])

    return (
        <div className='container mx-auto py-10 px-2'>
            <div className='border-l-8 border-primary px-5'>
                <h2 className='text-primary font-bold text-3xl'>Our <span className='text-primaryDark'>Objectives</span></h2>
                <p className='uppercase text-gray-600 text-sm font-medium mt-2'>Commitment to Excellence</p>
            </div>
            <p dangerouslySetInnerHTML={{ __html: render && objectiveHtml }} className='mt-10'></p>
        </div>
    )
}

export default ObjectivesView