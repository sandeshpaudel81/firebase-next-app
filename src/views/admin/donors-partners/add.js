import CenteredLoading from '@/components/common/Loader';
import Tiptap from '@/components/common/TipTap';
import UploadFiles from '@/components/common/UploadFiles';
import DeleteDonorsPartnersModal from '@/components/common/deleteModal/deleteDonorsPartners';
import { addDonorsPartners, addDonorsPartnersReset, editDonorsPartners, editDonorsPartnersReset, fetchDonorsPartners } from '@/redux/slices/donorsPartnersSlice';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { FaArchive } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

const AdminDonorsPartnersAdd = ({id}) => {
    const dispatch = useDispatch();
    const {loading:dpLoading, data:donorsPartners, success:dpSuccess} = useSelector(state => state.donorsPartners.getDonorsPartners);
    const {loading:addDonorsPartnersLoading, success:addDonorsPartnersSuccess, error:addDonorsPartnersError} = useSelector(state => state.donorsPartners.addDonorsPartners)
    const {loading:editDonorsPartnersLoading, success:editDonorsPartnersSuccess, error:editDonorsPartnersError} = useSelector(state => state.donorsPartners.editDonorsPartners)

    const router = useRouter()
    const initialValue = {
        name: "",
        website: "",
        description: "",
        logoUrl: "",
        contribution: ""
    }
    const [values, setvalues] = useState(initialValue)
    const [showUploadModel, setShowUploadModel] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const changeHandler = (e) => {
        setvalues({ ...values, [e.target.name]: e.target.value })
    }

    const contributionChangeHandler = (e) => {
        setvalues({ ...values, contribution: e })
    }
    const removeMetaImage = () => {
        setvalues({ ...values, logoUrl: '' })
    }
    const addDonorsPartnersHandle = () => {
        if(id=='add'){
            dispatch(addDonorsPartners(values))
        } else {
            dispatch(editDonorsPartners(id, values))
        }
    }

    useEffect(() => {
        if(addDonorsPartnersSuccess){
            toast.success("Donor/partner added successfully.")
            dispatch(addDonorsPartnersReset())
            dispatch(fetchDonorsPartners())
            router.push('/admin/donors-partners/')
        }
        if(!addDonorsPartnersSuccess && addDonorsPartnersError.length > 0){
            toast.error(addDonorsPartnersError)
        }
    }, [addDonorsPartnersSuccess, addDonorsPartnersError])

    useEffect(() => {
        if(editDonorsPartnersSuccess){
            toast.success("Donor/partner edited successfully.")
            dispatch(editDonorsPartnersReset())
            dispatch(fetchDonorsPartners())
            router.push('/admin/donors-partners/')
        }
        if(!editDonorsPartnersSuccess && editDonorsPartnersError.length > 0){
            toast.error(editDonorsPartnersError)
        }
    }, [editDonorsPartnersSuccess, editDonorsPartnersError])

    useEffect(() => {
        if(id=='add'){
            setvalues(initialValue)
        } else {
            if(!dpSuccess){
                dispatch(fetchDonorsPartners())
            } else {
                const p = donorsPartners.find((n) => n.id === id)
                if(p != null){
                    const storedData = {
                        name: p.name,
                        website: p.website,
                        contribution: p.contribution,
                        description: p.description,
                        logoUrl: p.logoUrl
                    }
                    setvalues(storedData)
                } else {
                    toast.error("Donor/partner not found!")
                    router.push('/admin/donors-partners/')
                }
            }
        }
    }, [dispatch, dpSuccess])

    return (
        <div className='container mx-auto py-5'>
            <div className='border-l-8 border-primary px-5'>
                <h2 className='text-primary font-bold text-3xl'>Add <span className='text-primaryDark'>Donors/Partners</span></h2>
                <p className='uppercase text-gray-600 text-sm font-medium mt-2'>On the website</p>
            </div>
            <div className='mt-5 md:mt-10'>
                {
                    dpLoading ?
                    <CenteredLoading />:
                    <div className='w-2/3'>
                        <div className='flex flex-col mb-5'>
                            <label className='uppercase font-semibold'>Name</label>
                            <input type='text' className='bg-gray-300 p-2 focus:border-primary focus:bg-gray-400 rounded-lg' name='name' value={values.name} onChange={changeHandler}></input>
                        </div>
                        <div className='flex flex-col mb-5'>
                            <label className='uppercase font-semibold'>Description</label>
                            <textarea type='text' className='bg-gray-300 p-2 focus:border-primary focus:bg-gray-400 rounded-lg' name='description' value={values.description} onChange={changeHandler}></textarea>
                        </div>
                        <div className='flex flex-col mb-5'>
                            <label className='uppercase font-semibold'>Website</label>
                            <input type='text' className='bg-gray-300 p-2 focus:border-primary focus:bg-gray-400 rounded-lg' name='website' value={values.website} onChange={changeHandler}></input>
                        </div>
                        <div className='flex flex-col mb-5'>
                            <label className='uppercase font-semibold'>Contribution</label>
                            <Tiptap content={values.contribution} onChange={contributionChangeHandler}/>
                        </div>
                        <div className='flex flex-col'>
                            <div className='flex items-center gap-4'>
                                <label className='uppercase font-semibold'>Logo/Image</label>
                                <button className='bg-primaryExtraLight text-sm px-2 py-1 text-black rounded-md hover:bg-primaryLight cursor-pointer disabled:cursor-not-allowed' onClick={() => setShowUploadModel(true)}>
                                    Choose
                                </button>
                            </div>
                            <div className='flex gap-3 mb-2'>
                                {values.logoUrl ? (
                                    <div className='relative mt-2'>
                                        <img 
                                            src={values.logoUrl}  
                                            className='w-[150px] h-[200px] object-contain object-center cursor-pointer border-gray-300'
                                        />
                                        <span className='absolute -top-2 -right-2 text-lg p-2 bg-white rounded-full cursor-pointer' onClick={() => removeMetaImage()}><FaArchive className='text-red-600'/></span>
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                        <div>
                            <button type='submit' className='bg-primary px-8 py-3 text-white rounded-lg hover:bg-primaryDark cursor-pointer' onClick={addDonorsPartnersHandle}>
                                {  
                                    id == 'add' ? 
                                    (addDonorsPartnersLoading ? 'Adding' : 'Add'): 
                                    (editDonorsPartnersLoading ? 'Updating' : 'Update')
                                }
                            </button>
                            {
                            id !== 'add' &&
                            <button type='submit' className='bg-red-600 ml-3 px-8 py-3 text-white rounded-lg hover:bg-primaryDark cursor-pointer' onClick={() => setShowDeleteModal(true)}>
                                Delete
                            </button>
                            }
                        </div>
                        { showUploadModel && 
                            <UploadFiles setShowUploadModal={setShowUploadModel} values={values} setvalues={setvalues} type='string' varName='logoUrl' />
                        }
                        { showDeleteModal &&
                            <DeleteDonorsPartnersModal setShowModal={setShowDeleteModal} id={id} />
                        }
                    </div>
                }
            </div>
        </div>    
    )
}

export default AdminDonorsPartnersAdd