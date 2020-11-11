import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./components/loginScreen.jsx";
import MainScreen from "./components/mainScreen.jsx";
import MakerParts from "./components/MakerParts.jsx";
import CartScreen from "./components/CartScreen.jsx";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

const Stack = createStackNavigator();

global.shoppingCart = [];

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerLeft: null,
            gestureEnabled: true,
            headerTintColor: "#e84118",
          }}
          component={LoginScreen}
          name="Login"
        />
        <Stack.Screen
          options={{
            headerLeft: null,
            gestureEnabled: true,
            headerTintColor: "#e84118",
            headerRight: function CardComponent() {
              const navigation = useNavigation();
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Cart");
                  }}
                >
                  <Text style={styles.textStyle}>Cart</Text>
                </TouchableOpacity>
              );
            },
          }}
          component={MainScreen}
          name="Home"
        />
        <Stack.Screen
          options={{
            gestureEnabled: true,
            headerTintColor: "#e84118",
          }}
          component={MakerParts}
          name="Car Part"
        />
        <Stack.Screen
          options={{
            gestureEnabled: true,
            headerTintColor: "#e84118",
          }}
          component={CartScreen}
          name="Cart"
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },

  textStyle: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    color: "#e84118",
    marginRight: 20,
  },
});
