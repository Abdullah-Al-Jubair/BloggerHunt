import {
  getAllData,
  getDataJSON,
  storeDataJSON,
} from "./AsyncStorageFunctions";
import * as firebase from "firebase";
import "firebase/firestore";

const addNotifications = async (userID, type) => {
  firebase
    .firestore()
    .collection("users")
    .doc(userID)
    .update({
      notifications: firebase.firestore.FieldValue.arrayUnion({
        ID: Math.floor(Math.random() * 2555),
        sender: firebase.auth().currentUser.displayName,
        receiver: userID,
        created_at: firebase.firestore.Timestamp.now(),
        type: type,
      }),
    })
    .catch((error) => {
      alert(error);
    });
};
export { addNotifications };
