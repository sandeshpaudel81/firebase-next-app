import { Dialog, Transition } from '@headlessui/react'
import { deleteDoc, doc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { Fragment, useState } from 'react'
import { toast } from 'react-hot-toast'
import { db } from '../../../../firebase-config'
import { fetchCarousel } from '@/redux/slices/carouselSlice'
import { useDispatch } from 'react-redux'


export default function DeleteSlide({ showModal, setShowModal, id }) {
    const dispatch = useDispatch()

    const [process, setprocess] = useState("Yes")
    const router = useRouter()


    function closeModal() {
        setShowModal(false)
    }

    function handleClick(value) {
        setShowModal(true)
    }

    const handleDelete = async () => {
        try{
            setprocess("Deleting ...")
            await deleteDoc(doc(db, "carousel", id))
            toast.success("Slide deleted successfully.")
            dispatch(fetchCarousel())
            router.push('/admin/slides/')
        } catch(error) {
            setprocess("Yes")
            if (error) {
                toast.error("Error while deleting.")
            }
        }
    }

    return (
        <>
            <Transition appear show={showModal} as={Fragment}>
                <Dialog as="div" className="relative z-[100]" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="bg-white relative flex justify-center items-center shadow-xl rounded-2xl w-[600px] h-[220px]">
                                    <div className=' w-full'>
                                        <p className='text-2xl mb-1 font-medium'>ARE YOU SURE YOU WANT TO DELETE THIS SLIDE?</p>
                                        <p className='text-lg text-red-700 mb-8 font-medium'>This action cannot be undone.</p>


                                        <button disabled={process === "Yes" ? false : true} className='bg-red-500 rounded-lg hover: py-[2px] tracking-wider font-medium capitalize text-white text-[16px] px-2 text-clrprimary10 transition-all ease-linear duration-300 w-32 disabled:cursor-not-allowed block mx-auto' onClick={handleDelete} >
                                            {process}
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
