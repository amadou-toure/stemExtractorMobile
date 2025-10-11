//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useSelectedSong } from "../../context/selectedSnongContext";
import { GlobalStyles, MainColor } from "../style/global.style";
import { Download } from "lucide-react-native";
import stemTile from "../components/stemTile";
import StemTile from "../components/stemTile";
import Player from "../components/Player";

// create a component
const PlayerScreen = () => {
  const { setSelectedSong, selectedSong } = useSelectedSong();

  return (
    <View style={styles.container}>
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
              // backgroundColor: MainColor.AccentColor,
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
                  backgroundColor: MainColor.SecondaryColor,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Download color={MainColor.AccentColor} />
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
            {selectedSong.stems.map((item) => (
              <StemTile key={item.name} file={item} />
            ))}
          </View>
          <Player audioSources={selectedSong.stems} />
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

    backgroundColor: MainColor.bgColor,
    height: "100%",
  },
});

//make this component available to the app
export default PlayerScreen;
