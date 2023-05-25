import '@/styles/globals.css'
import { store } from '@/redux/store'
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }) {

  const getLayout = Component.getLayout || ((page) => page);

  return <>
    <Provider store={store}>
      <div className='grid grid-rows-auto relative'>
        {getLayout(<Component {...pageProps} />)}
      </div>
    </Provider>
  </>
}
