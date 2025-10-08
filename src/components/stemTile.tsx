//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { StemFile } from "../types/types";
import { GlobalStyles, MainColor } from "../style/global.style";
import { Mic, Volume2 } from "lucide-react-native";
import { StatusBar } from "expo-status-bar";
import Slider from "@react-native-community/slider";

// create a component
const StemTile = ({ file }: { file: StemFile }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          //backgroundColor: MainColor.AccentColor,
          width: "100%",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            //backgroundColor: MainColor.InactiveTextColor,
            width: "15%",
          }}
        >
          <Mic color={MainColor.ButtonColor} />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            //backgroundColor: MainColor.ButtonColor,
            width: "60%",
          }}
        >
          <Text style={GlobalStyles.Large_text}>{file.name}</Text>
          <Slider
            style={{ width: 200, height: 40 }}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor: MainColor.InactiveTextColor,
            width: "15%",
          }}
        >
          <Volume2 color={MainColor.ButtonColor} />
        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: MainColor.SecondaryColor,
    height: 100,
    width: "100%",
    borderRadius: 20,
    paddingTop: 15,
    marginBottom: 17,
    flexShrink: 0,
  },
});

//make this component available to the app
export default StemTile;
