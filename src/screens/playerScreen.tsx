//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useSelectedSong } from "../../context/selectedSnongContext";
import { GlobalStyles } from "../style/global.style";
import { useSelectedTheme } from "../../context/selectedThemeContext";
import { Download } from "lucide-react-native";
import stemTile from "../components/stemTile";
import StemTile from "../components/stemTile";
import Player from "../components/Player";

// create a component
const PlayerScreen = () => {
  const { selectedTheme } = useSelectedTheme();
  const {
    setSelectedSong,
    selectedSong,
    BassVolume,
    setBassVolume,
    VocalsVolume,
    setVocalsVolume,
    DrumsVolume,
    setDrumsVolume,
    OtherVolume,
    setOtherVolume,
  } = useSelectedSong();

  return (
    <View
      style={[styles.container, { backgroundColor: selectedTheme.bgColor }]}
    >
      {selectedSong ? (
        <View
          style={{
            width: "100%",
            display: "flex",
            height: "100%",
            paddingTop: "20%",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "90%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              // backgroundColor: selectedTheme.AccentColor,
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "80%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",

                alignItems: "center",
              }}
            >
              <Text style={[GlobalStyles.Primary_text]}>
                {selectedSong.title}
              </Text>
            </View>
            <TouchableOpacity>
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 10,
                  backgroundColor: selectedTheme.SecondaryColor,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Download color={selectedTheme.AccentColor} />
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "90%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {selectedSong.stems.map((item) => {
              let volume = 1;
              let setVolume: React.Dispatch<
                React.SetStateAction<number>
              > = () => {};

              switch (item.name) {
                case "bass.wav":
                  volume = BassVolume;
                  setVolume = setBassVolume;
                  break;
                case "vocals.wav":
                  volume = VocalsVolume;
                  setVolume = setVocalsVolume;
                  break;
                case "drums.wav":
                  volume = DrumsVolume;
                  setVolume = setDrumsVolume;
                  break;
                case "other.wav":
                  volume = OtherVolume;
                  setVolume = setOtherVolume;
                  break;
                default:
                  console.warn(`Aucun volume associé pour ${item.name}`);
              }

              return (
                <StemTile
                  key={item.name}
                  file={item}
                  volume={volume}
                  setVolume={setVolume}
                />
              );
            })}
          </View>
          <Player />
        </View>
      ) : (
        <Text style={GlobalStyles.Large_text}>"no song loaded"</Text>
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});

//make this component available to the app
export default PlayerScreen;
