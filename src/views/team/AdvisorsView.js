import PersonCard from "@/components/common/PersonCard"
import React from "react"

const advisorsList = [
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
]

const AdvisorsView = () => {
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
				{advisorsList.map((adv) => (
					<PersonCard {...adv} key={adv.id} photo={adv.photoURL} />
				))}
			</div>
		</div>
	)
}

export default AdvisorsView
