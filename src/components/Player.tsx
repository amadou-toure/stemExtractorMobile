//import liraries
import React, { Component, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { GlobalStyles } from "../style/global.style";
import { useSelectedTheme } from "../../context/selectedThemeContext";

import Slider from "@react-native-community/slider";

import {
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  SkipBack,
  SkipForward,
} from "lucide-react-native";

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
  const { selectedTheme } = useSelectedTheme();
  return (
    <View
      style={[styles.container, { backgroundColor: selectedTheme.tabBarColor }]}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "80%",
        }}
      >
        <Text style={GlobalStyles.Secondary_text}>{formatTime(position)}</Text>
        <Text style={GlobalStyles.Secondary_text}>{formatTime(duration)}</Text>
      </View>
      <Slider
        style={{ width: "90%", height: 30 }}
        minimumValue={0}
        maximumValue={duration || 1}
        value={position}
        onValueChange={(value) => {
          SeekAll(value);
        }}
        thumbTintColor={selectedTheme.AccentColor}
        minimumTrackTintColor={selectedTheme.AccentColor}
        maximumTrackTintColor={selectedTheme.InactiveTextColor}
      />

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "80%",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            SeekAll(position - 10);
          }}
        >
          <SkipBack
            style={{ width: 40, height: 40 }}
            color={selectedTheme.ButtonColor}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 100,
            backgroundColor: selectedTheme.SecondaryColor,
            height: 70,
            width: 70,
          }}
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
              color={selectedTheme.ButtonColor}
            />
          ) : (
            <Pause
              style={{ width: 40, height: 40 }}
              color={selectedTheme.ButtonColor}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            SeekAll(position + 10);
          }}
        >
          <SkipForward
            style={{ width: 40, height: 40 }}
            color={selectedTheme.ButtonColor}
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
    backgroundColor: "#222", // fallback, will be overridden by style prop
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
