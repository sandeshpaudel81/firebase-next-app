import ImageViewer from '@/components/common/ImageViewer'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'

const ContactView = () => {
    const initialMessage = {
        'name': '',
        'email': '',
        'message': ''
    }
    const [message, setmessage] = useState(initialMessage)
    const changeHandler = (e) => {
        setmessage({...message, [e.target.name]:e.target.value})
    }
    const submitMessage = (e) => {
        e.preventDefault()
        if(message.name.length > 0 && message.email.length>0 && message.message.length>0){
            console.log(message)
        } else {
            toast.error("Please fill up all the details.")
        }
    }
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
                    <div className='grid grid-cols-2 gap-2 mt-2'>
                        <div className=''>
                            <input type='text' name='name' value={message.name} placeholder='Your Name' className='w-full border-2 border-primaryD bg-transparent rounded-md px-2 py-1 focus:border-primaryDark' onChange={changeHandler} required></input>
                        </div>
                        <div>
                            <input type='email' name='email' value={message.email} placeholder='Your Email' className='w-full border-2 border-primaryD bg-transparent rounded-md px-2 py-1 focus:border-primaryDark' onChange={changeHandler} required></input>
                        </div>
                        <div className='col-span-2'>
                            <textarea name='message' value={message.message} placeholder='Your Message' className='w-full border-2 border-primaryD bg-transparent rounded-md px-2 py-1 focus:border-primaryDark' onChange={changeHandler} required></textarea>
                        </div>
                        <div>
                            <input type='submit' className='bg-primaryDark px-4 py-2 rounded-md text-white cursor-pointer' onClick={submitMessage}></input>
                        </div>
                    </div>    
                </div>  
            </div>
            <div className='border-slate-200 border-2 p-2'>
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d877.868493455157!2d83.56661395655763!3d28.344516582650993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snp!4v1686108305274!5m2!1sen!2snp" className='w-full h-[250px] lg:h-[300px]' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    )
}

export default ContactView