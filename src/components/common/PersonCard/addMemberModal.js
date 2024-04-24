import React, { useEffect, useState } from 'react'
import { FaImage } from 'react-icons/fa'
import UploadFiles from '../UploadFiles'

const AddMemberModal = ({todo, index, teamData, setTeamData, setAddMemberModal}) => {
    const [uploadImageModal, setUploadImageModal] = useState(false)
    const initialValue = {
        images: '',
        name: '',
        designation: '',
        contact: ''
    }
    const [values, setvalues] = useState(initialValue)
    const closeModal = () => {
        setAddMemberModal({index:-1, active:false})
    }

    const textChangeHandler = (e) => {
        setvalues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSelect = async () => {
        const data = {
            name: values.name,
            designation: values.designation,
            contact: values.contact,
            image: values.images
        }
        if(todo=='add'){
            const updatedMembers = [...teamData.members];
            updatedMembers.splice(index, 0, data);
            setTeamData({...teamData, members: updatedMembers});
            setAddMemberModal({index:-1, active:false})
        } else {
            const updatedMembers = [...teamData.members]
            updatedMembers[index] = data
            setTeamData({...teamData, members: updatedMembers});
            setAddMemberModal({index:-1, active:false})
        }
    }

    useEffect(() => {
        if(todo=='edit'){
            setvalues({
                images: teamData.members[index].image,
                name: teamData.members[index].name,
                designation: teamData.members[index].designation,
                contact: teamData.members[index].contact
            })
        }
    }, [])
    
    

    return (
        <div className='fixed top-0 left-0 h-screen w-screen z-50 p-5'>
            <div className='absolute left-0 top-0 right-0 bottom-0 bg-black opacity-70 blur-2xl'></div>
            <div className='relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-700 w-[500px] p-5 text-center rounded-lg'>
                <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={closeModal}>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
                <h3 className="mb-5 text-lg font-normal text-gray-400 dark:text-gray-400">Select Image</h3>
                <button className='bg-primary text-white rounded-md px-5 py-2 mb-5' onClick={() => setUploadImageModal(true)}>Select from library</button>
                {
                    values.images.length > 0 ? 
                    (<div className='flex flex-col gap-2 mb-5 justify-center items-center'>
                        <img src={values.images} className='w-28 h-28 object-cover border-2 border-primaryExtraLight'/>
                        <input type='text' className='bg-white w-60 p-1 outline-none focus:bg-[#b4bbc5] rounded-lg' placeholder='Name' name='name' value={values.name} onChange={textChangeHandler}></input>
                        <input type='text' className='bg-white w-60 p-1 outline-none focus:bg-[#b4bbc5] rounded-lg' placeholder='designation' name='designation' value={values.designation} onChange={textChangeHandler}></input>
                        <input type='text' className='bg-white w-60 p-1 outline-none focus:bg-[#b4bbc5] rounded-lg' placeholder='contact' name='contact' value={values.contact} onChange={textChangeHandler}></input>
                    </div>):
                    (<div>
                        <FaImage className='mx-auto mb-4 text-5xl text-gray-400'/>
                    </div>)
                }
                
                <button className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center" onClick={handleSelect}>
                    Select
                </button>
                <button className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={closeModal}>No, cancel</button>
            </div>
            {
                uploadImageModal &&
                <UploadFiles
                    setShowUploadModal={setUploadImageModal}
                    values={values} 
                    setvalues={setvalues} 
                    type='string' 
                    varName='images'
                />
            }
        </div>
    )
}

export default AddMemberModal