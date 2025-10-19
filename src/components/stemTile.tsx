//import liraries
import React, { Component, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { StemFile } from "../types/types";
import { GlobalStyles } from "../style/global.style";
import { useSelectedTheme } from "../../context/selectedThemeContext";
import {
  AudioLines,
  Drum,
  Mic,
  Speaker,
  Volume2,
  VolumeOff,
} from "lucide-react-native";

import Slider from "@react-native-community/slider";
import { useSelectedSong } from "../../context/selectedSnongContext";

// create a component
const StemTile = ({
  file,
  volume,
  setVolume,
}: {
  file: StemFile;
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [isMuted, setMute] = useState(true);
  const { selectedTheme } = useSelectedTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: selectedTheme.SecondaryColor },
      ]}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "15%",
          }}
        >
          {file.name === "vocals.wav" ? (
            <Mic color={selectedTheme.ButtonColor} />
          ) : file.name === "bass.wav" ? (
            <Speaker color={selectedTheme.ButtonColor} />
          ) : file.name === "drums.wav" ? (
            <Drum color={selectedTheme.ButtonColor} />
          ) : (
            <AudioLines color={selectedTheme.ButtonColor} />
          )}
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "60%",
          }}
        >
          <Text style={GlobalStyles.Large_text}>{file.name}</Text>
          <Slider
            value={volume}
            onValueChange={setVolume}
            minimumValue={0.0001}
            maximumValue={1.0}
            thumbTintColor={selectedTheme.AccentColor}
            minimumTrackTintColor={selectedTheme.AccentColor}
            maximumTrackTintColor={selectedTheme.InactiveTextColor}
            style={{
              width: "100%",
              height: 40, // augmente la hauteur globale
              alignSelf: "center",
            }}
          />
        </View>
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "15%",
          }}
          onPress={() => {
            if (isMuted) {
              setMute(false);
              setVolume(0.0001);
            } else {
              setMute(true);
              setVolume(1);
            }
          }}
        >
          {isMuted ? (
            <Volume2 color={selectedTheme.ButtonColor} />
          ) : (
            <VolumeOff color={selectedTheme.ButtonColor} />
          )}
        </TouchableOpacity>
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
    // backgroundColor is set dynamically using selectedTheme.SecondaryColor
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
