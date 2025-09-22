//import liraries

import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles, MainColor } from "../style/global.style";
import { Plus } from "lucide-react-native";
import HistoryItem from "../components/historyItem";

// create a component
const HistoryScreen = () => {
  const navigator = useNavigation();

  const data = [
    { id: "1", status: "processing" },
    { id: "2", status: "done" },
    { id: "3", status: "done" },
    { id: "4", status: "done" },
    { id: "5", status: "done" },
  ];

  const renderItem = ({ item }) => (
    <View
      style={{
        width: "100%",
      }}
    >
      <HistoryItem status={item.status} />
    </View>
  );

  return (
    <View
      style={[
        GlobalStyles.container,
        { backgroundColor: MainColor.bgColor, paddingTop: "20%" },
      ]}
    >
      <FlatList
        //contentContainerStyle={GlobalStyles.container}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
        style={{
          flex: 1,
        }}
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
      />

      <TouchableOpacity
        style={[
          { position: "absolute", zIndex: 10, right: 10, bottom: 10 },
          GlobalStyles.circularButton,
        ]}
        onPress={() => navigator.navigate("upload")}
      >
        <Plus color={MainColor.SecondaryColor} size={50} />
      </TouchableOpacity>
    </View>
  );
};

// define your styles
//make this component available to the app
export default HistoryScreen;
