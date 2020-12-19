import * as firebase from "firebase";
import "firebase/firestore";
import { addNotifications } from "./ShowNotifications";

const saveComment = (postID, input, userID) => {
  firebase
    .firestore()
    .collection("posts")
    .doc(postID)
    .update({
      comments: firebase.firestore.FieldValue.arrayUnion({
        ID: Math.floor(Math.random() * 2555),
        comment: input,
        commenter: firebase.auth().currentUser.displayName,
        created_at: firebase.firestore.Timestamp.now(),
      }),
    })
    .then(() => {
      alert("Comment created successfully!");
    })
    .catch((error) => {
      alert(error);
    });

  addNotifications(userID, "comment");
};

export { saveComment };
