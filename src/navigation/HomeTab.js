import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Entypo, AntDesign, Ionicons } from "@expo/vector-icons";
import HomeScreen from "./../screens/HomeScreen";
import NotificationScreen from "./../screens/NotificationScreen";
import PostStackScreen from "./PostStack";

const HomeTab = createMaterialBottomTabNavigator();

const HomeTabScreen = () => {
  return (
    <HomeTab.Navigator initialRouteName="Home">
      <HomeTab.Screen
        name="Home"
        component={PostStackScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" color="white" size={26} />
            ) : (
              <AntDesign name="home" color="white" size={22} />
            ),
        }}
      />
      <HomeTab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarLabel: "Notifications",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <AntDesign name="notification" size={26} color="white" />
            ) : (
              <AntDesign name="notification" size={20} color="white" />
            ),
        }}
      />
    </HomeTab.Navigator>
  );
};

export default HomeTabScreen;
