import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaArchive, FaChevronLeft } from 'react-icons/fa'
import { addCarouselReset, addNewCarousel, editCarousel, editCarouselReset, fetchCarousel } from '@/redux/slices/carouselSlice'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import UploadFiles from '@/components/common/UploadFiles'
import { getFileNameFromUrl } from '../../../../firebase-config'
import DeleteSlideModal from '@/components/common/deleteModal/deleteSlide'
import toast from 'react-hot-toast'


const SlideAdd = ({id}) => {
    const [showUploadModel, setShowUploadModel] = useState(false)
    const initialValue = {
        caption: "",
        isActive: true,
        images: ""
    }
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const router = useRouter()
    const dispatch = useDispatch()

    const {data:slides, success:slidesSuccess} = useSelector(state => state.carousel.getCarousel)
    const {success: addCarouselSuccess, error:addCarouselError} = useSelector(state => state.carousel.addCarousel)
    const {success: editCarouselSuccess, error:editCarouselError} = useSelector(state => state.carousel.editCarousel)

    const [values, setvalues] = useState(initialValue)

    const changeHandler = (e) => {
        setvalues({ ...values, [e.target.name]: e.target.value })
    }

    const removeSelectedImage = () => {
        setvalues({...values, images:''})
    }

    const deleteSubmitHandler = (e) => {
        setShowDeleteModal(true)
    }

    const submitHandler = () => {
        if(id=='add'){
            dispatch(addNewCarousel({
                caption: values.caption,
                imageUrl: values.images,
                is_active: values.isActive
            }))
        } else {
            dispatch(editCarousel(id, {
                caption: values.caption,
                imageUrl: values.images,
                is_active: values.isActive
            }))
        }
        
    }

    useEffect(() => {
        if (addCarouselSuccess){
            toast.success("Slide added successfully.")
            dispatch(addCarouselReset())
            dispatch(fetchCarousel())
            router.push('/admin/slides/')
        }
        if(!addCarouselSuccess && addCarouselError.length > 0){
            toast.error(addCarouselError)
        }
    }, [dispatch, addCarouselSuccess, addCarouselError, history])

    useEffect(() => {
        if(editCarouselSuccess){
            toast.success("Slide edited successfully.")
            dispatch(editCarouselReset())
            dispatch(fetchCarousel())
            router.push('/admin/slides/')
        }
        if(!editCarouselSuccess && editCarouselError.length > 0){
            toast.error(editCarouselError)
        }
    }, [dispatch, editCarouselSuccess, editCarouselError, history])

    useEffect(() => {
        if (!slidesSuccess){
            dispatch(fetchCarousel())
        } else {
            if(id=='add'){
                setvalues(initialValue)
            } else {
                const n = slides.find((n) => n.id === id)
                if(n != null){
                    const oldvalue = {
                        caption: n.caption,
                        isActive: n.is_active,
                        images: n.imageUrl
                    }
                    setvalues(oldvalue)
                } else {
                    toast.error("Slide not found!")
                    router.push('/admin/slides/')
                }
            }
        }
    }, [dispatch, slidesSuccess])

    return (
        <div>
            <div className='container mx-auto py-5'>
                <div className='border-l-8 border-primary px-5'>
                    <h2 className='text-primary font-bold text-3xl'>Add <span className='text-primaryDark'>Slides</span></h2>
                    <p className='uppercase text-gray-600 text-sm font-medium mt-2'>Appear on homescreen</p>
                </div>
                <div className='mt-5 md:mt-10'>
                    <div className='w-full lg:w-1/2'>
                        <div className='flex flex-col mb-5'>
                            <p className='uppercase font-semibold'>Image</p>
                            <button className='capitalize bg-primaryD w-[150px] px-3 py-2 text-white mt-3 rounded-md hover:bg-primaryDark cursor-pointer disabled:cursor-not-allowed' onClick={() => setShowUploadModel(true)}>
                                Choose image
                            </button>
                        </div>
                    </div>
                    <div className='w-1/2'>
                        <div className='flex flex-col mb-5'>
                            <label className='uppercase font-semibold'>Caption of the slide</label>
                            <textarea type='text' className='bg-gray-300 p-2 focus:border-primary focus:bg-gray-400 rounded-lg' name='caption' value={values.caption} onChange={changeHandler}></textarea>
                        </div>
                        <div className='flex mb-5'>
                            <label className='uppercase font-semibold mr-5'>Slide Status</label>
                            <input type='checkbox' className='h-5 w-5 mr-5' name='is_active' checked={values.isActive} onChange={changeHandler}></input>
                            <p>Active</p>
                        </div>
                        <div className='flex mb-5'>
                            {values.images.length>0 ? (
                                <div className='relative'>
                                    <img src={values.images} alt='Upload image for carousel' className='w-[200px] h-[150px] object-cover object-center'/>
                                    <span className='absolute -top-2 -right-2 text-lg p-2 bg-gray-300 rounded-full cursor-pointer' onClick={removeSelectedImage}><FaArchive className='text-red-600'/></span>
                                </div>
                            ) : <></> }
                        </div>
                        <div className='flex flex-col mb-5'>
                            <label className='uppercase font-semibold'>Selected Image</label>
                            <input type='text' className='bg-slate-400 text-gray-800 p-2 focus:border-primary focus:bg-gray-400 rounded-lg' name='imageUrl' value={getFileNameFromUrl(values.images)} disabled></input>
                        </div>
                        <div>
                            <button type='submit' className='bg-primary px-8 py-3 text-white rounded-lg hover:bg-primaryDark cursor-pointer' onClick={submitHandler}>
                            {
                                id == 'add' ? 'Add Slide' : 'Edit Slide'
                            }
                            </button>
                            {
                                id !== 'add' &&
                                <button type='submit' className='bg-red-600 ml-3 px-8 py-3 text-white rounded-lg hover:bg-primaryDark cursor-pointer' onClick={deleteSubmitHandler}>
                                    Delete Slide
                                </button>
                            }
                        </div>
                    </div>
                </div>
                <div className='flex justify-start mt-5'>
                    <Link href="/admin/slides" className='uppercase text-primary hover:text-primaryDark'>
                        <p className='flex items-center font-medium'><FaChevronLeft className='mr-3'/>All Slides</p>
                    </Link>
                </div>
            </div>
            {
                showUploadModel &&
                <UploadFiles 
                    setShowUploadModal={setShowUploadModel}
                    values={values} 
                    setvalues={setvalues} 
                    type='string'
                    varName='images'
                />
            }
            {
                showDeleteModal &&
                <DeleteSlideModal
                    setShowModal={setShowDeleteModal}
                    id={id}
                />
            }
        </div>
    )
}

export default SlideAdd