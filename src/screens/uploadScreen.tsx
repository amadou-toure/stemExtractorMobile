//import liraries
import React, { Component, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
import { GlobalStyles, MainColor } from "../style/global.style";
import { Upload } from "lucide-react-native";
import * as DocumentPicker from "expo-document-picker";
import { useLoading } from "../../context/loadingContext";
import { UnmixService } from "../services/unmixService";
import { ApiResponse } from "../types/types";

// create a component
const UploadScreen = () => {
  const { loading, setLoading } = useLoading();
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
        : console.error("error during file picking");
    }
  };
  const handleUnmix = async () => {
    const file = new FormData();
    setLoading(true);
    try {
      if (selectedFile) {
        file.append("file", {
          uri: selectedFile.uri,
          name: selectedFile.name,
          type: selectedFile.mimeType || "audio/mpeg",
        } as any);
        setSelectedFile(null);
      }
      const jobId: Promise<ApiResponse> = await UnmixService.UploadFile(file);
      Alert.alert(
        "file uploaded with success!",
        "JobId: " + (await jobId).data.jobId
      );
      console.log(
        "file uploaded with success!",
        "JobId: " + (await jobId).data.jobId
      );
    } catch (err: any) {
      Alert.alert("error:", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View
      style={[GlobalStyles.container, { backgroundColor: MainColor.bgColor }]}
    >
      <Button title="loading" onPress={() => setLoading(true)} />
      {selectedFile ? (
        <>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              backgroundColor: MainColor.SecondaryColor,
              height: "40%",
              width: "80%",
              borderRadius: 20,
            }}
          >
            <Text style={GlobalStyles.Large_text}>{selectedFile?.name}</Text>
            <Text style={GlobalStyles.Large_text}>
              {selectedFile?.size / 1000000} mb
            </Text>
          </View>
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              backgroundColor: MainColor.AccentColor,
              height: "10%",
              width: "80%",
              marginTop: 20,
              borderRadius: 20,
            }}
            onPress={handleUnmix}
          >
            <Text style={GlobalStyles.Title_text}>Separate</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity
          onPress={pickFile}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: MainColor.SecondaryColor,
            height: "40%",
            width: "80%",
            borderRadius: 20,
          }}
        >
          <Upload color={MainColor.AccentColor} size={150} />
          <Text style={GlobalStyles.Primary_text}>
            Click here to select a file
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

//make this component available to the app
export default UploadScreen;
