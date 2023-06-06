import PersonCard from "@/components/common/PersonCard"
import { fetchOfficeStaffs } from "@/redux/slices/teamSlice"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"


const OfficeStaffsView = () => {
	const dispatch = useDispatch()
	const {data, loading, success, error} = useSelector(state => state.team.getOfficeStaffs)
	useEffect(() => {
		if(!success){
			dispatch(fetchOfficeStaffs())
		}
		return;
	}, [success, dispatch])
	return (
		<div className="container mx-auto px-5 py-10 md:py-20">
			<div className="border-l-8 border-primary px-5">
				<h2 className="text-primary font-bold text-3xl">
					Office <span className="text-primaryDark">Staffs</span>
				</h2>
				<p className="uppercase text-gray-600 text-sm font-medium mt-2">
					Efficient team managing daily tasks
				</p>
			</div>

			<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-10 gap-8">
				{data?.map((staff) => (
					<PersonCard 
						key={staff.id}
						name={staff.name}
						post={staff.post}
						contact={staff.contact}
						address={staff.address}
						photo={staff.picture} 
					/>
				))}
			</div>
		</div>
	)
}

export default OfficeStaffsView
