import Layout from "@/views/Layout"
import MembersView from "@/views/team/MembersView"
import React from "react"

const Members = () => {
	return (
		<div>
			<MembersView />
		</div>
	)
}

export default Members

Members.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>
}
