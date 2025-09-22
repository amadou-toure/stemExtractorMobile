//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { GlobalStyles, MainColor } from "../style/global.style";
import { Guitar, Drum, Speaker, Mic, AudioLines } from "lucide-react-native";
import { RenderIconProps } from "../types/types";
import LoadingScreen from "./loadingScreen";

// create a component

const HistoryItem = ({ status }: { status: string }) => {
  const RenderIcon: React.FC<RenderIconProps> = ({ iconName, size, color }) => {
    let InstrumentIcon: any = null;
    if (iconName === "Guitar") {
      InstrumentIcon = Guitar;
    } else if (iconName === "Bass") {
      InstrumentIcon = Speaker;
    } else if (iconName === "Drum") {
      InstrumentIcon = Drum;
    } else if (iconName === "voice") {
      InstrumentIcon = Mic;
    } else {
      InstrumentIcon = AudioLines;
    }
    return InstrumentIcon ? <InstrumentIcon color={color} size={size} /> : null;
  };

  return (
    <TouchableOpacity
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "stretch",
        backgroundColor: MainColor.SecondaryColor,
        height: 100,
        width: "100%",
        borderRadius: 20,
        padding: 15,
        margin: 7,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={GlobalStyles.Primary_text}>
            Starship Syncopation - Cory Wong
          </Text>
        </View>
        <View>
          <Text style={GlobalStyles.Primary_text}>Wav</Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={GlobalStyles.Primary_text}>03:20</Text>
        </View>
        {status == "done" ? (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "40%",
            }}
          >
            <RenderIcon
              iconName="voice"
              color={MainColor.AccentColor}
              size={20}
            />
            <RenderIcon
              iconName="Drum"
              color={MainColor.AccentColor}
              size={20}
            />
            <RenderIcon
              iconName="Guitar"
              color={MainColor.AccentColor}
              size={20}
            />
            <RenderIcon
              iconName="Bass"
              color={MainColor.AccentColor}
              size={20}
            />
            <RenderIcon
              iconName="others"
              color={MainColor.AccentColor}
              size={20}
            />
          </View>
        ) : (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "30%",
            }}
          >
            <LoadingScreen type="loading" height={100} width={100} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default HistoryItem;
