//import liraries
import React, { Component, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles, MainColor } from "../style/global.style";
import { Slider } from "@rneui/themed";
import { Play, SkipBack, SkipForward } from "lucide-react-native";
import { useAudioPlayer } from "expo-audio";
import { StemFile } from "../types/types";

// create a component
const Player = ({ audioSources }: { audioSources: StemFile[] }) => {
  const [value, setValue] = useState(0);
  console.log("audioSources: ", audioSources[0].uri.replace("file://", ""));
  const player = useAudioPlayer(audioSources[0].uri.replace("file://", ""));
  useEffect(() => {
    player.play();
    console.log("playing... ", player.playing);
  }, [audioSources]);

  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "90%",
        }}
      >
        <Text style={GlobalStyles.Secondary_text}>00:00</Text>
        <Text style={GlobalStyles.Secondary_text}>05:00</Text>
      </View>

      <Slider
        value={value}
        onValueChange={setValue}
        minimumValue={0}
        maximumValue={10}
        minimumTrackTintColor={MainColor.AccentColor}
        maximumTrackTintColor={MainColor.InactiveTextColor}
        style={{ width: "90%", alignSelf: "center" }}
        trackStyle={{ height: 6, borderRadius: 6 }}
        thumbStyle={{
          height: 18,
          width: 18,
          borderRadius: 18,
          backgroundColor: MainColor.AccentColor,
        }}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "70%",
        }}
      >
        <SkipBack
          style={{ width: 40, height: 40 }}
          color={MainColor.ButtonColor}
        />
        <Play style={{ width: 40, height: 40 }} color={MainColor.ButtonColor} />
        <SkipForward
          style={{ width: 40, height: 40 }}
          color={MainColor.ButtonColor}
        />
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
    backgroundColor: MainColor.tabBarColor,
    height: "20%",
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    flexShrink: 0,
  },
});

//make this component available to the app
export default Player;
