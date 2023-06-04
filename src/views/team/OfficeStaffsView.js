import PersonCard from "@/components/common/PersonCard"
import React from "react"

const officeStaffsList = [
	{
		id: 1,
		name: "Sandesh GC",
		address: "Butwal",
		post: "Chairman",
		contact: "9811112222",
		photoURL: "https://placehold.co/132x170",
	},
	{
		id: 2,
		name: "Sandesh GC",
		address: "Butwal",
		post: "Secretary",
		contact: "9811112222",
		photoURL: "https://placehold.co/132x170",
	},
	{
		id: 3,
		name: "Sandesh GC",
		address: "Butwal",
		post: "Vice Secretary",
		contact: "9811112222",
		photoURL: "https://placehold.co/132x170",
	},
	{
		id: 4,
		name: "Sandesh GC",
		address: "Butwal",
		post: "Chief Technical Officer",
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
]

const OfficeStaffsView = () => {
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
				{officeStaffsList.map((staff) => (
					<PersonCard {...staff} key={staff.id} photo={staff.photoURL} />
				))}
			</div>
		</div>
	)
}

export default OfficeStaffsView
