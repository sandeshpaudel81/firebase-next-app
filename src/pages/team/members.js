import Layout from "@/views/Layout"
import MembersView from "@/views/team/MembersView"
import Head from "next/head"
import React from "react"

const Members = () => {
	return (
		<div>
			<Head>
				<title>Members</title>
			</Head>
			<MembersView />
		</div>
	)
}

export default Members

Members.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>
}
