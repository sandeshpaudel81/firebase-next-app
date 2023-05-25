import Layout from '@/views/Layout'
import AdminComp from '@/views/admin'
import React from 'react'

const Index = () => {
    return (
        <div>
            <AdminComp />
        </div>
    )
}

export default Index

Index.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};