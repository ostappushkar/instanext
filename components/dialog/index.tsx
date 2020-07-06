import { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import styles from '../../styles/dialog.module.scss'
import Login from './login'
import Signup from './signup'

interface IAuthDialogProps {
  open: boolean
  setOpen: Function
}
const AuthDialog = (props: IAuthDialogProps) => {
  const { open, setOpen } = props
  const [isSignup, setSignup] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Dialog className={styles.dialog} open={open} onClose={handleClose}>
      <button onClick={handleClose} className={styles.closeButton}>
        <img src="/close.svg" alt="" />
      </button>
      {isSignup ? (
        <Signup setOpen={setOpen} setSignup={setSignup} />
      ) : (
        <Login setOpen={setOpen} setSignup={setSignup} />
      )}
    </Dialog>
  )
}

export default AuthDialog
