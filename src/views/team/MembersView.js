import PersonCard from "@/components/common/PersonCard"
import { fetchMembers } from "@/redux/slices/teamSlice"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const membersList = [
	{
		id: 1,
		name: "Sandesh GC",
		address: "Butwal",
		post: "Advisor",
		contact: "9811112222",
		photoURL: "https://placehold.co/132x170",
	},
	{
		id: 2,
		name: "Sandesh GC",
		address: "Butwal",
		post: "Advisor",
		contact: "9811112222",
		photoURL: "https://placehold.co/132x170",
	},
	{
		id: 3,
		name: "Sandesh GC",
		address: "Butwal",
		post: "Advisor",
		contact: "9811112222",
		photoURL: "https://placehold.co/132x170",
	},
	{
		id: 4,
		name: "Sandesh GC",
		address: "Butwal",
		post: "Advisor",
		contact: "9811112222",
		photoURL: "https://placehold.co/132x170",
	},
	{
		id: 5,
		name: "Sandesh GC",
		address: "Butwal",
		post: "Treasurer",
		contact: "9811112222",
		photoURL: "https://placehold.co/132x170",
	},
	{
		id: 6,
		name: "Sandesh GC",
		address: "Butwal",
		post: "Member",
		contact: "9811112222",
		photoURL: "https://placehold.co/132x170",
	},
	{
		id: 7,
		name: "Sandesh GC",
		address: "Butwal",
		post: "Advisor",
		contact: "9811112222",
		photoURL: "https://placehold.co/132x170",
	},
	{
		id: 8,
		name: "Sandesh GC",
		address: "Butwal",
		post: "Treasurer",
		contact: "9811112222",
		photoURL: "https://placehold.co/132x170",
	},
	{
		id: 9,
		name: "Sandesh GC",
		address: "Butwal",
		post: "Member",
		contact: "9811112222",
		photoURL: "https://placehold.co/132x170",
	},
	{
		id: 10,
		name: "Sandesh GC",
		address: "Butwal",
		post: "Advisor",
		contact: "9811112222",
		photoURL: "https://placehold.co/132x170",
	},
]

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
				<div class="relative overflow-x-auto">
					<p className="font-semibold text-xl">General Members</p>
					<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
						<thead class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
							<tr>
								<th scope="col" class="px-6 py-3">
									Name
								</th>
								<th scope="col" class="px-6 py-3">
									Address
								</th>
							</tr>
						</thead>
						<tbody>
							{
								generalMembers?.map((mem, index) => {
									return <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
										<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
											{mem.name}
										</th>
										<td class="px-6 py-4">
											{mem.address}
										</td>
									</tr>
								})
							}
						</tbody>
					</table>
				</div>
				<div class="relative overflow-x-auto">
				<p className="font-semibold text-xl">Life Members</p>
					<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
						<thead class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
							<tr>
								<th scope="col" class="px-6 py-3">
									Name
								</th>
								<th scope="col" class="px-6 py-3">
									Address
								</th>
							</tr>
						</thead>
						<tbody>
							{
								lifeMembers?.map((mem, index) => {
									return <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
										<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
											{mem.name}
										</th>
										<td class="px-6 py-4">
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
