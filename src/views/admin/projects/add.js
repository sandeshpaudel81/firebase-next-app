import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { FaChevronLeft } from 'react-icons/fa';
import { IoIosAddCircle } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import Tiptap from '@/components/common/TipTap';
import AddCollaboratorModal from '@/components/common/AddModals/addCollaboratorModal';

const ProjectAdd = () => {
    const dispatch = useDispatch()
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
    const [addCollaboratorModal, setAddCollaboratorModal] = useState(false)

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
    
    const addProjectHandler = () => {

    }

    return (
        <div className='container mx-auto py-5'>
            <div className='border-l-8 border-primary px-5'>
                <h2 className='text-primary font-bold text-3xl'>Add <span className='text-primaryDark'>Projects</span></h2>
                <p className='uppercase text-gray-600 text-sm font-medium mt-2'>On the portfolio</p>
            </div>
            <div className='mt-5 md:mt-10'>
                <div className='w-2/3'>
                    <div className='flex flex-col mb-5'>
                        <label className='uppercase font-semibold'>Project Title</label>
                        <input type='text' className='bg-gray-300 p-2 focus:border-primary focus:bg-gray-400 rounded-lg' name='title' value={values.title} onChange={changeHandler}></input>
                    </div>
                    <div className='flex flex-col mb-5'>
                        <label className='uppercase font-semibold'>Objectives</label>
                        <Tiptap content={values.objectives} onChange={objectivesChangeHandler}/>
                    </div>
                    <div className='flex flex-col mb-5'>
                        <label className='uppercase font-semibold'>Methodologies</label>
                        <Tiptap content={values.methodologies} onChange={methodologiesChangeHandler}/>
                    </div>
                    <div className='flex flex-col mb-5'>
                        <label className='uppercase font-semibold'>Outcomes</label>
                        <Tiptap content={values.outcomes} onChange={outcomesChangeHandler}/>
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
                        <div className='flex items-center'>
                            <label className='uppercase font-semibold mr-5'>Collaborators</label>
                            <button type='submit' className='text-3xl text-primary rounded-lg cursor-pointer hover:text-primaryD' onClick={() => setAddCollaboratorModal(true)}><IoIosAddCircle /></button>
                        </div>
                        <div className='flex flex-wrap gap-4'>
                            {
                                values.collaborators.map((collab, index) => (
                                    <div key={index} className='flex flex-col items-center'>
                                        <img src={collab.imageUrl} className='w-28 h-28 object-cover border-2'/>
                                        <h4>{collab.name}</h4>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
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
            { addCollaboratorModal &&
                <AddCollaboratorModal todo='add' data={values} setData={setvalues} setAddCollaboratorModal={setAddCollaboratorModal}/>
            }
        </div>
    )
}

export default ProjectAdd