import PersonCard from "@/components/common/PersonCard/personCard"
import { fetchAdvisors } from "@/redux/slices/teamSlice"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const AdvisorsView = () => {
	const dispatch = useDispatch()
	const {data, loading, success, error} = useSelector(state => state.team.getAdvisors)
	useEffect(() => {
		if (!success){
			dispatch(fetchAdvisors())
		}
		return ;
	}, [success, dispatch])
	
	return (
		<div className="container mx-auto px-5 py-10 md:py-20">
			<div className="border-l-8 border-primary px-5">
				<h2 className="text-primary font-bold text-3xl">
					Our <span className="text-primaryDark">Advisors</span>
				</h2>
				<p className="uppercase text-gray-600 text-sm font-medium mt-2">
					Wisdom from trusted advisors
				</p>
			</div>

			<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-10 gap-8">
				{data.map((adv) => (
					<PersonCard
						key={adv.id}
						name={adv.name}
						post={adv.post}
						contact={adv.contact}
						address={adv.address}
						photo={adv.picture}
					/>
				))}
			</div>
		</div>
	)
}

export default AdvisorsView
