import Image from "next/image"
import Link from "next/link"
import React from "react"
import { FaHome, FaPhoneAlt } from "react-icons/fa"

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
				<p className="text-sm font-medium text-slate-700">{post}</p>
				<Link href={`telto:+977${contact}`}>
					<p className="text-sm flex items-center justify-center gap-2"><FaPhoneAlt /> {contact}</p>
				</Link>
				<p className="text-sm flex items-center justify-center gap-2"><FaHome/> {address}</p>
			</div>
		</div>
	)
}

export default PersonCard
