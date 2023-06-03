import Layout from "@/views/Layout"
import OfficeStaffsView from "@/views/team/OfficeStaffsView"
import React from "react"

const OfficeStaffs = () => {
	return (
		<div>
			<OfficeStaffsView />
		</div>
	)
}

export default OfficeStaffs

OfficeStaffs.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>
}
