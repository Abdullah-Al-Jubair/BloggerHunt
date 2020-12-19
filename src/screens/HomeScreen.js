import React, { useState, useEffect } from "react";

import {
  LogBox,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Card, Button, Text, Avatar, Input } from "react-native-elements";

import { AntDesign, Entypo } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";
import { useNetInfo } from "@react-native-community/netinfo";

import PostCard from "./../components/PostCard";
import HeaderHome from "../components/HeaderHome";
import CommentButton from "../components/CommentButton";

import * as firebase from "firebase";
import "firebase/firestore";

const HomeScreen = (props) => {
  const netinfo = useNetInfo();
  if (netinfo.type != "unknown" && !netinfo.isInternetReachable) {
    alert("No Internet!");
  }
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const loadPosts = async () => {
    setLoading(true);
    firebase
      .firestore()
      .collection("posts")
      .orderBy("created_at", "desc")
      .onSnapshot((querySnapshot) => {
        let temp_posts = [];
        querySnapshot.forEach((doc) => {
          temp_posts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setPosts(temp_posts);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadPosts();
    LogBox.ignoreAllLogs();
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
            <Input
              placeholder="Share Your Ideas !!"
              leftIcon={<Entypo name="pencil" size={18} color="#2B60DE" />}
              onChangeText={(currentText) => {
                setInput(currentText);
              }}
            />
            <Button
              buttonStyle={{ backgroundColor: "#357EC7" }}
              title="Post"
              type="solid"
              onPress={function () {
                setLoading(true);
                firebase
                  .firestore()
                  .collection("posts")
                  .add({
                    userId: auth.CurrentUser.uid,
                    body: input,
                    author: auth.CurrentUser.displayName,
                    created_at: firebase.firestore.Timestamp.now(),
                    likes: 0,
                    comments: [],
                  })
                  .then((docRef) => {
                    //alert("Post created Successfully!");
                    alert("Post ID: " + docRef.id);
                  })
                  .catch((error) => {
                    alert(error);
                  });
              }}
            />
          </Card>
          <ActivityIndicator size="large" color="#2B547E" animating={loading} />

          <FlatList
            data={posts}
            renderItem={({ item }) => {
              return (
                <View>
                  <Card>
                    <PostCard author={item.data.author} body={item.data.body} />
                    <Card.Divider />
                    <CommentButton
                      postID={item.id}
                      likes={item.data.likes}
                      userID={item.data.userId}
                      navigateFunc={() => {
                        props.navigation.navigate("PostScreen", item);
                      }}
                    />
                  </Card>
                </View>
              );
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
});

export default HomeScreen;
