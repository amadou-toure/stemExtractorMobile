//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  Alert,
} from "react-native";
import { GlobalStyles, MainColor } from "../style/global.style";
import { Guitar, Drum, Speaker, Mic, AudioLines } from "lucide-react-native";
import { RenderIconProps, SongStems, StemFile } from "../types/types";
import { useNavigation } from "@react-navigation/native";
import LoadingScreen from "./loadingScreen";
import { historyService } from "../services/historyService";
import { UnmixService } from "../services/unmixService";

// create a component

const HistoryItem = ({ status, song }: { song: SongStems; status: string }) => {
  const handlePress = () => {
    if (status != "done") {
      Alert.alert("pending", "unmixing is pending");
    } else {
      historyService.downloadStem(song);
    }
  };
  const navigator = useNavigation();
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
    <TouchableOpacity style={styles.container} onPress={() => handlePress()}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <View style={{ maxWidth: "100%" }}>
          <Text
            style={[GlobalStyles.Primary_text]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {song.title}
            {song.artist ? " - " + song.artist : null}
          </Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        {status == "done" ? (
          <View>
            {/* <Text style={GlobalStyles.Primary_text}>{song.stems[0].}</Text> */}
            <Text style={GlobalStyles.Primary_text}>03:07</Text>
          </View>
        ) : (
          <View>
            <Text style={GlobalStyles.Primary_text}>Processing ...</Text>
          </View>
        )}
        {status == "done" ? (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",

              width: "30%",
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
            <LoadingScreen type="processing" height={60} width={60} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default HistoryItem;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: MainColor.SecondaryColor,
    height: 120,
    width: "90%",
    borderRadius: 20,
    padding: 15,
    marginBottom: 17,
    flexShrink: 0,
    overflow: "hidden",
  },
});
