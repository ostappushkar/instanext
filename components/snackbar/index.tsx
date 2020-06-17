import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps, Color } from "@material-ui/lab/Alert";
const CustomAlert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

interface IAlertProps {
  alertOpen: boolean;
  message: string;
  type: Color;
}
const Alert = (props: IAlertProps) => {
  const { alertOpen, message, type } = props;
  const handleClose = () => {};
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={alertOpen}
        onClose={handleClose}
        message={message}
        key={"top" + "center"}
      >
        <CustomAlert onClose={handleClose} severity={type}>
          This is a success message!
        </CustomAlert>
      </Snackbar>
    </div>
  );
};
