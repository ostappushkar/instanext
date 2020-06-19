import { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/addPost.module.scss";
import { addPost } from "../../services/posts";
interface IAppProps {
  open: boolean;
  setOpen: Function;
}
interface IPostData {
  desc: string;
  photo: File;
}
const AddDialog = (props: IAppProps) => {
  const { open, setOpen } = props;
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState(null);

  const handleClose = () => {
    setOpen(false);
    setErrorMessage("");
  };
  const handleImage = (event) => {
    if (event.target.files) {
      var file = event.target.files[0];
      var fr = new FileReader();
      fr.onloadend = (e) => {
        setImage(e.target.result);
      };
      fr.readAsDataURL(file);
    }
  };
  const handleUpload = (event) => {
    event.preventDefault();
    let data = new FormData(event.target);
    let object: IPostData = {
      desc: "",
      photo: null,
    };
    data.forEach((value, key) => {
      object[key] = value;
    });
    if (object.photo === null) {
      setErrorMessage("Choose a photo");
      return;
    } else {
      addPost(
        object.desc,
        object.photo,
        () => {
          console.log("Post added");
          setOpen(false);
          setImage(null);
        },
        (err) => {
          setErrorMessage(err);
        }
      );
    }
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add post</DialogTitle>
      <DialogContent>
        <form onSubmit={handleUpload}>
          <div className={styles.uploader}>
            <label className={styles.inputLabel} htmlFor="image-upload">
              <input
                name="photo"
                onChange={handleImage}
                id="image-upload"
                hidden
                type="file"
                accept="image/*"
              />
              <div className={styles.imagePreview}>
                {image ? (
                  <img src={image} alt="" />
                ) : (
                  <FontAwesomeIcon icon={faCamera} />
                )}
              </div>
            </label>
          </div>
          <textarea
            className={styles.inputField}
            name="desc"
            placeholder="Description"
          />
          <p className={styles.errorText}>{errorMessage}</p>
          <button type="submit" className={styles.confirmButton}>
            Confirm
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default AddDialog;
