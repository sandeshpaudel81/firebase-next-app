import React from 'react'

const ContactView = () => {
    return (
        <div className='container mx-auto py-10 px-2'>
            <div className='border-l-8 border-primary px-5'>
                <h2 className='text-primary font-bold text-3xl'>Contact <span className='text-primaryDark'>Us</span></h2>
                <p className='uppercase text-gray-600 text-sm font-medium mt-2'>Keep in touch</p>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 my-10'>
                <div className='flex flex-col gap-y-1 bg-primaryDark p-10 text-slate-300'>
                    <p className='font-semibold text-xl text-white'>KADAM Myagdi</p>
                    <p>Beni - 8, Myagdi</p>
                    <p>Gandaki Province</p>
                    <p>Phone: +977-69520895</p>
                    <p>Email: kadammyagdi@gmail.com</p>
                </div>
                <div className='bg-slate-200 p-10'>
                    <p className='font-semibold text-xl text-primaryDark uppercase'>Send us a message</p>    
                </div>  
            </div>
            <div className='border-slate-200 border-2 p-2'>
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d877.868493455157!2d83.56661395655763!3d28.344516582650993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snp!4v1686108305274!5m2!1sen!2snp" className='w-full h-[250px] lg:h-[300px]' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    )
}

export default ContactView