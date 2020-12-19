import * as firebase from "firebase";
import "firebase/firestore";

const deletePost = async (ID) => {
  console.log(ID);
  firebase
    .firestore()
    .collection("posts")
    .doc(ID)
    .delete()
    .then(() => {
      alert("Post deleted!");
    });
};

export { deletePost };
