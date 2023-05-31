import '@/styles/globals.css'
import { store } from '@/redux/store'
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }) {

  const getLayout = Component.getLayout || ((page) => page);

  return <>
    <Provider store={store}>
      <div>
        <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={6}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
              className: '',
              duration: 1000,
              style: {
                background: '#363636',
                color: '#fff',
              },

              success: {
                duration: 3000,
                theme: {
                  primary: 'green',
                  secondary: 'black',
                },
              },
            }}
            />
          <div className='grid grid-rows-auto relative'>
            {getLayout(<Component {...pageProps} />)}
          </div>
        </div>
    </Provider>
  </>
}
