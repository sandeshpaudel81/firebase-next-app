import { AdminProtected } from '@/hooks/route'
import Layout from '@/views/Layout'
import TeamEdit from '@/views/admin/members/edit'
import { useRouter } from 'next/router'
import React from 'react'

const AdminMembersDetail = () => {
    const { query: { id } } = useRouter()
    return (
        <div>
            { id === "general-life-members" ? <TeamEdit id={id}/> : <TeamEdit id={id}/> }
        </div>
    )
}

export default AdminMembersDetail

AdminMembersDetail.getLayout = function getLayout(page) {
    return <AdminProtected><Layout>{page}</Layout></AdminProtected>;
  };