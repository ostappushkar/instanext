import { useState } from 'react'
import { isMobileOnly } from 'react-device-detect'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faImages, faHeart, faUser } from '@fortawesome/free-regular-svg-icons'
import { connect } from 'react-redux'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import styles from '../../styles/bottomNav.module.scss'
import { IStoreState } from '../../interfaces/store'
import AddDialog from '../addPost'
import { useRouter } from 'next/router'
interface IBottomNavProps {
  currentUser: firebase.User
  isLogged: boolean
}
const BottomNav = (props: IBottomNavProps) => {
  const [value, setValue] = useState('/')
  const Router = useRouter()
  const [open, setOpen] = useState(false)
  const { currentUser, isLogged } = props
  const handleProfileRedirect = () => {
    if (isLogged) {
      setValue('profile')
      Router.pathname === '/profile' ? null : Router.push('/profile', undefined, { shallow: true })
    }
  }
  const handleAddClick = () => {
    setValue('/add')
    isLogged ? setOpen(true) : null
  }
  const handleHomeRedirect = () => {
    setValue('/')
    Router.pathname === '/' ? null : Router.push('/', undefined, { shallow: true })
  }
  return isMobileOnly ? (
    <>
      <BottomNavigation
        className={styles.container}
        showLabels={false}
        value={value === '/add' && open ? '/add' : Router.pathname}
      >
        <BottomNavigationAction
          onClick={handleHomeRedirect}
          className={styles.navItem}
          value="/"
          icon={<FontAwesomeIcon icon={faImages} />}
        />
        <BottomNavigationAction
          className={styles.navItem}
          onClick={handleAddClick}
          value="/add"
          icon={<FontAwesomeIcon icon={faPlusSquare} />}
        />
        <BottomNavigationAction className={styles.navItem} value="likes" icon={<FontAwesomeIcon icon={faHeart} />} />
        <BottomNavigationAction
          className={styles.navItem}
          onClick={handleProfileRedirect}
          value="/profile"
          icon={
            isLogged ? (
              currentUser.photoURL ? (
                <div className={styles.navAvatar}>
                  <img className={styles.userPhoto} src={currentUser.photoURL} />
                </div>
              ) : (
                <FontAwesomeIcon icon={faUser} />
              )
            ) : (
              <FontAwesomeIcon icon={faUser} />
            )
          }
        />
      </BottomNavigation>
      <AddDialog open={open} setOpen={setOpen} />
    </>
  ) : null
}
const mapsStateToProps = (state: IStoreState) => {
  return {
    currentUser: state.login.currentUser,
    isLogged: state.login.isLogged,
  }
}
export default connect(mapsStateToProps)(BottomNav)
