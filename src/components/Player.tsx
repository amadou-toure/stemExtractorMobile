//import liraries
import React, { Component, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { GlobalStyles, MainColor } from "../style/global.style";
import { Slider } from "@rneui/themed";
import { Pause, Play, RotateCcw, RotateCw } from "lucide-react-native";

import { useSelectedSong } from "../../context/selectedSnongContext";

// Helper function to format time in mm:ss
const formatTime = (duration: number): string => {
  if (!duration || isNaN(duration)) return "00:00";
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${formattedMinutes}:${formattedSeconds}`;
};

const Player = () => {
  const [isPaused, setIsPaused] = useState(true);
  const { position, duration, SeekAll, PlayAll, PauseAll } = useSelectedSong();
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
        <Text style={GlobalStyles.Secondary_text}>{formatTime(position)}</Text>
        <Text style={GlobalStyles.Secondary_text}>{formatTime(duration)}</Text>
      </View>

      <Slider
        value={position}
        onValueChange={(val) => {
          SeekAll(val);
        }}
        minimumValue={0}
        maximumValue={duration || 1}
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
        <TouchableOpacity
          onPress={() => {
            SeekAll(position - 10);
          }}
        >
          <RotateCcw
            style={{ width: 40, height: 40 }}
            color={MainColor.ButtonColor}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            if (isPaused) {
              PlayAll();
              setIsPaused(false);
            } else {
              PauseAll();
              setIsPaused(true);
            }
          }}
        >
          {isPaused ? (
            <Play
              style={{ width: 40, height: 40 }}
              color={MainColor.ButtonColor}
            />
          ) : (
            <Pause
              style={{ width: 40, height: 40 }}
              color={MainColor.ButtonColor}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            SeekAll(position + 10);
          }}
        >
          <RotateCw
            style={{ width: 40, height: 40 }}
            color={MainColor.ButtonColor}
          />
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
