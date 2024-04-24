import AddMemberModal from '@/components/common/PersonCard/addMemberModal'
import PersonCard from '@/components/common/PersonCard/personCard'
import DeleteMemberModal from '@/components/common/deleteModal/deleteMember'
import { editTeam, editTeamReset, fetchTeamMembers } from '@/redux/slices/teamMemberSlice'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaArchive, FaEdit } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'

const TeamEdit = ({id}) => {
    const {data, success} = useSelector(state => state.teamMembers.getTeamMembers)
    const {loading:editTeamLoading, success:editTeamSuccess, error:editTeamError} = useSelector(state => state.teamMembers.editTeam)

    const initialValue = {
        id: "",
        name: "",
        members: []
    }

    const [addMemberModal, setAddMemberModal] = useState({
        index: -1,
        active: false
    })
    const [editMemberModal, setEditMemberModal] = useState({
        index: -1,
        active: false
    })
    const [teamData, setTeamData] = useState(initialValue)
    const [showDeleteModal, setShowDeleteModal] = useState({
        index: -1,
        active: false
    })
    
    const router = useRouter()
    const dispatch = useDispatch()

    const addMemberHandle = (idx) => {
        setAddMemberModal({index:idx, active:true})
    }

    const submitHandler = async (e) => {
        dispatch(editTeam(teamData))
    }

    const addGeneralLifeMemberHandle = () => {
        if(id=='general-members'){
            setTeamData({...teamData, members: [...teamData.members, {
                name: '',
                designation: '',
                address: ''
            }]})
        } else {
            setTeamData({...teamData, members: [...teamData.members, {
                name: '',
                address: ''
            }]})
        }
    }

    const fieldChangeHandler = (e) => {
        const allMembers = [...teamData.members];
        const fieldName = e.target.name.split('-')[0]
        const index = e.target.name.split('-')[1]
        allMembers[index] = {...allMembers[index], [fieldName]: e.target.value}
        setTeamData({...teamData, members: allMembers});
    }

    useEffect(() => {
        if(editTeamSuccess){
            toast.success("Team updated successfully.")
            dispatch(editTeamReset())
            dispatch(fetchTeamMembers())
            router.push('/admin/members/')
        }
        if(!editTeamSuccess && editTeamError.length > 0){
            toast.error(editTeamError)
        }
    }, [editTeamSuccess, editTeamError])
    
    useEffect(() => {
        if(!success){
            dispatch(fetchTeamMembers())
        } else {
            const d = data.find((n) => n.name === id)
            if(d != null){
                setTeamData(d)
            } else {
                toast.error("Team not found!")
                router.push('/admin/members/')
            }
        }
    }, [dispatch, success])
    
    return (
        <div className='container mx-auto py-5'>
            <div className='border-l-8 border-primary px-5'>
                <h2 className='text-primary font-bold text-3xl'>Edit <span className='text-primaryDark'>Members</span></h2>
                <p className='uppercase text-gray-600 text-sm font-medium mt-2'>{id}</p>
            </div>
            {
                id == 'general-members' ? 
                (<div className="relative overflow-x-auto">
                    <button className='my-3 rounded-md p-2 bg-primaryExtraLight hover:bg-primaryLight' onClick={addGeneralLifeMemberHandle}>Add New</button>
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-4 py-2">
                                    Name
                                </th>
                                <th scope="col" className="px-4 py-2">
                                    Designation
                                </th>
                                <th scope="col" className="px-4 py-2">
                                    Address
                                </th>
                                <th scope="col" className="px-4 py-2">
                                    
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                teamData?.members.map((mem, index) => {
                                    return <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <input className='outline-none border-none bg-transparent' name={`name-${index}`} value={mem.name} onChange={fieldChangeHandler}></input>
                                        </th>
                                        <td className="px-4 py-2">
                                            <input className='outline-none border-none bg-transparent' name={`designation-${index}`} value={mem.designation} onChange={fieldChangeHandler}></input>
                                        </td>
                                        <td className="px-4 py-2">
                                            <input className='outline-none border-none bg-transparent' name={`address-${index}`} value={mem.address} onChange={fieldChangeHandler}></input>
                                        </td>
                                        <td className="px-4 py-2">
                                            <FaArchive className='text-red-500 hover:text-red-600 cursor-pointer' onClick={() => setShowDeleteModal({index: index, active: true})}/>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>):
                (id=='life-members' ? 
                (<div className="relative overflow-x-auto">
                    <button className='my-3 rounded-md p-2 bg-primaryExtraLight hover:bg-primaryLight' onClick={addGeneralLifeMemberHandle}>Add New</button>
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-4 py-2">
                                    Name
                                </th>
                                <th scope="col" className="px-4 py-2">
                                    Address
                                </th>
                                <th scope="col" className="px-4 py-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                teamData?.members.map((mem, index) => {
                                    return <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <input className='outline-none border-none bg-transparent' name={`name-${index}`} value={mem.name} onChange={fieldChangeHandler}></input>
                                        </th>
                                        <td className="px-4 py-2">
                                            <input className='outline-none border-none bg-transparent' name={`address-${index}`} value={mem.address} onChange={fieldChangeHandler}></input>
                                        </td>
                                        <td className="px-4 py-2">
                                            <FaArchive className='text-red-500 hover:text-red-600 cursor-pointer' onClick={() => setShowDeleteModal({index: index, active: true})}/>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>): 
                (<div className="flex flex-wrap mt-10">
                    {teamData.members.length>0 ? (
                        teamData.members.map((mem, index) => (
                            <div key={index} className='flex flex-row items-center'>
                                { index == 0 && 
                                    <div className='cursor-pointer p-5 bg-gray-200 hover:bg-gray-300' onClick={() => addMemberHandle(0)}>+</div>
                                }
                                <div className='relative'>
                                    <PersonCard
                                        key={index}
                                        name={mem.name}
                                        post={mem.designation}
                                        contact={mem.contact}
                                        photo={mem.image}
                                    />
                                    <span className='absolute -top-2 right-8 text-lg p-2 bg-gray-200 hover:bg-gray-300 rounded-full pointer-events-auto cursor-pointer' onClick={() => setEditMemberModal({index: index, active: true})}><FaEdit className='text-primary'/></span>
                                    <span className='absolute -top-2 -right-2 text-lg p-2 bg-gray-200 hover:bg-gray-300 rounded-full pointer-events-auto cursor-pointer' onClick={() => setShowDeleteModal({index: index, active: true})}><FaArchive className='text-red-600'/></span>
                                </div>
                                <div className='cursor-pointer p-5 bg-gray-200 hover:bg-gray-300' onClick={() => addMemberHandle(index+1)}>+</div>
                            </div>
                        ))
                    ):(
                        <div className='cursor-pointer p-5 bg-gray-200 hover:bg-gray-300' onClick={() => addMemberHandle(0)}>+</div>
                    )}
                </div>))
            }
            <button type='submit' className='bg-primary mt-10 px-8 py-3 text-white rounded-lg hover:bg-primaryDark cursor-pointer' onClick={submitHandler}>
                {  
                    editTeamLoading ? 'Updating...' : 'Save Changes'
                }
            </button>
            {addMemberModal.active &&
                <AddMemberModal todo='add' index={addMemberModal.index} teamData={teamData} setTeamData={setTeamData} setAddMemberModal={setAddMemberModal}/>
            }
            {editMemberModal.active &&
                <AddMemberModal todo='edit' index={editMemberModal.index} teamData={teamData} setTeamData={setTeamData} setAddMemberModal={setEditMemberModal}/>
            }
            {showDeleteModal.active &&
                <DeleteMemberModal index={showDeleteModal.index} setShowDeleteModal={setShowDeleteModal} setTeamData={setTeamData} teamData={teamData}/>
            }
        </div>
    )
}

export default TeamEdit