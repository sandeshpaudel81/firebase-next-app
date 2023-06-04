import Image from "next/image"
import React from "react"

const PersonCard = ({ name, post, contact, address, photo }) => {
	return (
		<div className="flex flex-col gap-4 p-4 w-full shadow">
			<div className="flex mx-auto">
				<Image
					src={photo}
					width={132}
					height={170}
					alt="Board Committee Member"
					unoptimized
				/>
			</div>

			<div className=" text-center">
				<h3 className="text-primary font-semibold text-xl">{name}</h3>
				<p>{post}</p>
				<p>{contact}</p>
				<p>{address}</p>
			</div>
		</div>
	)
}

export default PersonCard
