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
import { useNavigation, useRoute } from "@react-navigation/native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function CartCard(props) {
  const navigation = useNavigation();
  return (
    <LinearGradient
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      colors={["#ffa502", "#ff7f50", "#ff6348"]}
      style={[styles.body]}
    >
      <Text
        style={styles.textStyle}
      >{`${props.year} ${props.make} ${props.model}`}</Text>
      <Text style={styles.textStyle}>{props.part}</Text>
      <Text style={{ color: "white", fontSize: 32, textAlign: "center" }}>
        {"x" + props.quantity}
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
  },

  body: {
    alignSelf: "center",
    margin: 10,
    borderRadius: 25,
    borderColor: "#e84118",
    backgroundColor: "transparent",
    height: height * 0.2,
    width: width * 0.8,
    justifyContent: "space-between",
    borderWidth: 2,
    flexDirection: "column",
    padding: 20,
  },

  textStyle: {
    fontSize: 24,
    fontWeight: "400",
    textAlign: "center",
    color: "white",
  },
});
