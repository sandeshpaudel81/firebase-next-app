import React from 'react'

const DonorsHomeView = () => {
    const donors = [
        {"id":1, "image": "/assets/logo.png", },
        {"id":2, "image": "/assets/logo.png", },
        {"id":3, "image": "/assets/logo.png", },
        {"id":4, "image": "/assets/logo.png", },
        {"id":5, "image": "/assets/logo.png", },
        {"id":6, "image": "/assets/logo.png", },
        {"id":7, "image": "/assets/logo.png", },
        {"id":8, "image": "/assets/logo.png", }
    ]
    return (
        <div className='grid grid-cols-4 pt-10 gap-10'>
            {
                donors.map((item, index) => {
                    return <div key={index} className='col-span-2 md:col-span-1'>
                        <img src={item.image} className='w-9/12 mx-auto'/>
                    </div>
                })
            }
            
        </div>
  )
}

export default DonorsHomeView