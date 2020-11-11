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

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function CarScroll() {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
      horizontal={true}
    >
      {makes.map((make) => {
        return (
          <MakeCard
            make={make.replace(make.charAt(0), make.charAt(0).toUpperCase())}
          ></MakeCard>
        );
      })}
    </ScrollView>
  );
}
