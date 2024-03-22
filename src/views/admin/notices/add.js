import Tiptap from '@/components/common/TipTap';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FaArchive, FaCheck, FaFile, FaTimes } from "react-icons/fa";
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import UploadFiles from '@/components/common/UploadFiles';
import { addNotice, addNoticeReset, editNotice, editNoticeReset, fetchNotices } from '@/redux/slices/noticeSlice';
import { getFileNameFromUrl } from '../../../../firebase-config';
import DeleteNoticeModal from '@/components/common/deleteModal/deleteNotice';

const NoticeAdd = ({id}) => {

    const [showImageUploadModel, setShowImageUploadModel] = useState(false)
    const [showFileUploadModel, setShowFileUploadModel] = useState(false)

    const dispatch = useDispatch()
    const {data: notices, success: noticeSuccess} = useSelector(state => state.notice.getNotices)
    const {loading:addNoticeLoading, success:addNoticeSuccess, error:addNoticeError} = useSelector(state => state.notice.addNotice)
    const {loading:editNoticeLoading, success:editNoticeSuccess, error:editNoticeError} = useSelector(state => state.notice.addNotice)
    const [slugAllowed, setslugAllowed] = useState(false)
    const initialValue = {
        title: "",
        meta_description: "",
        slug: "",
        content: "",
        files: [],
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

    const removeMetaImage = () => {
        setvalues({ ...values, metaImage: '' })
    }

    const removeSelectedFile = (index, url) => {
        setvalues({ ...values, files: values.files.filter((file, i) => i !== index) });
    }

    const submitHandler = async (e) => {
        if(id=='add'){
            dispatch(addNotice(values))
        } else {
            dispatch(editNotice(id, oldData.metaId, values))
        }
    }

    const deleteSubmitHandler = (e) => {
        setShowModal(true)
    }

    useEffect(() => {
        if(addNoticeSuccess){
            toast.success("Notice added successfully.")
            dispatch(addNoticeReset())
            dispatch(fetchNotices())
            router.push('/admin/notices/')
        }
        if(!addNoticeSuccess && addNoticeError.length > 0){
            toast.error(addNoticeError)
        }
    }, [dispatch, addNoticeSuccess, addNoticeError])

    useEffect(() => {
        if(editNoticeSuccess){
            toast.success("Notice edited successfully.")
            dispatch(editNoticeReset())
            dispatch(fetchNotices())
            router.push('/admin/notices/')
        }
        if(!editNoticeSuccess && editNoticeError.length > 0){
            toast.error(editNoticeError)
        }
    }, [dispatch, editNoticeSuccess, editNoticeError])

    useEffect(() => {
        if (!noticeSuccess){
            dispatch(fetchNotices())
        } else {
            if(id=='add'){
                setvalues(initialValue)
            } else {
                const n = notices.find((n) => n.id === id)
                if(n != null){
                    setoldData(n)
                    const oldvalue = {
                        title: n.title,
                        meta_description: n.meta_description,
                        slug: n.metaId,
                        content: n.content,
                        files: n.files,
                        metaImage: n.metaImage
                    }
                    setvalues(oldvalue)
                } else {
                    toast.error("Notice not found!")
                    router.push('/admin/notices/')
                }
            }
        }
    }, [dispatch, noticeSuccess])

    useEffect(() => {
        if(values.slug.length === 0) {
            setslugAllowed(false)
        } else {
            const n = notices.find((n) => n.metaId === values.slug)
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
                <h2 className='text-primary font-bold text-3xl'>Add <span className='text-primaryDark'>Notice</span></h2>
                <p className='uppercase text-gray-600 text-sm font-medium mt-2'>On the repository</p>
            </div>
            <div className='mt-5 md:mt-10 text-sm'>
                <div className='w-1/2'>
                    <div className='flex flex-col mb-5'>
                        <label className='uppercase font-semibold'>Notice Title</label>
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
                        <small>{'https://www.kadammyagdi.com.np/notices/'+values.slug}</small>
                    </div>
                    <div className='flex flex-col mb-5'>
                        <label className='uppercase font-semibold'>Notice Content</label>
                        <Tiptap content={values.content} onChange={contentChangeHandler}/>
                    </div>
                    <div className='flex flex-col'>
                        <label className='uppercase font-semibold'>Meta Image</label>
                        <button className='capitalize bg-primaryExtraLight w-[150px] px-3 py-2 text-black mt-3 rounded-md hover:bg-primaryLight cursor-pointer disabled:cursor-not-allowed' onClick={() => setShowImageUploadModel(true)}>
                            Choose image
                        </button>
                        <div className='flex gap-3 mb-2'>
                            {values.metaImage ? (
                                <div className='relative mt-2'>
                                    <img 
                                        src={values.metaImage}  
                                        className='w-[150px] h-[100px] object-cover object-center cursor-pointer border-gray-300'
                                    />
                                    <span className='absolute -top-2 -right-2 text-lg p-2 bg-white rounded-full cursor-pointer' onClick={() => removeMetaImage()}><FaArchive className='text-red-600'/></span>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                    <div className='flex flex-col mb-5'>
                        <p className='uppercase font-semibold'>Related Files</p>
                        <button className='capitalize bg-primaryExtraLight w-[150px] px-3 py-2 text-black mt-3 rounded-md hover:bg-primaryLight cursor-pointer disabled:cursor-not-allowed' onClick={() => setShowFileUploadModel(true)}>
                            Choose files
                        </button>
                    </div>

                    <div className='flex gap-3 mb-5'>
                        {values.files.length > 0 ? (
                            values.files.map((j, index) => (
                                <div key={index} className='relative mt-2'>
                                    <div className='flex flex-col w-28 h-28 items-center overflow-hidden'><FaFile className='text-5xl text-gray-400'/><p className='text-center'>{getFileNameFromUrl(j)}</p></div>
                                    <span className='absolute -top-2 -right-2 text-lg p-2 bg-white rounded-full cursor-pointer' onClick={() => removeSelectedFile(index, j)}><FaArchive className='text-red-600'/></span>
                                </div>
                            ))
                        ) : (
                            <></>
                        )}
                    </div>
                    <div>
                        <button type='submit' className='bg-primary px-8 py-3 text-white rounded-lg hover:bg-primaryDark cursor-pointer' onClick={submitHandler}>
                            {  
                                id == 'add' ? 
                                (addNoticeLoading ? 'Adding' : 'Add Notice'): 
                                (editNoticeLoading ? 'Editing' : 'Edit Notice')
                            }
                        </button>
                        {
                            id !== 'add' &&
                            <button type='submit' className='bg-red-600 ml-3 px-8 py-3 text-white rounded-lg hover:bg-primaryDark cursor-pointer' onClick={deleteSubmitHandler}>
                                Delete Notice
                            </button>
                        }
                    </div>
                </div>
            </div>
            {
                showModal &&
                <DeleteNoticeModal
                    setShowModal={setShowModal}
                    id={id}
                    slug={oldData.metaId}
                />
            }
            {
                showImageUploadModel &&
                <UploadFiles 
                    setShowUploadModal={setShowImageUploadModel}
                    values={values} 
                    setvalues={setvalues} 
                    type='string'
                    varName='metaImage'
                />
            }
            {
                showFileUploadModel &&
                <UploadFiles 
                    setShowUploadModal={setShowFileUploadModel}
                    values={values} 
                    setvalues={setvalues} 
                    type='array'
                    varName='files'
                />
            }
                
        </div>
    )
}

export default NoticeAdd