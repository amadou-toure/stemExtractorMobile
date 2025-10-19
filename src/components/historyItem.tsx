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
import { GlobalStyles } from "../style/global.style";
import { useSelectedTheme } from "../../context/selectedThemeContext";
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
  const { selectedTheme } = useSelectedTheme();

  const handleLongPress = () => {
    setVisible(true);
  };

  const handleDownload = () => {
    console.log("download");
    setVisible(false);
  };
  const handleDelete = async () => {
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
      style={[
        styles.container,
        { backgroundColor: selectedTheme.SecondaryColor },
      ]}
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
              icon: <Download color={selectedTheme.AccentColor} />,
              onPress: handleDownload,
            },
            {
              label: " Supprimer",
              icon: <Trash color={selectedTheme.AccentColor} />,
              color: "red",
              onPress: () => {
                setVisible(false);
                setConfimationModalVisible(true);
              },
            },
            {
              label: " Fermer",
              icon: <SquareX color={selectedTheme.AccentColor} />,
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
              color: selectedTheme.AccentColor,
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
          <View
            style={[
              styles.iconCircle,
              { backgroundColor: selectedTheme.bgColor },
            ]}
          >
            <Music2Icon color={selectedTheme.AccentColor} />
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
              color={selectedTheme.InactiveTextColor}
              style={styles.iconMarginRight}
            />
            <Text style={GlobalStyles.Secondary_text}>03:25</Text>
          </View>
          <View style={styles.dateContainer}>
            <Calendar
              style={styles.iconMarginRight}
              color={selectedTheme.InactiveTextColor}
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
        <View
          style={[
            styles.bottomContainer,
            { backgroundColor: selectedTheme.bgColor },
          ]}
        >
          <View style={styles.sizeContainer}>
            <Text style={GlobalStyles.Secondary_text}>Taille</Text>
            <Text style={GlobalStyles.Secondary_text}>200 MB</Text>
          </View>
          <View style={styles.iconsContainer}>
            <RenderIcon
              iconName="voice"
              color={selectedTheme.AccentColor}
              size={20}
            />
            <RenderIcon
              iconName="Drum"
              color={selectedTheme.AccentColor}
              size={20}
            />
            <RenderIcon
              iconName="Guitar"
              color={selectedTheme.AccentColor}
              size={20}
            />
            <RenderIcon
              iconName="Bass"
              color={selectedTheme.AccentColor}
              size={20}
            />
            <RenderIcon
              iconName="others"
              color={selectedTheme.AccentColor}
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
    //backgroundColor: "#fff",
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 100,
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
    // backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  durationContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    //backgroundColor: "#fff",
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
    width: "80%",
    borderRadius: 100,
    marginBottom: "5%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  sizeContainer: {
    //backgroundColor: "#fff",
    width: "50%",
    // backgroundColor: "#fff",
    display: "flex",
    paddingHorizontal: "5%",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  iconsContainer: {
    //backgroundColor: "#fff",
    width: "50%",
    display: "flex",
    paddingHorizontal: "5%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
