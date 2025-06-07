import PersonCard from "@/components/common/PersonCard/personCard"
import { fetchTeamMembers } from "@/redux/slices/teamMemberSlice"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"


const BoardCommitteeView = () => {
	const dispatch = useDispatch()
	const router = useRouter()
	const {data, success} = useSelector(state => state.teamMembers.getTeamMembers)
	const initialValue = {
        id: "",
        name: "",
        members: []
    }
	const [teamData, setTeamData] = useState(initialValue)
	useEffect(() => {
        if(!success){
            dispatch(fetchTeamMembers())
        } else {
            const d = data.find((n) => n.name === 'board-committee')
            if(d != null){
                setTeamData(d)
            } else {
                toast.error("Team not found!")
                router.push('/')
            }
        }
    }, [dispatch, success])
	
	return (
		<div className="container mx-auto px-5 md:px-10 lg:px-20 xl:px-48 py-10 md:py-20">
			<div className="border-l-8 border-primary px-5">
				<h2 className="text-primary font-bold text-3xl">
					Board <span className="text-primaryDark">Committee</span>
				</h2>
				<p className="uppercase text-gray-600 text-sm font-medium mt-2">
					Esteemed advisors guiding us
				</p>
			</div>

			<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-10 gap-8">
				{teamData?.members.map((mem) => (
					<PersonCard
						key={mem.id}
						name={mem.name}
						post={mem.designation}
						contact={mem.contact}
						photo={mem.image}
					/>
				))}
			</div>
		</div>
	)
}

export default BoardCommitteeView
