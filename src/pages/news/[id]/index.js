import { getAllNews, getNewsById } from '@/utils/api-util'
import Layout from '@/views/Layout'
import NewsDetailView from '@/views/news/detail'
import { NextSeo } from 'next-seo'
import React from 'react'

const NewsDetail = (props) => {
  const data = props.data
  return (
    <div>
        <NextSeo
                title={`${data?.title} | KADAM Myagdi`}
                description={`${data?.content.substring(0,120)}`}
                keywords="news of kadam myagdi, ngo news, ngo programs"
                openGraph={{
                    type: 'article',
                    url: `https://kadammyagdi.org.np/news/${data?.id}/`,
                    images: [{
                        url: data?.image,
                        width: 1200,
                        height: 630,
                        alt: 'News of Kaligandaki Community Development Munch (KADAM) Myagdi',
                    },{
                        url: "https://kadammyagdi.org.np/assets/meta_images/news.png",
                        width: 1200,
                        height: 630,
                        alt: 'News of Kaligandaki Community Development Munch (KADAM) Myagdi',
                    }
                    ],
                    site_name: 'KADAM Myagdi'
                }}
            />
            <NewsDetailView id={data?.id}/>
    </div>
  )
}

export async function getStaticProps({params}) {
  const newsId = params.id;

    const news = await getNewsById(newsId);

    return {
        props: {
            data: news
        },
        revalidate: 30
    }

}

export async function getStaticPaths(){
    const news = await getAllNews();
    const paths = news.map(n => ({ params: { id: n.id } }));

    return {
        paths: paths,
        fallback: true
    };
}

export default NewsDetail

NewsDetail.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };