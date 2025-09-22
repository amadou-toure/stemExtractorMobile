import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UploadScreen from "./src/screens/uploadScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Upload, Clock, PlayCircle, Settings } from "lucide-react-native";
import HystoryScreen from "./src/screens/historyScreen";
import { GlobalStyles, MainColor } from "./src/style/global.style";
import PlayerScreen from "./src/screens/playerScreen";
import SettingsScreen from "./src/screens/settingsScreen";
import { LoadingProvider, useLoading } from "./context/loadingContext";
import LoadingScreen from "./src/components/loadingScreen";

export default function Root() {
  return (
    <LoadingProvider>
      <App />
    </LoadingProvider>
  );
}

function App() {
  const Tab = createBottomTabNavigator();
  const { loading } = useLoading();

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      {loading ? (
        <View
          style={[
            GlobalStyles.container,
            { backgroundColor: MainColor.bgColor },
          ]}
        >
          <LoadingScreen />
        </View>
      ) : (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let IconComponent = null;
              if (route.name === "hystory") {
                IconComponent = Clock;
              } else if (route.name === "upload") {
                IconComponent = Upload;
              } else if (route.name === "player") {
                IconComponent = PlayCircle;
              } else if (route.name === "settings") {
                IconComponent = Settings;
              }
              if (!IconComponent) return null;
              return <IconComponent color={color} size={size} />;
            },
            tabBarItemStyle: {
              justifyContent: "center",
              alignItems: "center",
            },
            tabBarStyle: {
              backgroundColor: MainColor.tabBarColor,
              height: 70,
              display: "flex",
              flexDirection: "row",
              //alignItems: "center",
              justifyContent: "center",
            },
            tabBarActiveTintColor: MainColor.AccentColor,
            headerShown: false,
            tabBarInactiveTintColor: MainColor.InactiveTextColor,
          })}
        >
          <Tab.Screen name="hystory" component={HystoryScreen} />
          <Tab.Screen name="upload" component={UploadScreen} />
          <Tab.Screen name="player" component={PlayerScreen} />
          <Tab.Screen name="settings" component={SettingsScreen} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}
