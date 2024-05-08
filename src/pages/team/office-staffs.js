import Layout from "@/views/Layout"
import OfficeStaffsView from "@/views/team/OfficeStaffsView"
import React from "react"

const OfficeStaffs = () => {
	return (
		<div>
			<NextSeo
                title="Office Staffs | KADAM Myagdi"
                description="Get to know our dedicated office staff, the unsung heroes ensuring seamless workflow and unparalleled support."
                keywords="staffs of kadam myagdi, social activists, executives, ngo members"
                openGraph={{
                    type: 'website',
                    description: 'Get to know our dedicated office staff, the unsung heroes ensuring seamless workflow and unparalleled support.',
                    url: 'https://kadammyagdi.org.np/team/office-staffs',
                    images: [{
                        url: 'https://www.kadammyagdi.org.np/assets/meta_images/homepage.png',
                        width: 1200,
                        height: 630,
                        alt: 'Kaligandaki Community Development Munch (KADAM) Myagdi',
                    }],
                    site_name: 'KADAM Myagdi'
                }}
            />
			<OfficeStaffsView />
		</div>
	)
}

export default OfficeStaffs

OfficeStaffs.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>
}
