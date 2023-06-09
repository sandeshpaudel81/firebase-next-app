import Layout from '@/views/Layout'
import NoticeDetailView from '@/views/notices/detail'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { db } from '../../../../firebase-config'
import { doc, getDoc } from 'firebase/firestore'
import { NextSeo } from 'next-seo'
import { timestampToDate } from '@/redux/slices/noticeSlice'

const NoticeDetail = () => {
  const [data, setdata] = useState(null)
  const { query: { id } } = useRouter()
  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "notices", id);
      const docSnap = await getDoc(docRef);
      const datetime = timestampToDate(docSnap.data().posted_at)
      setdata({ ...docSnap.data(), id: doc.id, posted_at: datetime})
    }
    if(db!==null){
      getData()
    }
  }, [db])
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
        <NoticeDetailView data={data}/>
    </div>
  )
}

export default NoticeDetail

NoticeDetail.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };