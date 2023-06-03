import Layout from "@/views/Layout"
import BoardCommitteeView from "@/views/team/BoardCommitteeView"
import React from "react"

const BoardCommittee = () => {
	return (
		<div>
			<BoardCommitteeView />
		</div>
	)
}

export default BoardCommittee

BoardCommittee.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>
}
