import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { render } from "react-dom";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSpring, animated } from "react-spring/native";
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function MakeCard(props) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Car Part", {
          make: props.make,
        });
      }}
    >
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        colors={["#ffa502", "#ff7f50", "#ff6348"]}
        style={[styles.body]}
      >
        <Text style={styles.textStyle}>{props.make}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  body: {
    margin: 10,
    borderRadius: 25,
    borderColor: "#e84118",
    backgroundColor: "transparent",
    height: height * 0.15,
    width: width * 0.4,
    justifyContent: "center",
    borderWidth: 2,
  },

  textStyle: {
    fontSize: 34,
    fontWeight: "300",
    textAlign: "center",
    color: "white",
  },
});
