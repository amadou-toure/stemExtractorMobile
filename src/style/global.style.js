import { StyleSheet } from "react-native";
import { Platform } from "expo-modules-core";

const MainColor = {
  PrimaryColor: "#EBE6E4",
  SecondaryColor: "#1B263B", //"#FF7878"
  ThirdColor: "#121212", //grey bottom nav color
  ButtonColor: "#fff",
  AccentColor: "#3B82F6",
  bgColor: "#0D1B2A",
  tabBarColor: "#0F172A",
  TextColor: "#E5E7EB",
  InactiveTextColor: "#9CA3AF",
};
const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  Title_text: {
    color: MainColor.PrimaryColor,
    fontSize: 30,
    fontWeight: "800",
    textAlign: "left",
  },
  Primary_text: {
    color: MainColor.TextColor,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "left",
  },
  Secondary_text: {
    color: MainColor.InactiveTextColor,
    fontSize: 14,
    fontWeight: "400",
    textAlign: "left",
  },
  Bold_text: {
    color: MainColor.TextColor,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "left",
  },
  Italic_text: {
    color: MainColor.TextColor,
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "left",
  },
  Centered_text: {
    color: MainColor.TextColor,
    fontSize: 16,
    textAlign: "center",
  },
  Small_text: {
    color: MainColor.TextColor,
    fontSize: 12,
    textAlign: "left",
  },
  Large_text: {
    color: MainColor.TextColor,
    fontSize: 20,
    fontWeight: "600",
    textAlign: "left",
  },
  circularButton: {
    backgroundColor: MainColor.AccentColor,
    borderRadius: 100,
    padding: 5,
  },
});

export { GlobalStyles, MainColor };
