import PersonCard from "@/components/common/PersonCard/personCard"
import { fetchMembers } from "@/redux/slices/teamSlice"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"


const MembersView = () => {
	const dispatch = useDispatch()
	const {generalMembers, lifeMembers, loading, success, error} = useSelector(state => state.team.getMembers)
	useEffect(() => {
		if (!success){
			dispatch(fetchMembers())
		}
		return ;
	}, [success, dispatch])
	return (
		<div className="container mx-auto px-5 py-10 md:py-20">
			<div className="border-l-8 border-primary px-5">
				<h2 className="text-primary font-bold text-3xl">
					Our <span className="text-primaryDark">Members</span>
				</h2>
				<p className="uppercase text-gray-600 text-sm font-medium mt-2">
					Dedicated Individuals
				</p>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
				<div>
					<p className="font-semibold text-xl">General Members</p>
					<div className="relative overflow-x-auto">
						<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
							<thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
								<tr>
									<th scope="col" className="px-4 py-2">
										Name
									</th>
									<th scope="col" className="px-4 py-2">
										Post
									</th>
									<th scope="col" className="px-4 py-2">
										Address
									</th>
								</tr>
							</thead>
							<tbody>
								{
									generalMembers?.map((mem, index) => {
										return <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
											<th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
												{mem.name}
											</th>
											<td className="px-4 py-2">
												{mem.post}
											</td>
											<td className="px-4 py-2">
												{mem.address}
											</td>
										</tr>
									})
								}
							</tbody>
						</table>
					</div>
				</div>
				<div className="relative overflow-x-auto">
					<p className="font-semibold text-xl">Life Members</p>
					<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
						<thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
							<tr>
								<th scope="col" className="px-4 py-2">
									Name
								</th>
								<th scope="col" className="px-4 py-2">
									Address
								</th>
							</tr>
						</thead>
						<tbody>
							{
								lifeMembers?.map((mem, index) => {
									return <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
										<th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
											{mem.name}
										</th>
										<td className="px-4 py-2">
											{mem.address}
										</td>
									</tr>
								})
							}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}

export default MembersView
