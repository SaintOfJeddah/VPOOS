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
import MakeCard from "./MakeCard.jsx";
import PartCard from "./partCard.jsx";
import { LinearGradient } from "expo-linear-gradient";
import { useSpring, animated } from "react-spring/native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function MainScreen() {
  const [makes, setMakes] = useState([]);
  const [parts, setParts] = useState([]);

  useEffect(() => {
    fetch("http://5.189.157.144:8000/carMake")
      .then((res) => res.json())
      .then((res) => {
        let carMakers = [];
        var i = 0;
        for (i = 0; i < res.makes.length; i++) {
          carMakers.push(res.makes[i].make);
        }
        console.log(carMakers);
        setMakes(carMakers);
      })
      .catch((err) => {});

    fetch("http://5.189.157.144:8000/getParts")
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
        }
        setParts(carParts);
        console.log(parts);
      })
      .catch((err) => {});
  }, []);

  const AnimatedLinear = animated(LinearGradient);
  const AnimatedView = animated(View);
  const AnimatedScroll = animated(ScrollView);
  const AnimatedText = animated(Text);
  const animProps = useSpring({
    config: { mass: 1, tension: 80, friction: 12 },
    width: styles.textInput.width,
    height: styles.textInput.height,
    opacity: 1,
    from: { opacity: 0, height: 0, width: 0 },
    delay: 400,
  });

  const viewProps = useSpring({
    config: { mass: 1, tension: 50, friction: 15 },
    right: 0,
    opacity: 1,
    from: { opacity: 0, right: -200 },
    delay: 400,
  });
  const viewProps2 = useSpring({
    config: { mass: 1, tension: 50, friction: 15 },
    top: 0,
    opacity: 1,
    from: { opacity: 0, top: 200 },
    delay: 400,
  });

  return (
    <View style={styles.container}>
      <AnimatedLinear
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        colors={["#ffa502", "#ff7f50", "#ff6348"]}
        style={[
          styles.textInput,
          { marginTop: 40 },
          animProps,
          {
            borderStyle: "solid",
            borderColor: "white",
            borderRadius: 15,
            borderWidth: 1,
          },
        ]}
      >
        <TextInput
          placeholder="Search Car parts..."
          placeholderTextColor="white"
          style={[styles.textInput]}
        ></TextInput>
      </AnimatedLinear>

      <AnimatedView style={[{ marginTop: 20, marginBottom: 20 }, viewProps]}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "400",
            margin: 5,
            textAlign: "center",
            color: "#e84118",
          }}
        >
          Select your car's Manufacturer
        </Text>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          {makes.map((make) => {
            return (
              <MakeCard
                make={make.replace(
                  make.charAt(0),
                  make.charAt(0).toUpperCase()
                )}
              ></MakeCard>
            );
          })}
        </ScrollView>
      </AnimatedView>
      <AnimatedText
        style={[
          {
            fontSize: 22,
            fontWeight: "400",
            margin: 5,
            textAlign: "center",
            color: "#e84118",
          },
          viewProps,
        ]}
      >
        Most Purchased Parts
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
    fontWeight: "300",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 10,
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
