import Layout from '@/views/Layout';
import Image from 'next/image'


export default function Home() {
  return (
    <main>
      <div>
        Home
      </div>
    </main>
  )
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
