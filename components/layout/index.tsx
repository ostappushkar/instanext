import BottomNav from '../bottomNavigation'
import Navbar from '../../components/navbar'
import Head from 'next/head'
const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1 user-scalable=0"
        />
      </Head>
      <Navbar />
      {children}
      <BottomNav />
    </>
  )
}

export default Layout
