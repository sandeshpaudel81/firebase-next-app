import Layout from "@/views/Layout"
import MembersView from "@/views/team/MembersView"
import React from "react"

const Members = () => {
	return (
		<div>
			<NextSeo
                title="General & Life Members | KADAM Myagdi"
                description="Explore the vibrant network of our general and life members, a dynamic tapestry of individuals united by passion, purpose, and a shared commitment to excellence."
                keywords="members of kadam myagdi, social activists, general members, life members, ngo members"
                openGraph={{
                    type: 'website',
                    description: 'Explore the vibrant network of our general and life members, a dynamic tapestry of individuals united by passion, purpose, and a shared commitment to excellence.',
                    url: 'https://kadammyagdi.org.np/team/members',
                    images: [{
                        url: 'https://www.kadammyagdi.org.np/assets/meta_images/homepage.png',
                        width: 1200,
                        height: 630,
                        alt: 'Kaligandaki Community Development Munch (KADAM) Myagdi',
                    }],
                    site_name: 'KADAM Myagdi'
                }}
            />
			<MembersView />
		</div>
	)
}

export default Members

Members.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>
}
