import Layout from "@/views/Layout"
import OfficeStaffsView from "@/views/team/OfficeStaffsView"
import Head from "next/head"
import React from "react"

const OfficeStaffs = () => {
	return (
		<div>
			<Head>
				<title>Staffs</title>
			</Head>
			<OfficeStaffsView />
		</div>
	)
}

export default OfficeStaffs

OfficeStaffs.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>
}
