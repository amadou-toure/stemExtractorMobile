//import liraries
import React, { Component, useState } from "react";
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
  Download,
  Trash,
  SquareX,
} from "lucide-react-native";
import { RenderIconProps, SongStems, StemFile } from "../types/types";
import { useNavigation } from "@react-navigation/native";
import LoadingScreen from "./loadingScreen";
import { historyService } from "../services/historyService";
import { UnmixService } from "../services/unmixService";
import { useLoading } from "../../context/loadingContext";
import { useSelectedSong } from "../../context/selectedSnongContext";
import CustomModal from "./CustomModal";
import CustomToast from "./CustomToast";

// create a component

const HistoryItem = ({ status, song }: { song: SongStems; status: string }) => {
  const { setLoading } = useLoading();
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { setSelectedSong } = useSelectedSong();
  const [isVisible, setVisible] = useState(false);
  const [isConfimationModalVisible, setConfimationModalVisible] =
    useState(false);

  const handleLongPress = () => {
    setVisible(true);
  };

  const handleDownload = () => {
    console.log("download");
    setVisible(false);
  };
  const handleDelete = async () => {
    console.log("delete");
    setToastMessage(`${song.title} supprimer avec succes !`);
    await historyService.removeHistoryItem(song.id);
    setVisible(false);
    setToastVisible(true);
  };

  const handlePress = async () => {
    if (status != "done") {
      setToastMessage("Traitement toujours en cours, veuilleiz patienter");
      setToastVisible(true);
    } else {
      setToastMessage("chargement du fichier, Veuillez patienter");
      setToastVisible(true);
      await historyService.downloadStem(song).then(() => {
        setSelectedSong(song);
        navigator.navigate(`player`);
      });
    }
  };
  const navigator: any = useNavigation();
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
      style={styles.container}
      onLongPress={handleLongPress}
      onPress={() => handlePress()}
    >
      <View style={styles.topContainer}>
        <CustomModal
          visible={isVisible}
          onClose={() => setVisible(false)}
          title="Options de la chanson"
          options={[
            {
              label: " Télécharger",
              icon: <Download color={MainColor.AccentColor} />,
              onPress: handleDownload,
            },
            {
              label: " Supprimer",
              icon: <Trash color={MainColor.AccentColor} />,
              color: "red",
              onPress: () => {
                setVisible(false);
                setConfimationModalVisible(true);
              },
            },
            {
              label: " Fermer",
              icon: <SquareX color={MainColor.AccentColor} />,
              onPress: () => setVisible(false),
            },
          ]}
        />
        <CustomModal
          visible={isConfimationModalVisible}
          onClose={() => setConfimationModalVisible(false)}
          title="Voulez vous vraiment supprimer cette chanson ?"
          options={[
            {
              label: "Oui",
              onPress: handleDelete,
            },
            {
              label: " Annuler",
              color: MainColor.AccentColor,
              onPress: () => setConfimationModalVisible(false),
            },
          ]}
        />
        <CustomToast
          visible={toastVisible}
          message={toastMessage}
          type={"info"}
          onHide={() => setToastVisible(false)}
        />
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
