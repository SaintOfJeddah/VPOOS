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
import CartCard from "./CartCard.jsx";
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function CartScreen(props) {
  navigation = useNavigation();
  const [placebo, setPlacebo] = useState(false);
  const AnimatedLinear = animated(LinearGradient);
  const AnimatedText = animated(Text);
  const AnimatedScroll = animated(ScrollView);
  const textAnim = useSpring({
    config: { mass: 1, tension: 30, friction: 6 },
    top: 0,
    opacity: 1,
    from: { opacity: 0, top: -200 },
    delay: 200,
  });

  const textAnim2 = useSpring({
    config: { mass: 3, tension: 40, friction: 20 },
    top: 0,
    opacity: 1,
    from: { opacity: 0, top: 200 },
    delay: 200,
  });

  const viewProps = useSpring({
    config: { mass: 1, tension: 50, friction: 15 },
    right: 0,
    opacity: 1,
    from: { opacity: 0, right: -200 },
    delay: 400,
  });
  if (global.shoppingCart.length != 0) {
    return (
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <AnimatedText style={[styles.textStyle, textAnim]}>
          Cart Items
        </AnimatedText>
        <AnimatedScroll style={[viewProps, { marginBottom: 70 }]}>
          {global.shoppingCart.map((partObject) => (
            <CartCard
              year={partObject.part.year}
              make={partObject.part.make}
              model={partObject.part.model}
              quantity={partObject.quantity}
              part={partObject.part.part}
            ></CartCard>
          ))}
        </AnimatedScroll>
        <TouchableOpacity
          onPress={() => {
            Alert.alert("Order Confirmed!");
            global.shoppingCart = [];
            setPlacebo(true);
            navigation.navigate("Home");
          }}
        >
          <AnimatedLinear
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            colors={["#ffa502", "#ff7f50", "#ff6348"]}
            style={
              ([
                {
                  opacity: global.shoppingCart.length >= 1 ? 1 : 0,
                  alignSelf: "center",
                  width: 200,
                  backgroundColor: "transparent",
                  marginTop: 50,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: "#e84118",
                },
              ],
              textAnim2)
            }
          >
            <Text style={[styles.textStyle, { color: "white" }]}>
              Confirm Order
            </Text>
          </AnimatedLinear>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View>
        <Text style={styles.textStyle}>Your cart is empty</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    backgroundColor: "#f5f6fa",
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
    flexDirection: "row",
    padding: 20,
  },

  textStyle: {
    fontSize: 36,
    fontWeight: "600",
    textAlign: "center",
    color: "#e84118",
    marginTop: 20,
    marginBottom: 30,
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
