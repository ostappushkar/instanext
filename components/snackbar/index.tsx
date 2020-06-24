import Snackbar from "@material-ui/core/Snackbar";
import styles from "../../styles/snackbar.module.scss"
import MuiAlert, { AlertProps, Color } from "@material-ui/lab/Alert";
import {connect} from "react-redux"
import {getPosts} from "../../redux/posts/actions"
const CustomAlert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

interface IAlertProps {
  alertOpen: boolean;
  message: string;
  getPosts:Function
}
const Alert = (props: IAlertProps) => {
  const { alertOpen, message,getPosts } = props;

  const handleRefresh=()=>{
    getPosts()
  }
  return (
    <div>
      <Snackbar
      onClick={handleRefresh}
      className={styles.snackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={alertOpen}
        message={message}
        key={"top" + "center"}
      >
        <CustomAlert       className={styles.snackbarAlert}severity="success">
          {message}
        </CustomAlert>
      </Snackbar>
    </div>
  );
};
const mapDispatchToProps={
  getPosts
}
export default connect(null,mapDispatchToProps)(Alert)
