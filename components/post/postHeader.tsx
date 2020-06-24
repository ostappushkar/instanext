import styles from '../../styles/post.module.scss'
import { IPostProps } from '.'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
export default (props: IPostProps) => {
  const { item } = props
  return (
    <header className={styles.postHeader}>
      {item.avatar ? (
        <img className={styles.headerAvatar} src={item.avatar} alt="User Avatar" />
      ) : (
        <FontAwesomeIcon icon={faUser} />
      )}

      <h5 className={styles.headerUserName}>{item.userName}</h5>
    </header>
  )
}
