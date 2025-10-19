import { StyleSheet } from "react-native";
import { Platform } from "expo-modules-core";

//🟣 Effet : fond plus “studio”, accents lumineux et futuristes.
// MainColor = {
//   PrimaryColor: "#F2F2F2", // texte principal clair
//   SecondaryColor: "#141B2D", // fond des cartes
//   ThirdColor: "#0B0F19", // fond général
//   ButtonColor: "#FFFFFF",
//   AccentColor: "#7C3AED", // violet électrique
//   bgColor: "#0B0F19",
//   tabBarColor: "#10172A",
//   TextColor: "#E5E7EB",
//   InactiveTextColor: "#6B7280", // gris doux
// };

//🔵 Effet : une interface plus “aérienne”, inspirée des apps chill (comme Calm ou Tide).
// const MainColor = {
//   PrimaryColor: "#EAF4F4",
//   SecondaryColor: "#1C2D3A",
//   ThirdColor: "#0F1C24",
//   ButtonColor: "#E0FBFC",
//   AccentColor: "#00B4D8", // turquoise lumineux
//   bgColor: "#0A1929",
//   tabBarColor: "#11212D",
//   TextColor: "#E5E7EB",
//   InactiveTextColor: "#94A3B8",
// };

//🟠 Effet : ambiance feutrée et artistique, idéale pour une app de musique créative.
const MainColor = {
  PrimaryColor: "#FFF3E0",
  SecondaryColor: "#1A1A1A",
  ThirdColor: "#121212",
  ButtonColor: "#FFD580",
  AccentColor: "#F97316", // orange doux
  bgColor: "#0E0E0E",
  tabBarColor: "#1C1917",
  TextColor: "#F5F5F5",
  InactiveTextColor: "#9CA3AF",
};

//🟢 Effet : ambiance high-tech, contraste fort, lisibilité maximale.
// const MainColor = {
//   PrimaryColor: "#F8F9FA", // texte principal clair
//   SecondaryColor: "#101014", // fond des cartes
//   ThirdColor: "#08080D", // fond global profond
//   ButtonColor: "#FFFFFF",
//   AccentColor: "#06B6D4", // cyan électrique
//   bgColor: "#0A0A0F",
//   tabBarColor: "#12121C",
//   TextColor: "#E2E8F0",
//   InactiveTextColor: "#6B7280",
// };

//🔵 Effet : moderne, élégant, très bon contraste sur les écrans OLED.
// const MainColor = {
//   PrimaryColor: "#E2E8F0",
//   SecondaryColor: "#1E293B",
//   ThirdColor: "#0F172A",
//   ButtonColor: "#1D4ED8",
//   AccentColor: "#3B82F6", // bleu saphir
//   bgColor: "#0A0F1A",
//   tabBarColor: "#1E293B",
//   TextColor: "#F1F5F9",
//   InactiveTextColor: "#64748B",
// };

//💜 Effet : poétique, inspirant, parfait pour la création musicale.
// const MainColor = {
//   PrimaryColor: "#F5F3FF",
//   SecondaryColor: "#1E1B4B",
//   ThirdColor: "#0F0A36",
//   ButtonColor: "#7C3AED",
//   AccentColor: "#C084FC", // violet clair
//   bgColor: "#0B062A",
//   tabBarColor: "#1E1B4B",
//   TextColor: "#EDE9FE",
//   InactiveTextColor: "#A78BFA",
// };
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
