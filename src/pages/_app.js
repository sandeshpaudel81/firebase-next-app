import '@/styles/globals.css'

export default function App({ Component, pageProps }) {

  const getLayout = Component.getLayout || ((page) => page);

  return <>
    <div>
      <div className='grid grid-rows-auto relative'>
        {getLayout(<Component {...pageProps} />)}
      </div>
    </div>
  </>
}
