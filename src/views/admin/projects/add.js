import UploadProgress from '@/components/common/UploadProgress';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { FaChevronLeft } from 'react-icons/fa'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { MdDeleteForever } from 'react-icons/md'
import { uploadImage, uploadImageReset, uploadImageSuccess } from '@/redux/slices/imageSlice';

const ProjectAdd = () => {
    const dispatch = useDispatch()
    const {image:uploadedImageUrl, loading:uploadLoading, progress:uploadProgress, success:uploadSuccess} = useSelector(state => state.image.uploadImage);
    const [image, setImage] = useState(null)
    const initialValue = {
        title: "",
        objectives: "",
        methodologies: "",
        outcomes: "",
        projectLocation: "",
        duration: "",
        targetedGroup: "",
        isCompleted: false,
        collaborators: [],
        thumbnailImageUrl: "",
        images: []
    }
    const [values, setvalues] = useState(initialValue)
    const [collaboratorName, setcollaboratorName] = useState("")
    const [progress, setProgress] = useState(0)

    const changeHandler = (e) => {
        if(e.target.name === "isCompleted") {
            setvalues({ ...values, [e.target.name]: e.target.checked })
        } else {
            setvalues({ ...values, [e.target.name]: e.target.value })
        }
    }

    const objectivesChangeHandler = (e) => {
        setvalues({ ...values, objectives: e })
    }
    const methodologiesChangeHandler = (e) => {
        setvalues({ ...values, methodologies: e })
    }
    const outcomesChangeHandler = (e) => {
        setvalues({ ...values, outcomes: e })
    }

    const addCollaboratorHandler = async () => {
        if (collaboratorName.length > 0) {
            let tempObj = {
                name: collaboratorName,
                imageUrl: ""  
            }
            if (image !== null) {
                try {
                    await dispatch(uploadImage("projects", image))
                    if (uploadSuccess) {
                        tempObj.imageUrl = uploadedImageUrl;
                    }
                    let tempCollab = values.collaborators;
                    tempCollab.push(tempObj);
                    setvalues({ ...values, collaborators: tempCollab });
                    console.log(values);
                    await dispatch(uploadImageReset());
                    setcollaboratorName("");
                    toast.success("Collaborator added successfully.");
                } catch(err) {
                    toast.error("Could not upload image.");
                }
            } else {
            let tempCollab = values.collaborators;
            tempCollab.push(tempObj);
            setvalues({ ...values, collaborators: tempCollab });
            console.log(values);
            setcollaboratorName("");
            toast.success("Collaborator added successfully.");
            }
        } else {
            return toast.error("Name of the collaborator is required.")
        }
    }

    const deleteCollaborator = () => {

    }
    
    const addProjectHandler = () => {

    }

    useEffect(() => {
        setProgress(uploadProgress)
    }, [uploadProgress])

    return (
        <div className='container mx-auto py-5'>
            <div className='border-l-8 border-primary px-5'>
                <h2 className='text-primary font-bold text-3xl'>Add <span className='text-primaryDark'>Projects</span></h2>
                <p className='uppercase text-gray-600 text-sm font-medium mt-2'>On the portfolio</p>
            </div>
            <div className='mt-5 md:mt-10'>
                <div className='w-1/2'>
                    <div className='flex flex-col mb-5'>
                        <label className='uppercase font-semibold'>Project Title</label>
                        <input type='text' className='bg-gray-300 p-2 focus:border-primary focus:bg-gray-400 rounded-lg' name='title' value={values.title} onChange={changeHandler}></input>
                    </div>
                    <div className='flex flex-col mb-5'>
                        <label className='uppercase font-semibold'>Objectives</label>
                        <ReactQuill theme="snow" value={values.objectives} onChange={objectivesChangeHandler}/>
                    </div>
                    <div className='flex flex-col mb-5'>
                        <label className='uppercase font-semibold'>Methodologies</label>
                        <ReactQuill theme="snow" value={values.methodologies} onChange={methodologiesChangeHandler}/>
                    </div>
                    <div className='flex flex-col mb-5'>
                        <label className='uppercase font-semibold'>Outcomes</label>
                        <ReactQuill theme="snow" value={values.outcomes} onChange={outcomesChangeHandler}/>
                    </div>
                    <div className='flex flex-col mb-5'>
                        <label className='uppercase font-semibold'>Project Area</label>
                        <input type='text' className='bg-gray-300 p-2 focus:border-primary focus:bg-gray-400 rounded-lg' name='projectLocation' value={values.projectLocation} onChange={changeHandler}></input>
                    </div>
                    <div className='flex flex-col mb-5'>
                        <label className='uppercase font-semibold'>Duration</label>
                        <input type='text' className='bg-gray-300 p-2 focus:border-primary focus:bg-gray-400 rounded-lg' name='duration' value={values.duration} onChange={changeHandler}></input>
                    </div>
                    <div className='flex flex-col mb-5'>
                        <label className='uppercase font-semibold'>Targeted Group</label>
                        <input type='text' className='bg-gray-300 p-2 focus:border-primary focus:bg-gray-400 rounded-lg' name='targetedGroup' value={values.targetedGroup} onChange={changeHandler}></input>
                    </div>
                    <div className='flex mb-5'>
                        <label className='uppercase font-semibold mr-5'>Project Status</label>
                        <input type='checkbox' className='h-5 w-5 mr-5' name='isCompleted' checked={values.isCompleted} onChange={changeHandler}></input>
                        <p>Completed</p>
                    </div>
                    <div className='flex flex-col mb-5'>
                        <label className='uppercase font-semibold mr-5'>Collaborators</label>
                        {
                            values.collaborators?.map((collab, index) => {
                                return <div key={index} className='flex justify-between items-center bg-slate-100 p-2 mb-2 rounded-md'>
                                    <img src={collab.imageUrl} className='h-[50px] w-[50px] object-cover'/>
                                    <p>{collab.name}</p>
                                    <MdDeleteForever className='text-3xl cursor-pointer text-red-600 hover:text-red-500 ' onClick={deleteCollaborator}/>
                                </div>
                            })
                        }
                        <div className='flex flex-col bg-primaryExtraLight p-2 gap-2'>
                            <input type='text' className='bg-gray-300 p-2 focus:border-primary focus:bg-gray-200 rounded-lg placeholder-gray-500' placeholder='Name of the collaborator' value={collaboratorName} name='name' onChange={(e) => setcollaboratorName(e.target.value)}></input>
                            {(progress > 0) ? 
                                <UploadProgress progress={progress}/> : <div></div>
                            }
                            <label className='font-medium text-sm'>Logo/Image :</label>
                            <div className='flex'>
                                <input type='file' accept='image/*' onChange={(e) => setImage(e.target.files[0])}></input>
                                <button className='uppercase bg-primaryD w-1/5 text-white rounded-md hover:bg-primaryDark cursor-pointer disabled:cursor-not-allowed' onClick={addCollaboratorHandler}>
                                    {/* { uploadLoading ? "Uploading..." : "Upload" } */}Add
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* <div>
                        {uploadSuccess ? (
                            <img src={imageUrl} alt='slide' className='w-[200px] h-[150px] object-cover object-center'/>
                        ) : <></> }
                    </div> */}
                    <div className='flex flex-col mb-5'>
                        <input type='text' className='bg-slate-400 text-white p-2 focus:border-primary focus:bg-gray-400 rounded-lg' name='thumbnailImageUrl' value={values.thumbnailImageUrl} disabled></input>
                    </div>
                    <div>
                        <button type='submit' className='bg-primary px-8 py-3 text-white rounded-lg hover:bg-primaryDark cursor-pointer' onClick={addProjectHandler}>Submit</button>
                    </div>
                </div>
            </div>
            <div className='flex justify-start mt-5'>
                <Link href="/admin/projects" className='uppercase text-primary hover:text-primaryDark'>
                    <p className='flex items-center font-medium'><FaChevronLeft className='mr-3'/>All Projects</p>
                </Link>
            </div>
        </div>
    )
}

export default ProjectAdd