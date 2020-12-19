import React, { useState, useEffect } from "react";
import {
  LogBox,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Card, Button } from "react-native-elements";
import PostCard from "../components/PostCard";

import { AuthContext } from "../providers/AuthProvider";
import { saveComment } from "../functions/ShowComments";

import HeaderHome from "../components/HeaderHome";
import DataElementCard from "../components/DataElementCard";

import * as firebase from "firebase";
import "firebase/firestore";

const PostScreen = (props) => {
  let postInfo = props.route.params;
  const [posts, setPosts] = useState({});
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState([]);

  const loadSinglePost = async () => {
    setLoading(true);
    firebase
      .firestore()
      .collection("posts")
      .doc(postInfo.id)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          setPosts(documentSnapshot.data());
        }
      });
  };

  const loadComments = async () => {
    setLoading(true);
    firebase
      .firestore()
      .collection("posts")
      .doc(postInfo.id)
      .onSnapshot((querySnapshot) => {
        let temp_comments = [];
        querySnapshot.data().comments.forEach((doc) => {
          temp_comments.push(doc);
        });
        setComments(temp_comments);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadSinglePost();
    loadComments();
    LogBox.ignoreAllLogs();
  }, []);

  if (!loading) {
    return (
      <AuthContext.Consumer>
        {(auth) => (
          <View style={styles.viewStyle}>
            <HeaderHome
              DrawerFunction={() => {
                props.navigation.toggleDrawer();
              }}
            />

            <PostCard author={posts.author} body={posts.body} />

            <DataElementCard
              Text="Write your Comments!"
              currentFunc={setInput}
              currentText={input}
              pressFunction={async () => {
                saveComment(postInfo.id, input, postInfo.data.userId);
              }}
            />

            <ScrollView>
              <Card>
                <Card.Title>Comments</Card.Title>
                <FlatList
                  data={comments}
                  renderItem={({ item }) => {
                    return (
                      <View>
                        <Card>
                          <PostCard
                            author={item.commenter}
                            body={item.comment}
                          />
                        </Card>
                      </View>
                    );
                  }}
                />
              </Card>
            </ScrollView>
          </View>
        )}
      </AuthContext.Consumer>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#E5E4E2" animating={true} />
      </View>
    );
  }
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

export default PostScreen;
