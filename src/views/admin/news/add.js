import Tiptap from '@/components/common/TipTap';
import { addNews, addNewsReset, editNews, editNewsReset, fetchNews } from '@/redux/slices/newsSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FaArchive, FaCheck, FaTimes } from "react-icons/fa";
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import DeleteNewsModal from '@/components/common/deleteModal/deleteNews';
import UploadFiles from '@/components/common/UploadFiles';

const NewsAdd = ({id}) => {

    const [showUploadModel, setShowUploadModel] = useState(false)

    const dispatch = useDispatch()
    const {data: news, success: newsSuccess} = useSelector(state => state.news.getNews)
    const {loading:addNewsLoading, success:addNewsSuccess, error:addNewsError} = useSelector(state => state.news.addNews)
    const {loading:editNewsLoading, success:editNewsSuccess, error:editNewsError} = useSelector(state => state.news.editNews)
    const [slugAllowed, setslugAllowed] = useState(false)
    const initialValue = {
        title: "",
        meta_description: "",
        slug: "",
        content: "",
        images: [],
        metaImage: ''
    }
    const [oldData, setoldData] = useState({})
    const [showModal, setShowModal] = useState(false)
    const router = useRouter()

    const [values, setvalues] = useState(initialValue)

    const changeHandler = (e) => {
        setvalues({ ...values, [e.target.name]: e.target.value })
    }
    
    const slugChangeHandler = (e) => {
        setvalues({ ...values, slug: e.target.value.trim() })
    }

    const contentChangeHandler = (e) => {
        setvalues({ ...values, content: e })
    }

    const removeSelectedImage = (index, url) => {
        if (values.metaImage === url) {
            setvalues({ ...values, metaImage: '', images: values.images.filter((image, i) => i !== index) });
        } else {
            setvalues({ ...values, images: values.images.filter((image, i) => i !== index) });
        }
    }

    const toggleMetaImage = (imgUrl) => {
        if(values.metaImage !== imgUrl){
            setvalues({ ...values, metaImage: imgUrl })
        } else {
            setvalues({ ...values, metaImage: ''})
        }
    }

    const submitHandler = async (e) => {
        if(id=='add'){
            dispatch(addNews(values))
        } else {
            dispatch(editNews(id, oldData.metaId, values))
        }
    }

    const deleteSubmitHandler = (e) => {
        setShowModal(true)
    }

    useEffect(() => {
        if(addNewsSuccess){
            toast.success("News added successfully.")
            dispatch(uploadImageReset())
            dispatch(deleteImageReset())
            dispatch(addNewsReset())
            dispatch(fetchNews())
            setProgress(0)
            router.push('/admin/news/')
        }
        if(!addNewsSuccess && addNewsError.length > 0){
            toast.error(addNewsError)
        }
    }, [addNewsSuccess, addNewsError])

    useEffect(() => {
        if(editNewsSuccess){
            toast.success("News edited successfully.")
            dispatch(uploadImageReset())
            dispatch(deleteImageReset())
            dispatch(editNewsReset())
            dispatch(fetchNews())
            setProgress(0)
            router.push('/admin/news/')
        }
        if(!editNewsSuccess && editNewsError.length > 0){
            toast.error(editNewsError)
        }
    }, [editNewsSuccess, editNewsError])

    useEffect(() => {
        if (!newsSuccess){
            dispatch(fetchNews())
        } else {
            if(id=='add'){
                setvalues(initialValue)
            } else {
                const n = news.find((n) => n.id === id)
                if(n != null){
                    setoldData(n)
                    const oldvalue = {
                        title: n.title,
                        meta_description: n.meta_description,
                        slug: n.metaId,
                        content: n.content,
                        images: n.images,
                        metaImage: n.metaImage
                    }
                    setvalues(oldvalue)
                } else {
                    toast.error("News not found!")
                    router.push('/admin/news/')
                }
            }
        }
    }, [dispatch, newsSuccess])

    useEffect(() => {
        if(values.slug.length === 0) {
            setslugAllowed(false)
        } else {
            const n = news.find((n) => n.metaId === values.slug)
            if(n != null){
                if (id=='add'){
                    setslugAllowed(false)
                } else {
                    setslugAllowed(true)
                }
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
                        <Tiptap content={values.content} onChange={(e) => contentChangeHandler(e)}/>
                    </div>
                    <div className='flex flex-col mb-5'>
                        <p className='uppercase font-semibold'>Images</p>
                        <button className='capitalize bg-primaryD w-[150px] px-3 py-2 text-white mt-3 rounded-md hover:bg-primaryDark cursor-pointer disabled:cursor-not-allowed' onClick={() => setShowUploadModel(true)}>
                            Choose images
                        </button>
                    </div>
                    <div className='flex flex-col'>
                        <label className='uppercase font-semibold'>Meta Image</label>
                        <small>Select meta image:</small>
                        <div className='flex gap-3 mb-2'>
                            {values.images.length > 0 ? (
                                values.images.map((j, index) => (
                                    <div key={index} className='relative mt-2'>
                                        <img 
                                            src={j} 
                                            alt='Upload image for carousel' 
                                            className={values.metaImage == j ? 'w-[150px] h-[100px] object-cover object-center cursor-pointer border-primaryD border-4': 'w-[150px] h-[100px] object-cover object-center cursor-pointer border-gray-300'}
                                            onClick={() => toggleMetaImage(j)}
                                        />
                                        {
                                            values.metaImage == j &&
                                            <span className='absolute text-xl top-1/2 left-1/2 p-2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full'><FaCheck className='text-green-700'/></span>
                                        }
                                        <span className='absolute -top-2 -right-2 text-lg p-2 bg-white rounded-full cursor-pointer' onClick={() => removeSelectedImage(index, j)}><FaArchive className='text-red-600'/></span>
                                    </div>
                                ))
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                    <div>
                        <button type='submit' className='bg-primary px-8 py-3 text-white rounded-lg hover:bg-primaryDark cursor-pointer' onClick={submitHandler}>
                            {
                                id == 'add' ? 'Add News' : 'Edit News'
                            }
                        </button>
                        {
                            id !== 'add' &&
                            <button type='submit' className='bg-red-600 ml-3 px-8 py-3 text-white rounded-lg hover:bg-primaryDark cursor-pointer' onClick={deleteSubmitHandler}>
                                Delete News
                            </button>
                        }
                    </div>
                </div>
            </div>
            {
                showModal &&
                <DeleteNewsModal
                    setShowModal={setShowModal}
                    id={id}
                    slug={oldData.metaId}
                />
            }
            {
                showUploadModel &&
                <UploadFiles 
                    setShowUploadModal={setShowUploadModel}
                    values={values} 
                    setvalues={setvalues} 
                    type='array'
                    varName='images'
                />
            }
                
        </div>
    )
}

export default NewsAdd