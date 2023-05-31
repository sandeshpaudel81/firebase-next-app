import { doc, getDoc } from 'firebase/firestore'
import Link from 'next/link'
import React, {useEffect, useState} from 'react'
import { FaChevronLeft } from 'react-icons/fa'
import { db } from '../../../../firebase-config'
import CenteredLoading from '@/components/common/Loader'
import UploadProgress from '@/components/common/UploadProgress'

const SlideDetail = ({id}) => {
    const [image, setImage] = useState(null)
    
    const initialValue = {
        caption: "",
        is_active: true,
        imageUrl: "",
    }
    const [values, setvalues] = useState(initialValue)

    const handleChange = (e) => {
        if(e.target.name === "carousel_is_active") {
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
            console.log(err)
            setcarouselLoading(false)
          }
        }
        if(db){
            getData(id)
        }
    }, [db, id])

    const uploadImageHandler = () => {

    }

    const editCarouselHandler = () => {

    }

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
            {/* <div className='w-1/2'>
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
            </div> */}
            <div className='w-1/2'>
                <div className='flex flex-col mb-5'>
                    <label className='uppercase font-semibold'>Caption of the slide</label>
                    <textarea type='text' className='bg-gray-300 p-2 focus:border-primary focus:bg-gray-400 rounded-lg' name='carousel_caption' value={values.caption} onChange={handleChange}></textarea>
                </div>
                <div className='flex mb-5'>
                    <label className='uppercase font-semibold mr-5'>Slide Status</label>
                    <input type='checkbox' className='h-5 w-5 mr-5' name='carousel_is_active' checked={!!values.is_active} onChange={handleChange}></input>
                    <p>Active</p>
                </div>
                {/* <div>
                    {uploadSuccess ? (
                        <img src={imageUrl} alt='slide' className='w-[200px] h-[150px] object-cover object-center'/>
                    ) : <></> }
                </div> */}
                <div className='flex flex-col mb-5'>
                    <label className='uppercase font-semibold'>Current Image</label>
                    <img src={values.imageUrl} alt='slide' className='w-[200px] h-[150px] object-cover object-center'/>
                </div> 
                <div className='flex flex-col mb-5'>
                    <p className='uppercase font-semibold'>Upload new Image</p>
                    {(progress > 0) && (
                        <UploadProgress progress={progress}/>
                    )}
                    <input type='file' accept='image/*' onChange={(e) => setImage(e.target.files[0])}></input>
                    <button className='uppercase bg-primaryD w-1/5 text-white mt-3 rounded-md hover:bg-primaryDark cursor-pointer disabled:cursor-not-allowed' onClick={uploadImageHandler} disabled={image!==null ? "False" : "True"}>
                        Upload
                    </button>
                </div>
                <div className='flex flex-col mb-5'>
                    <label className='uppercase font-semibold'>Image URL</label>
                    <input type='text' className='bg-slate-400 text-white p-2 focus:border-primary focus:bg-gray-400 rounded-lg' name='carousel_imageUrl' onChange={handleChange} value={values.imageUrl} disabled></input>
                </div>
                <div>
                    <button type='submit' className='bg-primary px-8 py-3 text-white rounded-lg hover:bg-primaryDark cursor-pointer' onClick={editCarouselHandler}>Submit</button>
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
    </div>
  )
}

export default SlideDetail