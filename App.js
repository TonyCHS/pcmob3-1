import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { StyleSheet, Text, Button, View, FlatList, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BlockRGB from "./components/BlockRGB";
import { TouchableOpacity } from "react-native-gesture-handler";

function HomeScreen({ navigation }) {
  // Initial value is an array of objects
  const [colorArray, setColorArray] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Button onPress={addColor} title="Add colour" />,
      headerRight: () => (
        <Button onPress={resetColor} title="Reset colour" color="#00cc00" />
      ),
    });
  });

  // {item} referts to a single item we pass in
  // e.g. {item} = {red: 255, green: 0, blue: 0}
  function renderItem({ item }) {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Details Screen", { ...item })}
      >
        <BlockRGB red={item.red} green={item.green} blue={item.blue} />
      </TouchableOpacity>
    );
  }

  function addColor() {
    // list = [1, 2, 3]
    // newList = [...list, 4]
    // which is the same as newList = [1, 2, 3, 4]

    setColorArray([
      {
        // e.g. Math.random() give a value from 0 to 1 i.e. 0.8, 0.4
        // 0.4 * 256 = 12.8
        // Math.floor(12.8) = 12

        red: Math.floor(Math.random() * 256),
        green: Math.floor(Math.random() * 256),
        blue: Math.floor(Math.random() * 256),
        id: `${colorArray.length}`,
      },
      // Add a new object to the end of the array
      ...colorArray,
    ]);
  }

  function resetColor() {
    setColorArray([]);
  }

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity
        style={{ height: 40, justifyContent: "center" }}
        onPress={addColor}
      >
        <Text style={{ color: "red" }}>Add colour</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ height: 40, justifyContent: "center" }}
        onPress={resetColor}
      >
        <Text style={{ color: "blue" }}>Reset colour</Text>
      </TouchableOpacity> */}

      <FlatList
        style={styles.list}
        data={colorArray}
        renderItem={renderItem}
        numColumns={4}
      />
    </View>
  );
}

function DetailsScreen({ route }) {
  // Destructure this object so we don't have to type route.params.red etc
  const { red, green, blue } = route.params;

  // To change colour of the text from black to white use
  //if (red*0.299 + green*0.587 + blue*0.114) > 186 use #000000 (black) else use #ffffff (white)
  // console.log(red * 0.299 + green * 0.587 + blue * 0.114);

  const colourCheck = red * 0.299 + green * 0.587 + blue * 0.114;
  // console.log(red);
  // console.log(green);
  // console.log(blue);
  // console.log(colourCheck);

  if (colourCheck > 186) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: `rgb(${red}, ${green}, ${blue})` },
        ]}
      >
        <View style={{ padding: 30 }}>
          <Text style={styles.detailTextBlack}>Red: {red}</Text>
          <Text style={styles.detailTextBlack}>Green: {green}</Text>
          <Text style={styles.detailTextBlack}>Blue: {blue}</Text>
        </View>
      </View>
    );
  } else if (colourCheck < 186) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: `rgb(${red}, ${green}, ${blue})` },
        ]}
      >
        <View style={{ padding: 30 }}>
          <Text style={styles.detailTextWhite}>Red: {red}</Text>
          <Text style={styles.detailTextWhite}>Green: {green}</Text>
          <Text style={styles.detailTextWhite}>Blue: {blue}</Text>
        </View>
      </View>
    );
  }
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Colour List" component={HomeScreen} />
        <Stack.Screen name="Details Screen" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  detailTextWhite: {
    flexDirection: "row",
    fontSize: 50,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
  },
  detailTextBlack: {
    flexDirection: "row",
    fontSize: 50,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    color: "#000000",
  },
});
