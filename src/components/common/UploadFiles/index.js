import React, { useEffect, useState } from 'react'
import { storage } from '../../../../firebase-config'
import { useDispatch, useSelector } from 'react-redux'
import { getRootDirectory, getSubDirectory } from '@/redux/slices/storageSlice'
import { FaArrowLeft, FaFolder } from 'react-icons/fa'

const UploadFiles = () => {
    const [tab, setTab] = useState('files')
    const [currDirectory, setCurrDirectory] = useState('/home')
    const [wholeDirectory, setWholeDirectory] = useState({})
    const dispatch = useDispatch()
    const {directory, success, loading, error} = useSelector(state => state.storage.getDirectory)

    const changeDirectory = (nameOfDirectory) => {
        if(wholeDirectory[nameOfDirectory].length == 0){
            dispatch(getSubDirectory(nameOfDirectory))
        }
        setCurrDirectory('/home/'+nameOfDirectory)
    }

    const backToHome = () => {
        setCurrDirectory('/home')
    }

    useEffect(() => {
        dispatch(getRootDirectory())
    }, [])

    useEffect(() => {
        console.log(directory)
        console.log(currDirectory)
        setWholeDirectory(directory)
    }, [directory])

    return (
        <div className='fixed top-0 left-0 h-screen w-screen z-50 p-5'>
            <div className='relative bg-white h-full w-full rounded-lg border-2 border-black'>
                <div className='flex justify-between bg-gray-300 border-b-2 border-gray-400'>
                    <div className='flex'>
                        <button 
                            type="button"
                            className={(tab=='files') ? 'px-8 py-3 cursor-pointer hover:bg-gray-400 bg-gray-400':'px-8 py-3 cursor-pointer hover:bg-gray-400'}
                            onClick={() => setTab('files')}
                        >My Files</button>
                        <button 
                            type="button" 
                            className={(tab=='upload') ? 'px-8 py-3 cursor-pointer hover:bg-gray-400 bg-gray-400':'px-8 py-3 cursor-pointer hover:bg-gray-400'} 
                            onClick={() => setTab('upload')}
                        >Upload Files</button>
                    </div>
                    <button type="button" className="absolute top-2.5 end-2.5 text-gray-900 bg-transparent hover:bg-gray-900 hover:text-gray-200 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <div className='px-5 py-3 font-semibold uppercase tracking-wider text-gray-700'>
                    {
                        currDirectory == '/home' ?
                        (<div>
                            {currDirectory}
                        </div>) : 
                        (<div className='flex gap-2 items-center'>
                            <FaArrowLeft onClick={backToHome} className='hover:text-gray-500 cursor-pointer'/> {currDirectory}
                        </div>)
                    }
                </div>
                <div className='p-5 overflow-y-scroll max-h-[calc(100vh-200px)]'>
                    {
                        loading ?
                        (<p>Loading...</p>):
                        (
                        <div className='flex flex-wrap gap-5 mb-24'>
                            {currDirectory === '/home' ? (
                                Object.entries(wholeDirectory).map(([key, value], idx) => {
                                    return (
                                        <div key={idx} className='flex flex-col items-center p-5 hover:bg-gray-200 cursor-pointer' onDoubleClick={() => changeDirectory(key)}>
                                            <FaFolder className='text-yellow-700 text-5xl'/>
                                            <p>{key}</p>
                                        </div>
                                    );
                                })
                            ) : (
                                <>
                                    {wholeDirectory[currDirectory.split('home/')[1]]?.map((item, index) => {
                                        console.log(currDirectory)
                                        return (
                                            <div key={index} className='flex flex-col items-center p-2 hover:bg-primaryExtraLight cursor-pointer'>
                                                <img src={item} className='w-28 h-28 object-cover border-2 border-primaryExtraLight'/>
                                            </div>
                                        );
                                    })}
                                    <button className="absolute bottom-5 right-5 text-white bg-primary hover:bg-primaryD focus:ring-4 focus:outline-none focus:ring-primaryLight dark:focus:ring-primaryDark font-medium rounded-lg text-md inline-flex items-center px-8 py-2.5 text-center">
                                        Select
                                    </button>
                                </>
                            )}
                        </div>
                        )
                    }
                </div>
                
                {/* <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <h3 class="mb-5 text-lg font-normal text-gray-400 dark:text-gray-400">Are you sure you want to delete this news?</h3>
                <button className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center" onClick={handleDelete}>
                    OK
                </button>
                <button className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={closeModal}>No, cancel</button> */}
            </div>
        </div>
    )
}

export default UploadFiles