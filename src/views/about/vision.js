import React, { useEffect, useState } from 'react'

const VisionsView = () => {

    const [render, setrender] = useState(false)
    const visionHtml = '<p><strong>Visions</strong> Here</p>'
    useEffect(() => {
        setrender(true)
    },[])

    return (
        <div className='container mx-auto py-10 px-2'>
            <div className='border-l-8 border-primary px-5'>
                <h2 className='text-primary font-bold text-3xl'>Our <span className='text-primaryDark'>Vision</span></h2>
                <p className='uppercase text-gray-600 text-sm font-medium mt-2'>Empowering Communities, Inspiring Change</p>
            </div>
            <p dangerouslySetInnerHTML={{ __html: render && visionHtml }} className='mt-10'></p>
        </div>
    )
}

export default VisionsView