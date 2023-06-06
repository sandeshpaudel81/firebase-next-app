import PersonCard from "@/components/common/PersonCard"
import { fetchBoardCommittee } from "@/redux/slices/teamSlice"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"


const BoardCommitteeView = () => {
	const dispatch = useDispatch()
	const {data, loading, success, error} = useSelector(state => state.team.getBoardCommittee)
	useEffect(() => {
		if(!success){
			dispatch(fetchBoardCommittee())
		}
		return;
	}, [success, dispatch])
	
	return (
		<div className="container mx-auto px-5 py-10 md:py-20">
			<div className="border-l-8 border-primary px-5">
				<h2 className="text-primary font-bold text-3xl">
					Board <span className="text-primaryDark">Committee</span>
				</h2>
				<p className="uppercase text-gray-600 text-sm font-medium mt-2">
					Esteemed advisors guiding us
				</p>
			</div>

			<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-10 gap-8">
				{data?.map((mem) => (
					<PersonCard
						key={mem.id}
						name={mem.name}
						post={mem.post}
						contact={mem.contact}
						address={mem.address}
						photo={mem.picture}
					/>
				))}
			</div>
		</div>
	)
}

export default BoardCommitteeView
