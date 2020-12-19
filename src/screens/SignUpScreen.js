import React, { useState, useEffect } from "react";
import { View, StyleSheet, LogBox } from "react-native";
import { Input, Button, Card } from "react-native-elements";
import {
  FontAwesome,
  Feather,
  AntDesign,
  Ionicons,
  Fontisto,
  MaterialIcons,
} from "@expo/vector-icons";

import * as firebase from "firebase";
import "firebase/firestore";
import Loading from "./../components/Loading";

const SignUpScreen = (props) => {
  const [Name, setName] = useState("");
  const [SID, setSID] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [DOB, setDob] = useState("");
  const [Worksat, setWorksat] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <View style={styles.viewStyle}>
        <Card>
          <Card.Title>Welcome to BloggerHunt!</Card.Title>
          <Card.Divider />
          <Input
            leftIcon={<Ionicons name="ios-person" size={16} color="#2B547E" />}
            placeholder="Name"
            onChangeText={function (currentInput) {
              setName(currentInput);
            }}
          />
          <Input
            leftIcon={<Ionicons name="ios-school" size={16} color="#2B547E" />}
            placeholder="Student ID"
            onChangeText={function (currentInput) {
              setSID(currentInput);
            }}
          />
          <Input
            leftIcon={<FontAwesome name="envelope" size={16} color="#2B547E" />}
            placeholder="E-mail Address"
            onChangeText={function (currentInput) {
              setEmail(currentInput);
            }}
          />

          <Input
            placeholder="Password"
            leftIcon={<Feather name="key" size={16} color="#2B547E" />}
            secureTextEntry={true}
            onChangeText={function (currentInput) {
              setPassword(currentInput);
            }}
          />

          <Input
            placeholder="Date of Birth"
            leftIcon={<Fontisto name="date" size={16} color="#2B547E" />}
            onChangeText={function (currentInput) {
              setDob(currentInput);
            }}
          />

          <Input
            placeholder="Works at"
            leftIcon={<MaterialIcons name="work" size={16} color="black" />}
            onChangeText={function (currentInput) {
              setWorksat(currentInput);
            }}
          />

          <Button
            icon={<AntDesign name="user" size={20} color="white" />}
            title="  Sign Up!"
            type="solid"
            onPress={() => {
              if (Name && SID && Email && Password) {
                setIsLoading(true);
                firebase
                  .auth()
                  .createUserWithEmailAndPassword(Email, Password)
                  .then((userCreds) => {
                    userCreds.user.updateProfile({ displayName: Name });
                    firebase
                      .firestore()
                      .collection("users")
                      .doc(userCreds.user.uid)
                      .set({
                        name: Name,
                        sid: SID,
                        email: Email,
                        dob: DOB,
                        works: Worksat,
                      })
                      .then(() => {
                        setIsLoading(false);
                        //alert("Account created successfully!");
                        alert("USER ID: " + userCreds.user.uid);
                        console.log(userCreds.user);
                        props.navigation.navigate("SignIn");
                      })
                      .catch((error) => {
                        setIsLoading(false);
                        alert(error);
                      });
                  })
                  .catch((error) => {
                    setIsLoading(false);
                    alert(error);
                  });
              } else {
                alert("Fields can not be empty!");
              }
            }}
          />
          <Button
            type="clear"
            icon={<AntDesign name="login" size={20} color="dodgerblue" />}
            title="  Already have an account?"
            onPress={function () {
              props.navigation.navigate("SignIn");
            }}
          />
        </Card>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#991c22",
  },
});
export default SignUpScreen;
