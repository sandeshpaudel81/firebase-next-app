import Layout from '@/views/Layout'
import NoticeList from '@/views/notices/list'
import React from 'react'

const Notices = () => {
    return (
        <div>
            <NoticeList />
        </div>
    )
}

export default Notices

Notices.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };