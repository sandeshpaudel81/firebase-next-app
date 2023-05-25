import Layout from '@/views/Layout';
import Carousel from '@/views/carousel';
import Image from 'next/image'


export default function Home() {
  return (
    <main>
        <Carousel />
    </main>
  )
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
