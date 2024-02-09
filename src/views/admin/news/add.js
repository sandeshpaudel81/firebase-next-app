import Tiptap from '@/components/common/TipTap';
// import { fetchNews } from '@/redux/slices/newsSlice';
import React, { useEffect, useState } from 'react'
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { useDispatch, useSelector } from 'react-redux';

const NewsAdd = () => {
    // const dispatch = useDispatch()
    // const {data: news, success: newsSuccess} = useSelector(state => state.news.getNews)
    // const [slugAllowed, setslugAllowed] = useState(false)
    const initialValue = {
        title: "",
        meta_description: "",
        slug: "",
        content: "",
    }

    const [values, setvalues] = useState(initialValue)

    const changeHandler = (e) => {
        setvalues({ ...values, [e.target.name]: e.target.value })
        // if(e.target.name === "isCompleted") {
        //     setvalues({ ...values, [e.target.name]: e.target.checked })
        // } else {
        //     setvalues({ ...values, [e.target.name]: e.target.value })
        // }
    }

    const contentChangeHandler = (e) => {
        setvalues({ ...values, content: e })
    }

    const submitHandler = (e) => {
        console.log(values)
    }

    // useEffect(() => {
    //     if (!newsSuccess){
    //         dispatch(fetchNews())
    //     }
    //     console.log(news)
    // }, [dispatch, newsSuccess])

    const slugChangeHandler = (e) => {
        setvalues({ ...values, slug: e.target.value })
    }
    
    return (
        <div className='container mx-auto py-5'>
            <div className='border-l-8 border-primary px-5'>
                <h2 className='text-primary font-bold text-3xl'>Add <span className='text-primaryDark'>News</span></h2>
                <p className='uppercase text-gray-600 text-sm font-medium mt-2'>On the repository</p>
            </div>
            <div className='mt-5 md:mt-10'>
                <div className='w-1/2'>
                    <div className='flex flex-col mb-5'>
                        <label className='uppercase font-semibold'>News Title</label>
                        <input type='text' className='bg-gray-300 p-2 outline-none focus:bg-[#b4bbc5] rounded-lg' name='title' value={values.title} onChange={changeHandler}></input>
                    </div>
                    <div className='flex flex-col mb-5'>
                        <label className='uppercase font-semibold'>Meta Description</label>
                        <input type='text' className='bg-gray-300 p-2 outline-none focus:bg-[#b4bbc5] rounded-lg' name='meta_description' value={values.meta_description} onChange={changeHandler}></input>
                    </div>
                    <div className='flex flex-col mb-5'>
                        <label className='uppercase font-semibold'>Slug</label>
                        <input type='text' className='bg-gray-300 p-2 outline-none focus:bg-[#b4bbc5] rounded-lg' name='slug' value={values.slug} onChange={slugChangeHandler}></input>
                    </div>
                    {/* <div className='flex flex-col mb-5'>
                        <label className='uppercase font-semibold'>Content</label>
                        <ReactQuill theme="snow" value={values.content} onChange={contentChangeHandler}/>
                    </div> */}
                    <div className='flex flex-col mb-5'>
                        <label className='uppercase font-semibold'>News Content</label>
                        <Tiptap content={values.content} onChange={contentChangeHandler}/>
                    </div>
                    <div>
                        <button type='submit' className='bg-primary px-8 py-3 text-white rounded-lg hover:bg-primaryDark cursor-pointer' onClick={submitHandler}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewsAdd