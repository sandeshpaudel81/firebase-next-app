import { doc, getDoc } from 'firebase/firestore'
import Link from 'next/link'
import React, {useEffect, useState} from 'react'
import { FaChevronLeft } from 'react-icons/fa'
import { db } from '../../../../firebase-config'
import CenteredLoading from '@/components/common/Loader'
import UploadProgress from '@/components/common/UploadProgress'
import { uploadImage, deleteImage, deleteImageReset, uploadImageReset } from '@/redux/slices/imageSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { editCarousel, editCarouselReset, fetchCarousel } from '@/redux/slices/carouselSlice'
import { toast } from 'react-hot-toast'
import DeleteSlide from './delete'

const SlideDetail = ({id}) => {
    const [image, setImage] = useState(null)

    const {success:deleteSuccess} = useSelector(state => state.image.deleteImage)
    const {image:uploadedImageUrl, loading:uploadLoading, progress:uploadProgress, success:uploadSuccess} = useSelector(state => state.image.uploadImage);
    const {success: editCarouselSuccess, loading:editCarouselLoading} = useSelector(state => state.carousel.editCarousel)
    
    const initialValue = {
        caption: "",
        is_active: true,
        imageUrl: "",
    }
    const [values, setvalues] = useState(initialValue)
    const [showModal, setShowModal] = useState(false)

    const dispatch = useDispatch()
    const router = useRouter()

    const handleChange = (e) => {
        if(e.target.name === "is_active") {
            setvalues({ ...values, [e.target.name]: e.target.checked })
        } else {
            setvalues({ ...values, [e.target.name]: e.target.value })
        }
    }

    const [progress, setProgress] = useState(0)

    const [carouselLoading, setcarouselLoading] = useState(false)

    useEffect(() => {
        const getData = async (id) => {
          try {
            setcarouselLoading(true)
            const docRef = doc(db, "carousel", id);
            const docSnap = await getDoc(docRef);
            setvalues(docSnap.data())
            setcarouselLoading(false)
          } catch(err) {
            setcarouselLoading(false)
          }
        }
        if(db){
            getData(id)
        }
    }, [db, id])

    const uploadImageHandler = () => {
        if (image!==null){
            dispatch(deleteImage(values.imageUrl));
            dispatch(uploadImage("carousel", image));
            toast.success("Image uploaded successfully.")
            dispatch(deleteImageReset());
            return;
        }
        return;
    }

    const editCarouselHandler = () => {
        dispatch(editCarousel(id, values))
    }

    const handleDeleteButton = () => {
        setShowModal(true)
    }

    useEffect(() => {
        if (editCarouselSuccess){
            dispatch(uploadImageReset())
            dispatch(editCarouselReset())
            dispatch(fetchCarousel())
            setProgress(0)
            router.push('/admin/slides/')
            toast.success("Slide updated successfully.")
        }
    }, [dispatch, editCarouselSuccess])

    useEffect(() => {
        setProgress(uploadProgress)
    }, [uploadProgress])

    useEffect(() => {
        if(uploadSuccess){
            setvalues({ ...values, ["imageUrl"]: uploadedImageUrl })
        }
    }, [uploadSuccess, uploadedImageUrl])

    useEffect(() => {
        if(deleteSuccess){
            setvalues({ ...values, ["imageUrl"]: "" })
        }
    }, [deleteSuccess])

  return (
    <div className='container mx-auto py-5'>
        <div className='border-l-8 border-primary px-5'>
            <h2 className='text-primary font-bold text-3xl'>Edit <span className='text-primaryDark'>Slide</span></h2>
            <p className='uppercase text-gray-600 text-sm font-medium mt-2'>That Appear on homescreen</p>
        </div>
        {
            !carouselLoading 
            
        ?
        <div className='mt-5 md:mt-10'>
            <div className='w-1/2'>
                <div className='flex flex-col mb-5'>
                    <label className='uppercase font-semibold'>Caption of the slide</label>
                    <textarea type='text' className='bg-gray-300 p-2 focus:border-primary focus:bg-gray-400 rounded-lg' name='caption' value={values.caption} onChange={handleChange}></textarea>
                </div>
                <div className='flex mb-5'>
                    <label className='uppercase font-semibold mr-5'>Slide Status</label>
                    <input type='checkbox' className='h-5 w-5 mr-5' name='is_active' checked={!!values.is_active} onChange={handleChange}></input>
                    <p>Active</p>
                </div>
                <div className='flex flex-col mb-5'>
                    <label className='uppercase font-semibold'>Current Image</label>
                    <img src={values.imageUrl} alt='slide' className='w-[200px] h-[150px] object-cover object-center'/>
                </div> 
                <div className='flex flex-col mb-5'>
                    <p className='uppercase font-semibold'>Upload new Image</p>
                    {(progress > 0) ? 
                        <UploadProgress progress={progress}/> : <div></div>
                    }
                    <input type='file' accept='image/*' onChange={(e) => setImage(e.target.files[0])}></input>
                    <button className='uppercase bg-primaryD w-1/5 text-white mt-3 rounded-md hover:bg-primaryDark cursor-pointer disabled:cursor-not-allowed' onClick={uploadImageHandler}>
                        { uploadLoading ? "Uploading..." : "Upload" }
                    </button>
                </div>
                <div className='flex flex-col mb-5'>
                    <label className='uppercase font-semibold'>Image URL</label>
                    <input type='text' className='bg-slate-400 text-white p-2 focus:border-primary focus:bg-gray-400 rounded-lg' name='imageUrl' onChange={handleChange} value={values.imageUrl} disabled></input>
                </div>
                <div className='flex gap-5'>
                    <button type='submit' className='bg-primary px-8 py-3 text-white rounded-lg hover:bg-primaryDark cursor-pointer' onClick={editCarouselHandler}>
                        {editCarouselLoading ? "Updating..." : "Update" }
                    </button>
                    <button type='submit' className='bg-red-700 px-8 py-3 text-white rounded-lg hover:bg-red-800 cursor-pointer' onClick={handleDeleteButton}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
        :
        <CenteredLoading />
        }
        <div className='flex justify-start mt-5'>
            <Link href="/admin/slides" className='uppercase text-primary hover:text-primaryDark'>
                <p className='flex items-center font-medium'><FaChevronLeft className='mr-3'/>All Slides</p>
            </Link>
        </div>
        <DeleteSlide showModal={showModal} setShowModal={setShowModal} id={id}/>
    </div>
  )
}

export default SlideDetail