import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text, Card, Button } from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";
import { FontAwesome } from "@expo/vector-icons";
import HeaderHome from "../components/HeaderHome";

import * as firebase from "firebase";
import "firebase/firestore";

const ProfileScreen = (props) => {
  const [birth, setBirth] = useState("");
  const [work, setWork] = useState("");

  const fetch = async () => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot((querySnapshot) => {
        setBirth(querySnapshot.data().dob);
        setWork(querySnapshot.data().works);
      })
      .then()
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <HeaderHome
            DrawerFunction={() => {
              props.navigation.toggleDrawer();
            }}
          />

          <Card>
            <View>
              <Image
                source={require("./../../assets/user.png")}
                style={styles.profilePic}
                resizeMode="contain"
              />
            </View>
          </Card>

          <Card>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  alignSelf: "center",
                  fontWeight: "bold",
                  fontSize: 30,
                }}
              >
                {auth.CurrentUser.displayName}
              </Text>
            </View>
          </Card>

          <Card>
            <View>
              <Text>
                <Text
                  style={{ fontWeight: "bold", color: "#7D0541", fontSize: 20 }}
                >
                  Email : {auth.CurrentUser.email}
                </Text>
                {"\n"}
                <Text
                  style={{ fontWeight: "bold", color: "#7D0541", fontSize: 20 }}
                >
                  Born on : {birth}
                </Text>
                {"\n"}
                <Text
                  style={{ fontWeight: "bold", color: "#7D0541", fontSize: 20 }}
                >
                  Works at : {work}
                </Text>
              </Text>
            </View>
          </Card>

          <Button
            buttonStyle={{ backgroundColor: "#357EC7" }}
            containerStyle={{
              width: 150,
              marginLeft: 120,
              marginRight: 10,
              marginTop: 15,
            }}
            titleStyle={{ marginLeft: 5 }}
            title="Delete Account"
            type="solid"
            alignSelf="center"
            icon={<FontAwesome name="user-times" size={20} color="white" />}
            onPress={async () => {
              firebase
                .firestore()
                .collection("posts")
                .where("userId", "in", [firebase.auth().currentUser.uid])
                .get()
                .then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    doc.ref.delete();
                  });
                });

              firebase
                .firestore()
                .collection("users")
                .doc(firebase.auth().currentUser.uid)
                .delete();

              firebase.auth().currentUser.delete();
              alert("User Account deleted!");
              auth.setIsLoggedIn(false);
              auth.setCurrentUser({});
            }}
          />
        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: "blue",
  },
  viewStyle: {
    flex: 1,
  },

  profilePic: {
    height: 100,
    width: 100,
    //justifyContent: "center",
    //alignItems: "center",
    alignSelf: "center",
  },
});

export default ProfileScreen;
