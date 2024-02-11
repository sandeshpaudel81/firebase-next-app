import Tiptap from '@/components/common/TipTap';
import { fetchNews } from '@/redux/slices/newsSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FaArchive, FaCheck, FaTimes } from "react-icons/fa";
import UploadProgress from '@/components/common/UploadProgress';
import { deleteImage, uploadImage } from '@/redux/slices/imageSlice';

const NewsAdd = () => {
    const dispatch = useDispatch()
    const {data: news, success: newsSuccess} = useSelector(state => state.news.getNews)
    const [slugAllowed, setslugAllowed] = useState(false)
    const [metaImageSelection, setMetaImageSelection] = useState(false)
    const initialValue = {
        title: "",
        meta_description: "",
        slug: "",
        content: "",
        images: [],
        metaImage: ''
    }

    const [values, setvalues] = useState(initialValue)

    const [image, setImage] = useState(null)
    const [progress, setProgress] = useState(0)
    const {image:uploadedImageUrls, progress:uploadProgress, success:uploadSuccess} = useSelector(state => state.image.uploadImage)

    const uploadImageHandler = async () => {
        if (image!==null){
            for (let i=0; i<image.length; i++){
                dispatch(uploadImage("news", image[i]))
            }
            return;
        }
        return;
    }

    const changeHandler = (e) => {
        setvalues({ ...values, [e.target.name]: e.target.value })
    }
    
    const slugChangeHandler = (e) => {
        setvalues({ ...values, slug: e.target.value.trim() })
    }

    const contentChangeHandler = (e) => {
        setvalues({ ...values, content: e })
    }

    // const deleteImageHandler = (imgUrl) => {
    //     dispatch(deleteImage(imgUrl))
    // }

    const toggleMetaImage = (imgUrl) => {
        setvalues({ ...values, metaImage: imgUrl })
    }

    const submitHandler = (e) => {
        console.log(values)
    }

    useEffect(() => {
        setProgress(uploadProgress)
    }, [uploadProgress])

    useEffect(() => {
        if(uploadSuccess){
            setvalues({...values, images: uploadedImageUrls})
        }
    }, [uploadSuccess, uploadedImageUrls])

    useEffect(() => {
        if (!newsSuccess){
            dispatch(fetchNews())
        }
    }, [dispatch, newsSuccess])

    useEffect(() => {
        if(values.slug.length === 0) {
            setslugAllowed(false)
        } else {
            const n = news.find((n) => n.metaId === values.slug)
            if(n != null){
                setslugAllowed(false)
            } else {
                setslugAllowed(true)
            }
        }
    }, [values.slug])
    
    return (
        <div className='container mx-auto py-5'>
            <div className='border-l-8 border-primary px-5'>
                <h2 className='text-primary font-bold text-3xl'>Add <span className='text-primaryDark'>News</span></h2>
                <p className='uppercase text-gray-600 text-sm font-medium mt-2'>On the repository</p>
            </div>
            <div className='mt-5 md:mt-10 text-sm'>
                <div className='w-1/2'>
                    <div className='flex flex-col mb-5'>
                        <label className='uppercase font-semibold'>News Title</label>
                        <input type='text' className='bg-gray-300 p-2 outline-none focus:bg-[#b4bbc5] rounded-lg' name='title' value={values.title} onChange={changeHandler}></input>
                    </div>
                    <div className='flex flex-col mb-5'>
                        <label className='uppercase font-semibold'>Meta Description</label>
                        <input type='text' className='bg-gray-300 p-2 outline-none focus:bg-[#b4bbc5] rounded-lg' name='meta_description' value={values.meta_description} onChange={changeHandler}></input>
                    </div>
                    <div className='flex flex-col mb-5 relative'>
                        <label className='uppercase font-semibold'>Slug</label>
                        <input type='text' className='bg-gray-300 p-2 outline-none focus:bg-[#b4bbc5] rounded-lg' name='slug' value={values.slug} onChange={slugChangeHandler} placeholder='eg. social-audit-report'></input>
                        <span className='absolute top-7 right-2 text-xl'>{slugAllowed ? <FaCheck className='text-green-700'/> : <FaTimes className='text-red-600'/>}</span>
                        <small>{'https://www.kadammyagdi.com.np/news/'+values.slug}</small>
                    </div>
                    <div className='flex flex-col mb-5'>
                        <label className='uppercase font-semibold'>News Content</label>
                        <Tiptap content={values.content} onChange={contentChangeHandler}/>
                    </div>
                    <div className='flex flex-col mb-5'>
                        <p className='uppercase font-semibold'>Image</p>
                        {(progress > 0) && (
                            <UploadProgress progress={progress}/>
                        )}
                        <input type='file' accept='image/*' multiple onChange={(e) => setImage(e.target.files)}></input>
                        <button className='uppercase bg-primaryD w-1/5 text-white mt-3 rounded-md hover:bg-primaryDark cursor-pointer disabled:cursor-not-allowed' onClick={uploadImageHandler}>
                            Upload
                        </button>
                    </div>
                    <div className='flex flex-col'>
                        <label className='uppercase font-semibold'>Meta Image</label>
                        <button className='uppercase border-2 border-primary w-1/5 rounded-md hover:bg-gray-200 cursor-pointer disabled:cursor-not-allowed' onClick={setMetaImageSelection(true)}>Select</button>
                        <div className='flex gap-2 mb-2'>
                            {/* {metaImageSelection ? (
                                values.images.map((j, index) => (
                                    <div className='relative'>
                                        <img 
                                            key={index} 
                                            src={j} 
                                            alt='Upload image for carousel' 
                                            className='w-[150px] h-[100px] object-cover object-center cursor-pointer border-gray-300'
                                            onClick={toggleMetaImage(j)}
                                        />
                                        <span className='absolute -top-2 -right-2 text-lg p-2 bg-white rounded-full cursor-pointer'><FaArchive className='text-red-600'/></span>
                                    </div>
                                ))
                            ) : (
                                <></>
                            )} */}
                        </div>
                    </div>
                    <div>
                        <button type='submit' className='bg-primary px-8 py-3 text-white rounded-lg hover:bg-primaryDark cursor-pointer' onClick={submitHandler}>Add News</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewsAdd