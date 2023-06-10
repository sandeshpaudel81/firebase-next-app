import Layout from '@/views/Layout'
import NoticeDetailView from '@/views/notices/detail'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { db } from '../../../../firebase-config'
import { doc, getDoc } from 'firebase/firestore'
import { NextSeo } from 'next-seo'
import { timestampToDate } from '@/redux/slices/noticeSlice'
import { getAllNotices, getNoticeById } from '@/utils/api-util'

const NoticeDetail = (props) => {
  const data = props.data
  return (
    <div>
        <NextSeo
                title={`${data?.title} | KADAM Myagdi`}
                description={`${data?.content.substring(0,120)}`}
                keywords="notices of kadam myagdi, ngo notices, ngo vacancies"
                openGraph={{
                    type: 'article',
                    url: `https://kadammyagdi.org.np/notices/${data?.id}/`,
                    images: [{
                        url: data?.images[0],
                        width: 1200,
                        height: 630,
                        alt: 'Notices of Kaligandaki Community Development Munch (KADAM) Myagdi',
                    },{
                        url: "https://kadammyagdi.org.np/assets/meta_images/notices.png",
                        width: 1200,
                        height: 630,
                        alt: 'Notices of Kaligandaki Community Development Munch (KADAM) Myagdi',
                    }
                    ],
                    site_name: 'KADAM Myagdi'
                }}
            />
            <NoticeDetailView id={data?.id}/>
    </div>
  )
}

export async function getStaticProps({params}) {
  const noticeId = params.id;

    const notice = await getNoticeById(noticeId);

    return {
        props: {
            data: notice
        },
        revalidate: 30
    }

}

export async function getStaticPaths(){
    const notices = await getAllNotices();
    const paths = notices.map(notice => ({ params: { id: notice.id } }));

    return {
        paths: paths,
        fallback: true
    };
}

export default NoticeDetail

NoticeDetail.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };