import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
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

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const AnimatedLinear = animated(LinearGradient);

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState(0);
  const [password, setPassword] = useState("");

  const animProps = useSpring({
    config: { mass: 1, tension: 180, friction: 12 },
    width: styles.textInput.width,
    height: styles.textInput.height,
    opacity: 1,
    from: { opacity: 0, height: 0, width: 0 },
    delay: 400,
  });

  return (
    <View style={styles.container}>
      <Text style={[styles.textStyle, [{ marginBottom: 25, fontSize: 38 }]]}>
        VPOOS
      </Text>
      <View>
        <Text style={styles.textStyle}>Username</Text>
        <AnimatedLinear
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          colors={["#ffa502", "#ff7f50", "#ff6348"]}
          style={[styles.textInput, animProps]}
        >
          <TextInput
            onChangeText={(changedText) => {
              setUsername(changedText);
              console.log(username);
            }}
            style={styles.textInput}
          ></TextInput>
        </AnimatedLinear>
        <Text style={styles.textStyle}>Password</Text>
        <AnimatedLinear
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          colors={["#ffa502", "#ff7f50", "#ff6348"]}
          style={[styles.textInput, animProps]}
        >
          <TextInput
            secureTextEntry={true}
            onChangeText={(changedText) => {
              setPassword(changedText);
              console.log(password);
            }}
            style={styles.textInput}
          ></TextInput>
        </AnimatedLinear>

        <TouchableOpacity
          onPress={async () => {
            await fetch("http://5.189.157.144:8000/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                user: username,
                password: password,
              }),
            })
              .then((res) => {
                return res.json();
              })
              .then((res) => {
                if (res.success == true && res.status == 200) {
                  Alert.alert("Login Successful!");
                  navigation.navigate("Home");
                } else {
                  Alert.alert("Login Failed");
                }
                return res;
              })
              .catch(() => {
                Alert.alert("Error Occured with login process.");
              });
          }}
        >
          <AnimatedLinear
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            colors={["#ffa502", "#ff7f50", "#ff6348"]}
            style={[
              {
                alignSelf: "center",
                width: 100,
                backgroundColor: "transparent",
                marginTop: 50,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: "#e84118",
              },
            ]}
          >
            <Text style={[styles.textStyle, { color: "white" }]}>Login</Text>
          </AnimatedLinear>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f6fa",
  },

  textStyle: {
    fontSize: 16,
    fontWeight: "300",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 10,
    color: "#e84118",
  },

  textInput: {
    width: width * 0.4,
    height: height * 0.04,
    borderStyle: "solid",
    borderColor: "#e84118",
    color: "white",
    borderRadius: 15,
    paddingLeft: 5,
    paddingRight: 5,
  },
});
