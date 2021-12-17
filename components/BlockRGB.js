import React from "react";
import { View, Text, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const numColumns = 4;
const tileSize = screenWidth / numColumns;

export default function BlockRGB(props) {
  return (
    <View
      style={{
        backgroundColor: `rgb(${props.red}, ${props.green}, ${props.blue})`,
        height: tileSize,
        width: tileSize,
        padding: 5,
        // width: "100%",
      }}
    ></View>
  );
}
