import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRootDirectory, getSubDirectory, uploadFile, uploadFileError } from '@/redux/slices/storageSlice'
import { FaArrowLeft, FaFolder } from 'react-icons/fa'
import toast from 'react-hot-toast'

const UploadFiles = ({setShowUploadModal, values, setvalues, type}) => {
    const [tab, setTab] = useState('files')
    const [currDirectory, setCurrDirectory] = useState('/home')
    const [wholeDirectory, setWholeDirectory] = useState({})
    const dispatch = useDispatch()
    const {directory, success, loading, error} = useSelector(state => state.storage.getDirectory)
    const {file, success:uploadSuccess, error:uploadError} = useSelector(state => state.storage.getDirectory)
    const [selectedFile, setSelectedFile] = useState('')
    const [files, setFiles] = useState(null)
    const [uploadToFolder, setUploadToFolder] = useState('others')
    const [uploadProgress, setUploadProgress] = useState('')

    const closeModal = () => {
        setShowUploadModal(false)
    }

    const changeDirectory = (nameOfDirectory) => {
        if(wholeDirectory[nameOfDirectory].length == 0){
            dispatch(getSubDirectory(nameOfDirectory))
        }
        setSelectedFile('')
        setCurrDirectory('/home/'+nameOfDirectory)
    }

    const backToHome = () => {
        setCurrDirectory('/home')
    }

    const selectFileHandler = () => {
        setvalues({ ...values, images: [...values.images, selectedFile] });
        setShowUploadModal(false)
    }

    const uploadFilesHandler = async () => {
        setUploadProgress(`0/${files.length} completed`)
        if (files!==null){
            for (let i=0; i<files.length; i++){
                dispatch(uploadFile(uploadToFolder, files[i]))
                setUploadProgress(`${i+1}/${files.length} completed`)
            }
            return;
        }
        return;
    }

    useEffect(() => {
        if(!uploadSuccess && uploadError.length>0){
            toast.error(uploadError)
        }
    }, [uploadSuccess])

    useEffect(() => {
        dispatch(getRootDirectory())
    }, [])

    useEffect(() => {
        setWholeDirectory(directory)
    }, [directory])

    useEffect((error) => {
        if(error?.length > 0){
            toast.error(error)
        }
    }, [error])

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
                    <button type="button" className="absolute top-2.5 end-2.5 text-gray-900 bg-transparent hover:bg-gray-900 hover:text-gray-200 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={closeModal}>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                {
                    tab == 'files' ?
                    (<>
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
                                                return (
                                                    <div
                                                        key={index}
                                                        className={selectedFile == item ? 'flex flex-col items-center p-2 bg-primaryLight cursor-pointer':'flex flex-col items-center p-2 hover:bg-primaryExtraLight cursor-pointer'}
                                                        onClick={() => setSelectedFile(selectedFile === item ? '' : item)}
                                                    >
                                                        <img src={item} className='w-28 h-28 object-cover border-2 border-primaryExtraLight'/>
                                                    </div>
                                                );
                                            })}
                                            <button className="absolute bottom-5 right-5 text-white bg-primary hover:bg-primaryD focus:ring-4 focus:outline-none focus:ring-primaryLight dark:focus:ring-primaryDark font-medium rounded-lg text-md inline-flex items-center px-8 py-2.5 text-center" onClick={selectFileHandler}>
                                                Select
                                            </button>
                                        </>
                                    )}
                                </div>
                                )
                            }
                        </div>
                    </>):
                    (<div className='p-5 h-[calc(100vh-200px)]'>
                        <div className='flex flex-col w-[400px] mx-auto'>
                            <div className='flex flex-col mb-5'>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Select a folder</label>
                                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-11/12 p-2.5" value={uploadToFolder} onChange={(e) => setUploadToFolder(e.target.value)}>
                                    <option value='others' selected>Default - others</option>
                                    {
                                        Object.entries(wholeDirectory).map(([key, value], idx) => {
                                            return (
                                                <option key={idx} value={key}>{key}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <input type='file' multiple onChange={(e) => setFiles(e.target.files)}></input>
                            <button className='uppercase bg-primaryD w-1/4 text-white my-3 rounded-md hover:bg-primaryDark cursor-pointer disabled:cursor-not-allowed px-5 py-2' onClick={uploadFilesHandler}>
                                Upload
                            </button>
                            <p className='text-sm text-gray-500'>Upload Progress: {uploadProgress}</p>
                            {
                                file?.map((item, index) => {
                                    return (<div key={index} className='w-11/12 bg-gray-300 border-gray-400 text-ellipsis'>
                                        {item}
                                    </div>)
                                })
                            }
                        </div>
                    </div>)
                }
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