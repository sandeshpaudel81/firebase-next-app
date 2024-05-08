import Layout from '@/views/Layout'
import ProjectList from '@/views/projects'
import { NextSeo } from 'next-seo'
import React from 'react'

const Project = () => {
    return (
        <div>
            <NextSeo
                title="Projects | KADAM Myagdi"
                description="Discover impactful projects initiated by our NGO, fueled by the unwavering support of our valued collaborators, donors, and partners. Join us in making a difference and creating positive change in our communities."
                keywords="projects of  kadam myagdi, ngo projects, projects in nepal"
                openGraph={{
                    type: 'website',
                    description: 'Discover impactful projects initiated by our NGO, fueled by the unwavering support of our valued collaborators, donors, and partners. Join us in making a difference and creating positive change in our communities.',
                    url: 'https://kadammyagdi.org.np/projects/',
                    images: [{
                        url: 'https://www.kadammyagdi.org.np/assets/meta_images/projects.png',
                        width: 1200,
                        height: 630,
                        alt: 'Projects of Kaligandaki Community Development Munch (KADAM) Myagdi',
                    }],
                    site_name: 'KADAM Myagdi'
                }}
            />
            <ProjectList />
        </div>
    )
}

export default Project

Project.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };