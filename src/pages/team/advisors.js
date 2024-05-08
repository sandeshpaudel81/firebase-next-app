import Layout from "@/views/Layout"
import AdvisorsView from "@/views/team/AdvisorsView"
import React from "react"

const Advisors = () => {
	return (
		<div>
			<NextSeo
                title="Our Advisors | KADAM Myagdi"
                description="Meet the brilliant minds guiding our journey! Explore our esteemed roster of advisors, a diverse collective of industry pioneers, thought leaders, and visionaries shaping our path to success."
                keywords="advisors of kadam myagdi, ngo advisors"
                openGraph={{
                    type: 'website',
                    description: 'Meet the brilliant minds guiding our journey! Explore our esteemed roster of advisors, a diverse collective of industry pioneers, thought leaders, and visionaries shaping our path to success.',
                    url: 'https://kadammyagdi.org.np/team/advisors',
                    images: [{
                        url: 'https://www.kadammyagdi.org.np/assets/meta_images/homepage.png',
                        width: 1200,
                        height: 630,
                        alt: 'Kaligandaki Community Development Munch (KADAM) Myagdi',
                    }],
                    site_name: 'KADAM Myagdi'
                }}
            />
			<AdvisorsView />
		</div>
	)
}

export default Advisors

Advisors.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>
}
