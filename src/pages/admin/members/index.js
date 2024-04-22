import { AdminProtected } from '@/hooks/route'
import Layout from '@/views/Layout'
import TeamCategoryList from '@/views/admin/members/categoryList'
import React from 'react'

const AdminMembersList = () => {
  return (
    <div>
        <TeamCategoryList />
    </div>
  )
}

export default AdminMembersList

AdminMembersList.getLayout = function getLayout(page) {
  return <AdminProtected><Layout>{page}</Layout></AdminProtected>;
};