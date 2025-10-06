//import liraries
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { GlobalStyles, MainColor } from "../style/global.style";
import { Upload } from "lucide-react-native";
import * as DocumentPicker from "expo-document-picker";
import { useLoading } from "../../context/loadingContext";
import { UnmixService } from "../services/unmixService";
import { SongStems } from "../types/types";
import { historyService } from "../services/historyService";

// create a component
const UploadScreen = () => {
  const { setLoading } = useLoading();
  const [selectedFile, setSelectedFile] = useState<{
    uri: string;
    name: string;
    size: number;
    mimeType: string | null;
    lastModified: number | null;
  } | null>(null);

  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "audio/*",
    });
    if (result) {
      result.assets
        ? setSelectedFile({
            uri: result.assets[0].uri,
            name: result.assets[0].name,
            size: result.assets[0].size ?? 0,
            mimeType: result.assets[0].mimeType ?? null,
            lastModified: result.assets[0].lastModified ?? null,
          })
        : null;
    }
  };

  const handleUnmix = async () => {
    if (!selectedFile) return;
    const file = new FormData();
    setLoading(true);
    try {
      file.append("file", {
        uri: selectedFile.uri,
        name: selectedFile.name,
        type: selectedFile.mimeType || "audio/mpeg",
      } as any);

      const res = await UnmixService.UploadFile(file);
      if (!res.status) {
        return;
      }
      const jobId = res.data;

      const newSongStem: SongStems = {
        id: String(jobId),
        status: "processing",
        title: selectedFile.name,
        artist: "",
        stems: [],
        creationDate: new Date().toISOString(),
      };
      historyService.addHistoryItem(newSongStem);

      setSelectedFile(null);
    } catch {
      // error handling omitted for brevity
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={[GlobalStyles.container, { backgroundColor: MainColor.bgColor }]}
    >
      {selectedFile ? (
        <>
          <View style={styles.fileInfo}>
            <Text style={GlobalStyles.Large_text}>{selectedFile.name}</Text>
            <Text style={GlobalStyles.Large_text}>
              {(selectedFile.size / 1000000).toFixed(2)} mb
            </Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleUnmix}>
            <Text style={GlobalStyles.Title_text}>Separate</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity style={styles.filePicker} onPress={pickFile}>
          <Upload color={MainColor.AccentColor} size={150} />
          <Text style={GlobalStyles.Primary_text}>
            Click here to select a file
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fileInfo: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: MainColor.SecondaryColor,
    height: "40%",
    width: "80%",
    borderRadius: 20,
  },
  button: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: MainColor.AccentColor,
    height: "10%",
    width: "80%",
    marginTop: 20,
    borderRadius: 20,
  },
  filePicker: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: MainColor.SecondaryColor,
    height: "40%",
    width: "80%",
    borderRadius: 20,
  },
});

//make this component available to the app
export default UploadScreen;
