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
import {
  Guitar,
  Drum,
  Speaker,
  Mic,
  AudioLines,
  Calendar,
  Clock,
  Music2Icon,
} from "lucide-react-native";
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
      {/* view contenant le titre de la chanson, la duree et la date */}
      <View style={styles.topContainer}>
        <View style={styles.titleRow}>
          <View style={styles.iconCircle}>
            <Music2Icon color={MainColor.AccentColor} />
          </View>
          <View style={styles.titleContainer}>
            <Text
              style={GlobalStyles.Primary_text}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {song.title}
            </Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.durationContainer}>
            <Clock
              color={MainColor.InactiveTextColor}
              style={styles.iconMarginRight}
            />
            <Text style={GlobalStyles.Secondary_text}>03:25</Text>
          </View>
          <View style={styles.dateContainer}>
            <Calendar
              style={styles.iconMarginRight}
              color={MainColor.InactiveTextColor}
            />
            <Text style={GlobalStyles.Secondary_text}>
              {song.creationDate
                ? new Date(song.creationDate).toLocaleDateString()
                : "—"}
            </Text>
          </View>
        </View>
      </View>
      {song.status != "done" && song.status != "not_found" ? (
        <LoadingScreen type="processing" height={80} width={100} />
      ) : (
        <View style={styles.bottomContainer}>
          <View style={styles.sizeContainer}>
            <Text style={GlobalStyles.Secondary_text}>Taille</Text>
            <Text style={GlobalStyles.Secondary_text}>200 MB</Text>
          </View>
          <View style={styles.iconsContainer}>
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
        </View>
      )}
      {/* view contenant la taille et le nombre de stem(afficher chaques icones pour chaques stem ) */}
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
    height: 160,
    width: "100%",
    borderRadius: 20,
    paddingTop: 15,
    marginBottom: 17,
    flexShrink: 0,
    //overflow: "hidden",
  },
  topContainer: {
    display: "flex",
    width: "100%",
    height: "50%",
    flexDirection: "column",
    //marginHorizontal: "5%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  titleRow: {
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    justifyContent: "flex-start",
    //backgroundColor: MainColor.bgColor,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: MainColor.bgColor,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    //flexShrink: 0, // ne se réduit pas
  },
  titleContainer: {
    width: "80%",
  },
  infoRow: {
    display: "flex",
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: "5%",
    // backgroundColor: MainColor.AccentColor,
    justifyContent: "space-between",
  },
  durationContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    //backgroundColor: MainColor.PrimaryColor,
    width: "50%",
    justifyContent: "flex-start",
  },
  iconMarginRight: {
    marginRight: "5%",
  },
  dateContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
    justifyContent: "flex-end",
  },
  bottomContainer: {
    backgroundColor: MainColor.tabBarColor,
    width: "80%",

    borderRadius: 100,
    marginBottom: "5%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  sizeContainer: {
    //backgroundColor: MainColor.ButtonColor,
    width: "50%",
    // backgroundColor: MainColor.AccentColor,
    display: "flex",
    paddingHorizontal: "5%",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  iconsContainer: {
    //backgroundColor: MainColor.ButtonColor,
    width: "50%",
    display: "flex",
    paddingHorizontal: "5%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
