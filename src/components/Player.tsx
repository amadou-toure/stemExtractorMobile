//import liraries
import React, { Component, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { GlobalStyles, MainColor } from "../style/global.style";
import { Slider } from "@rneui/themed";
import {
  Play,
  RotateCcw,
  RotateCw,
  SkipBack,
  SkipForward,
} from "lucide-react-native";
import { useAudioPlayer } from "expo-audio";
import { StemFile } from "../types/types";

// Helper function to format time in mm:ss
const formatTime = (duration: number): string => {
  if (!duration || isNaN(duration)) return "00:00";
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${formattedMinutes}:${formattedSeconds}`;
};

const Player = ({ audioSources }: { audioSources: StemFile[] }) => {
  const Bassplayer = useAudioPlayer({
    uri: audioSources[0].uri.replace("file://", ""),
  });
  const Otherplayer = useAudioPlayer({
    uri: audioSources[2].uri.replace("file://", ""),
  });
  const Drumplayer = useAudioPlayer({
    uri: audioSources[1].uri.replace("file://", ""),
  });
  const Voiceplayer = useAudioPlayer({
    uri: audioSources[3].uri.replace("file://", ""),
  });
  const PlayAll = () => {
    Bassplayer.play();
    Otherplayer.play();
    Drumplayer.play();
    Voiceplayer.play();
  };
  const PauseAll = () => {
    Bassplayer.pause();
    Otherplayer.pause();
    Drumplayer.pause();
    Voiceplayer.pause();
  };
  const SeekAll = (val: number) => {
    PauseAll();
    Bassplayer.seekTo(val);
    Otherplayer.seekTo(val);
    Drumplayer.seekTo(val);
    Voiceplayer.seekTo(val);
    PlayAll();
  };
  const handlePlayButton = () => {
    PlayAll();
  };
  const handleSkipBackButton = () => {
    SeekAll(position - 5);
  };
  const handleSkipForwardButton = () => {
    SeekAll(position + 5);
  };
  const [position, setPosition] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => {
        if (Bassplayer.playing) {
          return Bassplayer.currentTime;
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
        <Text style={GlobalStyles.Secondary_text}>
          {formatTime(Bassplayer.duration)}
        </Text>
      </View>

      <Slider
        value={Bassplayer.currentTime}
        onValueChange={(val) => {
          SeekAll(val);
        }}
        minimumValue={0}
        maximumValue={Bassplayer.duration || 1}
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
        <TouchableOpacity onPress={handleSkipBackButton}>
          <RotateCcw
            style={{ width: 40, height: 40 }}
            color={MainColor.ButtonColor}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePlayButton}>
          <Play
            style={{ width: 40, height: 40 }}
            color={MainColor.ButtonColor}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSkipForwardButton}>
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
