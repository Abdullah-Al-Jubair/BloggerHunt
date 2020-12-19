import React from "react";
import { Card, Button, Input } from "react-native-elements";
import { Entypo } from "@expo/vector-icons";
import { View } from "react-native";

const DataElementCard = (props) => {
  return (
    <View>
      <Input
        placeholder={props.Text}
        leftIcon={<Entypo name="pencil" size={16} color="black" />}
        onChangeText={(currentText) => {
          props.currentFunc(currentText);
        }}
      />
      <Button title="Post" type="outline" onPress={props.pressFunction} />
    </View>
  );
};

export default DataElementCard;
