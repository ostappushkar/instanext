import '../styles/global.scss'

import { Provider } from 'react-redux'
import { useStore } from '../redux/store'
import Layout from '../components/layout'

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}
