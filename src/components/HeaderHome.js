import React from "react";
import { Header } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { AuthContext } from "../providers/AuthProvider";
const HeaderHome = (props) => {
  const icon = [
    <MaterialCommunityIcons name="logout-variant" size={24} color="black" />,
  ];
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <Header
          leftComponent={{
            icon: "menu",
            color: "#E5E4E2",
            onPress: props.DrawerFunction,
          }}
          centerComponent={{
            text: "BloggerHunt!",
            style: { color: "#E5E4E2" },
          }}
          rightComponent={{
            icon: "lock-outline",
            color: "#E5E4E2",
            onPress: function () {
              auth.setIsLoggedIn(false);
              auth.setCurrentUser({});
            },
          }}
        />
      )}
    </AuthContext.Consumer>
  );
};

export default HeaderHome;
