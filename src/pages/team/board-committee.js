import Layout from "@/views/Layout"
import BoardCommitteeView from "@/views/team/BoardCommitteeView"
import { NextSeo } from "next-seo"
import React from "react"

const BoardCommittee = () => {
	return (
		<div>
			<NextSeo
                title="Board Committee | KADAM Myagdi"
                description="Meet the driving forces shaping our direction, from governance gurus to strategic masterminds."
                keywords="board committee of kadam myagdi, ngo board committee"
                openGraph={{
                    type: 'website',
                    description: 'Meet the driving forces shaping our direction, from governance gurus to strategic masterminds.',
                    url: 'https://kadammyagdi.org.np/team/board-committee',
                    images: [{
                        url: 'https://www.kadammyagdi.org.np/assets/meta_images/homepage.png',
                        width: 1200,
                        height: 630,
                        alt: 'Kaligandaki Community Development Munch (KADAM) Myagdi',
                    }],
                    site_name: 'KADAM Myagdi'
                }}
            />
			<BoardCommitteeView />
		</div>
	)
}

export default BoardCommittee

BoardCommittee.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>
}
