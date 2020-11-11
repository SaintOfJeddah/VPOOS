import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
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
  ScrollView,
} from "react-native";
import PartCard from "./partCard.jsx";
import { LinearGradient } from "expo-linear-gradient";
import { useSpring, animated } from "react-spring/native";
import { render } from "react-dom";
import { useNavigation, useRoute } from "@react-navigation/native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function MakerParts() {
  const [parts, setParts] = useState([]);
  const AnimatedText = animated(Text);
  const AnimatedScroll = animated(ScrollView);
  const navigation = useNavigation();
  const route = useRoute();
  const { make } = route.params;
  const textAnim = useSpring({
    config: { mass: 1, tension: 30, friction: 6 },
    top: 0,
    opacity: 1,
    from: { opacity: 0, top: -200 },
    delay: 200,
  });

  const viewProps2 = useSpring({
    config: { mass: 1, tension: 50, friction: 15 },
    top: 0,
    opacity: 1,
    from: { opacity: 0, top: 200 },
    delay: 400,
  });

  useEffect(() => {
    fetch("http://5.189.157.144:8000/getParts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        make: make,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        let carParts = [];
        var i = 0;
        for (i = 0; i < res.parts.length; i++) {
          carParts.push({
            make: res.parts[i].make,
            model: res.parts[i].model,
            year: res.parts[i].year,
            part: res.parts[i].part,
          });
          console.log(
            `MAKE: ${res.parts[i].make}\nMODEL: ${res.parts[i].model}\nYEAR: ${res.parts[i].year}\nPART: ${res.parts[i].part}`
          );
        }
        setParts(carParts);
      })
      .catch((err) => {});
  }, []);

  return (
    <View style={styles.container}>
      <AnimatedText
        style={[styles.textStyle, { marginTop: 20, fontSize: 42 }, textAnim]}
      >
        {make}
      </AnimatedText>
      <AnimatedScroll style={[{ alignContent: "center" }, viewProps2]}>
        {parts.map((part) => {
          return (
            <PartCard
              make={part.make.replace(
                part.make.charAt(0),
                part.make.charAt(0).toUpperCase()
              )}
              model={part.model.replace(
                part.model.charAt(0),
                part.model.charAt(0).toUpperCase()
              )}
              year={part.year}
              part={part.part.replace(
                part.part.charAt(0),
                part.part.charAt(0).toUpperCase()
              )}
            ></PartCard>
          );
        })}
      </AnimatedScroll>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    backgroundColor: "#f5f6fa",
  },

  textStyle: {
    fontSize: 22,
    fontWeight: "400",
    margin: 5,
    textAlign: "center",
    color: "#e84118",
  },

  textInput: {
    width: width * 0.7,
    height: height * 0.04,
    backgroundColor: "transparent",
    borderRadius: 15,
    paddingLeft: 10,
    paddingRight: 10,
    alignSelf: "center",
    marginTop: 0,
    color: "white",
  },
});
