import React, { useState, useEffect } from "react";
import { View, StyleSheet, ImageBackground, FlatList } from "react-native";
import { Card } from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";
import HeaderHome from "../components/HeaderHome";
import NotificationCard from "../components/NotificationBar";

import * as firebase from "firebase";
import "firebase/firestore";

const NotificationScreen = (props) => {
  const [Notification, setNotification] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadNotifications = async () => {
    setLoading(true);
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot((querySnapshot) => {
        let temp_notifications = [];
        querySnapshot.data().notifications.forEach((doc) => {
          temp_notifications.push(doc);
        });
        setNotification(temp_notifications);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadNotifications();
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
          <FlatList
            data={Notification}
            onRefresh={loadNotifications}
            refreshing={loading}
            renderItem={function ({ item }) {
              return (
                <View>
                  <Card>
                    <NotificationCard Text={item.sender} Type={item.type} />
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

export default NotificationScreen;
