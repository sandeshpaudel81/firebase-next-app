import Layout from '@/views/Layout'
import AdminDashboard from '@/views/admin'
import React from 'react'

const Index = () => {
    return (
        <div>
            <AdminDashboard />
        </div>
    )
}

export default Index

Index.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};