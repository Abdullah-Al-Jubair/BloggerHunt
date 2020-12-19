import React, { useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

import { AuthContext } from "../providers/AuthProvider";
import * as firebase from "firebase";
import "firebase/firestore";
import { addLike, removeLike } from "../functions/ShowLike";

const CommentButton = ({ postID, likes, navigateFunc, userID }) => {
  const [icon, setIcon] = useState("like2");
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Button
            type="outline"
            title={`Like (${likes})`}
            icon={<AntDesign name={icon} size={20} color="darkblue" />}
            onPress={async function () {
              if (icon == "like2") {
                addLike(postID, userID, likes);
                setIcon("like1");
              } else {
                removeLike(postID, userID, likes);
                setIcon("like2");
              }
            }}
          />
          <Button
            type="outline"
            icon={
              <FontAwesome name="commenting-o" size={20} color="darkblue" />
            }
            title=" Comment"
            onPress={() => {
              navigateFunc();
            }}
          />
        </View>
      )}
    </AuthContext.Consumer>
  );
};

export default CommentButton;
