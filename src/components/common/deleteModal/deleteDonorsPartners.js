import { deleteDonorsPartners, deleteDonorsPartnersReset, fetchDonorsPartners } from '@/redux/slices/donorsPartnersSlice'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

const DeleteDonorsPartnersModal = ({setShowModal, id}) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const {success, error} = useSelector(state => state.donorsPartners.deleteDonorsPartners)
    const [process, setprocess] = useState("Yes, I'm sure")

    const closeModal = () => {
        setShowModal(false)
    }

    const handleDelete = async () => {
        setprocess("Deleting...")
        dispatch(deleteDonorsPartners(id))
    }

    useEffect(() => {
        if(success){
            toast.success("Donors/partners deleted.")
            setprocess("Yes, I'm sure")
            setShowModal(false)
            dispatch(fetchDonorsPartners())
            dispatch(deleteDonorsPartnersReset())
            router.push('/admin/donors-partners')
        }
    }, [success])

    useEffect(() => {
        if(error){
            toast.error(error)
            setShowModal(false)
        }
    }, [error])
    

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
                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-400 dark:text-gray-400">Are you sure you want to delete this donor/partner?</h3>
                <button className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center" onClick={handleDelete}>
                    {process}
                </button>
                <button className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={closeModal}>No, cancel</button>
            </div>
        </div>
    )
}

export default DeleteDonorsPartnersModal