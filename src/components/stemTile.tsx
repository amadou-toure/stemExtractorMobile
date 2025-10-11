//import liraries
import React, { Component, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { StemFile } from "../types/types";
import { GlobalStyles, MainColor } from "../style/global.style";
import { AudioLines, Drum, Mic, Speaker, Volume2 } from "lucide-react-native";
//import Slider from "@react-native-community/slider";
import { Slider } from "@rneui/themed";

// create a component
const StemTile = ({ file }: { file: StemFile }) => {
  const [value, setValue] = useState(0);
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
          {file.name === "vocals.wav" ? (
            <Mic color={MainColor.ButtonColor} />
          ) : file.name === "bass.wav" ? (
            <Speaker color={MainColor.ButtonColor} />
          ) : file.name === "drums.wav" ? (
            <Drum color={MainColor.ButtonColor} />
          ) : (
            <AudioLines color={MainColor.ButtonColor} />
          )}
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
            //style={{ width: "100%" }}
            value={value}
            onValueChange={setValue}
            minimumValue={0}
            maximumValue={10}
            minimumTrackTintColor={MainColor.AccentColor}
            maximumTrackTintColor={MainColor.InactiveTextColor}
            style={{ width: "100%", alignSelf: "center" }}
            trackStyle={{ height: 6, borderRadius: 6 }}
            thumbStyle={{
              height: 18,
              width: 18,
              borderRadius: 18,
              backgroundColor: MainColor.AccentColor,
            }}
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
    justifyContent: "space-between",
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
