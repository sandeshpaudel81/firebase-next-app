import Layout from "@/views/Layout"
import AdvisorsView from "@/views/team/AdvisorsView"
import Head from "next/head"
import React from "react"

const Advisors = () => {
	return (
		<div>
			<Head>
				<title>Advisors</title>
			</Head>
			<AdvisorsView />
		</div>
	)
}

export default Advisors

Advisors.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>
}
