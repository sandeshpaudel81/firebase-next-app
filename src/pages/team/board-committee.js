import Layout from "@/views/Layout"
import Image from "next/image"
import React from "react"

const BoardCommittee = () => {
	return (
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
			<div>
				<div>
					<Image
						src="https://placehold.co/132x170"
						width={132}
						height={170}
						alt="Board Committee Member"
						unoptimized
					/>
				</div>
				<h3>Sandesh GC</h3>
				<p>9814429944</p>
				<p>Butwal, Kalikanagar</p>
				<p>Secretary</p>
			</div>
		</div>
	)
}

export default BoardCommittee
