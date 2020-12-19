import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStackScreen from "./src/navigation/AuthStack";
import AppDrawerScreen from "./src/navigation/AppDrawer";
import { AuthContext, AuthProvider } from "./src/providers/AuthProvider";
import * as firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDljACEHnRqa5ITvtTvxk0U5L2nB9O5cXc",
    authDomain: "blogappfirebase-1d611.firebaseapp.com",
    projectId: "blogappfirebase-1d611",
    storageBucket: "blogappfirebase-1d611.appspot.com",
    messagingSenderId: "846746795837",
    appId: "1:846746795837:web:b93774cf3746b499724f54",
    databaseURL: "https://blogappfirebase-1d611-default-rtdb.firebaseio.com/"

};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function App() {
  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {(auth) => (
          <NavigationContainer>
            {auth.IsLoggedIn ? <AppDrawerScreen /> : <AuthStackScreen />}
          </NavigationContainer>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
  );
}

export default App;
