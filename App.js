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

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: `rgb(${red}, ${green}, ${blue})` },
      ]}
    >
      <View style={{ padding: 30 }}>
        <Text style={styles.detailText}>Red: {red}</Text>
        <Text style={styles.detailText}>Green: {green}</Text>
        <Text style={styles.detailText}>Blue: {blue}</Text>
      </View>
    </View>
  );
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
    // alignItems: "center",
    justifyContent: "center",
  },
  list: {
    // height: 100,
    // width: 100,
  },
  detailText: {
    fontSize: 24,
    marginBottom: 20,
    alignItems: "center",
  },
});
