import Image from "next/image"
import Link from "next/link"
import React from "react"
import { FaPhoneAlt } from "react-icons/fa"

const PersonCard = ({ name, post, contact, photo }) => {
	return (
		<div className="flex flex-col gap-4 p-4 w-full shadow">
			<div className="flex mx-auto">
				{
					photo.length > 0 ? 
					<Image
						src={photo}
						width={132}
						height={170}
						alt={name}
						unoptimized
					/> :
					<Image
						src='/assets/user_placeholder.png'
						width={132}
						height={170}
						alt="Member"
						unoptimized
					/>
				}
			</div>

			<div className=" text-center">
				<h3 className="text-primary font-semibold text-xl">{name}</h3>
				<p className="text-sm font-medium text-slate-700">{post}</p>
				<Link href={`telto:+977${contact}`}>
					<p className="text-sm flex items-center justify-center gap-2"><FaPhoneAlt /> {contact}</p>
				</Link>
			</div>
		</div>
	)
}

export default PersonCard
