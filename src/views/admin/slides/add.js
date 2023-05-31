import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaChevronLeft } from 'react-icons/fa'
import { addCarouselReset, addNewCarousel, fetchCarousel, uploadImage, uploadImageReset } from '@/redux/slices/carouselSlice'
import { useRouter } from 'next/router'
import Link from 'next/link'
import UploadProgress from '@/components/common/UploadProgress'


const SlideAdd = () => {
    const [image, setImage] = useState(null)
    const [caption, setCaption] =  useState("")
    const [isActive, setIsActive] =  useState(true)
    const [imageUrl, setImageUrl] = useState("")
    const [progress, setProgress] = useState(0)

    const router = useRouter()
    const dispatch = useDispatch()

    const {image:uploadedImageUrl, progress:uploadProgress, success:uploadSuccess} = useSelector(state => state.carousel.uploadCarouselImage);
    const {success: addCarouselSuccess} = useSelector(state => state.carousel.addCarousel)

    const uploadImageHandler = () => {
        if (image!==null){
            dispatch(uploadImage("carousel", image));
            return;
        }
        return;
    }

    const addCarouselHandler = () => {
        dispatch(addNewCarousel({
            caption: caption,
            imageUrl: imageUrl,
            is_active: isActive
        }))
    }

    useEffect(() => {
        if (addCarouselSuccess){
            dispatch(uploadImageReset())
            dispatch(addCarouselReset())
            dispatch(fetchCarousel())
            setProgress(0)
            router.push('/admin/slides/')
        }
    }, [dispatch, addCarouselSuccess, history])

    useEffect(() => {
        setProgress(uploadProgress)
    }, [uploadProgress])

    useEffect(() => {
        if(uploadSuccess){
            setImageUrl(uploadedImageUrl)
        }
    }, [uploadSuccess, uploadedImageUrl])

    return (
        <div>
            <div className='container mx-auto py-5'>
                <div className='border-l-8 border-primary px-5'>
                    <h2 className='text-primary font-bold text-3xl'>Add <span className='text-primaryDark'>Slides</span></h2>
                    <p className='uppercase text-gray-600 text-sm font-medium mt-2'>Appear on homescreen</p>
                </div>
                <div className='mt-5 md:mt-10'>
                    <div className='w-1/2'>
                        <div className='flex flex-col mb-5'>
                            <p className='uppercase font-semibold'>Image</p>
                            {(progress > 0) && (
                                <UploadProgress progress={progress}/>
                            )}
                            <input type='file' accept='image/*' onChange={(e) => setImage(e.target.files[0])}></input>
                            <button className='uppercase bg-primaryD w-1/5 text-white mt-3 rounded-md hover:bg-primaryDark cursor-pointer disabled:cursor-not-allowed' onClick={uploadImageHandler} disabled={image!==null ? "False" : "True"}>
                                Upload
                            </button>
                        </div>
                    </div>
                    <div className='w-1/2'>
                        <div className='flex flex-col mb-5'>
                            <label className='uppercase font-semibold'>Caption of the slide</label>
                            <textarea type='text' className='bg-gray-300 p-2 focus:border-primary focus:bg-gray-400 rounded-lg' name='carousel_caption' value={caption} onChange={(e) => setCaption(e.target.value)}></textarea>
                        </div>
                        <div className='flex mb-5'>
                            <label className='uppercase font-semibold mr-5'>Slide Status</label>
                            <input type='checkbox' className='h-5 w-5 mr-5' name='carousel_is_active' checked={isActive} onChange={(e) => setIsActive(e.target.checked)}></input>
                            <p>Active</p>
                        </div>
                        <div>
                            {uploadSuccess ? (
                                <img src={imageUrl} alt='slide' className='w-[200px] h-[150px] object-cover object-center'/>
                            ) : <></> }
                        </div>
                        <div className='flex flex-col mb-5'>
                            <label className='uppercase font-semibold'>Image URL</label>
                            <input type='text' className='bg-slate-400 text-white p-2 focus:border-primary focus:bg-gray-400 rounded-lg' name='carousel_imageUrl' value={imageUrl} disabled></input>
                        </div>
                        <div>
                            <button type='submit' className='bg-primary px-8 py-3 text-white rounded-lg hover:bg-primaryDark cursor-pointer' onClick={addCarouselHandler}>Submit</button>
                        </div>
                    </div>
                </div>
                <div className='flex justify-start mt-5'>
                    <Link href="/admin/slides" className='uppercase text-primary hover:text-primaryDark'>
                        <p className='flex items-center font-medium'><FaChevronLeft className='mr-3'/>All Slides</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SlideAdd