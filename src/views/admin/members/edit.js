import { fetchAdvisors, fetchBoardCommittee, fetchOfficeStaffs } from '@/redux/slices/teamSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const TeamEdit = ({id}) => {
    const {data:boardCommittee, success:boardCommitteeSuccess} = useSelector(state => state.team.getBoardCommittee)
    const {data:officeStaffs, success:officeStaffsSuccess} = useSelector(state => state.team.getOfficeStaffs)
    const {data:advisors, success:advisorsSuccess} = useSelector(state => state.team.getAdvisors)

    const initialValue = {
        title: "",
        meta_description: "",
        slug: "",
        content: "",
        metaImage: ""
    }
    
    const dispatch = useDispatch()
    
    useEffect(() => {
        if(id=='board-committee'){
            if(!boardCommitteeSuccess){
                dispatch(fetchBoardCommittee())
            }
        } else if(id=='office-staffs'){
            if(!officeStaffsSuccess){
                dispatch(fetchOfficeStaffs())
            }
        } else if(id=='advisors') {
            if(!advisorsSuccess){
                dispatch(fetchAdvisors())
            }
        }
    }, [dispatch, boardCommitteeSuccess, officeStaffsSuccess, advisorsSuccess])
    
    return (
        <div>TeamEdit</div>
    )
}

export default TeamEdit