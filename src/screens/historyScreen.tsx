//import liraries

import { useState, useEffect } from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles, MainColor } from "../style/global.style";
import { Plus, SquareDashed } from "lucide-react-native";
import HistoryItem from "../components/historyItem";
import { SongStems } from "../types/types";
import { historyService } from "../services/historyService";
import { UnmixService } from "../services/unmixService";

// create a component
const HistoryScreen = () => {
  const navigator = useNavigation();

  const [data, setData] = useState<SongStems[]>([]);
  const checkStatus = async (item: SongStems) => {
    if (item.status === "processing") {
      const response = await UnmixService.CheckStatus(item.id);
      const status = response.data;
      const interval = setInterval(async () => {
        if (status === "done" || status === "not_found") {
          setData((prevData) =>
            prevData.map((d) =>
              d.id === item.id ? { ...d, status: "done" } : d
            )
          );
          clearInterval(interval);
        } else {
          console.log(status);
        }
      }, 5000);
      return () => clearInterval(interval);
    }
  };

  useEffect(() => {
    historyService.readHistory().then((history: SongStems[]) => {
      setData(history);

      history.forEach((element) => {
        checkStatus(element); // 🔹 On appelle bien la fonction ici
      });
    });
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <View
      style={{
        width: "100%",
      }}
    >
      <HistoryItem status={item.status} song={item} />
    </View>
  );

  return (
    <View
      style={[
        GlobalStyles.container,
        {
          backgroundColor: MainColor.bgColor,
          paddingTop: "20%",
        },
      ]}
    >
      <FlatList
        //contentContainerStyle={GlobalStyles.container}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
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
      <TouchableOpacity
        style={[
          { position: "absolute", zIndex: 10, left: 10, bottom: 10 },
          GlobalStyles.circularButton,
        ]}
        onPress={() => historyService.deleteHistoryItem()}
      >
        <SquareDashed color={MainColor.SecondaryColor} size={50} />
      </TouchableOpacity>
    </View>
  );
};

// define your styles
//make this component available to the app
export default HistoryScreen;
