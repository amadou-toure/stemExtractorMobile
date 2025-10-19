import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSelectedTheme } from "../../context/selectedThemeContext";

export default function SettingsScreen() {
  const { selectedTheme, setSelectedTheme, themes } = useSelectedTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: selectedTheme.bgColor }]}
    >
      <Text style={[styles.title, { color: selectedTheme.TextColor }]}>
        Select a Theme
      </Text>
      {Object.entries(themes).map(([key, theme]) => (
        <TouchableOpacity
          key={key}
          style={[
            styles.button,
            {
              backgroundColor:
                selectedTheme === theme
                  ? theme.SecondaryColor
                  : theme.AccentColor,
            },
          ]}
          onPress={() => setSelectedTheme(theme)}
        >
          <Text style={[styles.buttonText, { color: theme.TextColor }]}>
            {key}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  button: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
  },
});
