import { fetchTeamMembers } from '@/redux/slices/teamMemberSlice'
import { fetchAdvisors, fetchBoardCommittee, fetchOfficeStaffs } from '@/redux/slices/teamSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const TeamEdit = ({id}) => {
    const {data, success} = useSelector(state => state.teamMembers.getTeamMembers)

    const initialValue = {
        title: "",
        meta_description: "",
        slug: "",
        content: "",
        metaImage: ""
    }
    
    const dispatch = useDispatch()
    
    useEffect(() => {
        if(!success){
            dispatch(fetchTeamMembers())
        }
    }, [dispatch, success])
    
    return (
        <div>TeamEdit</div>
    )
}

export default TeamEdit