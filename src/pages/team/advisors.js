import Layout from "@/views/Layout"
import AdvisorsView from "@/views/team/AdvisorsView"
import React from "react"

const Advisors = () => {
	return (
		<div>
			<AdvisorsView />
		</div>
	)
}

export default Advisors

Advisors.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>
}
