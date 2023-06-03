import Layout from "@/views/Layout"
import BoardCommitteeView from "@/views/team/BoardCommitteeView"
import Head from "next/head"
import React from "react"

const BoardCommittee = () => {
	return (
		<div>
			<Head>
				<title>Board Committee</title>
			</Head>
			<BoardCommitteeView />
		</div>
	)
}

export default BoardCommittee

BoardCommittee.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>
}
