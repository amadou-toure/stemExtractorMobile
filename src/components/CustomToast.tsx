import React, { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";
import { useSelectedTheme } from "../../context/selectedThemeContext";
import { CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react-native";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  visible: boolean;
  message: string;
  type?: ToastType;
  duration?: number; // durée d’affichage en ms
  onHide?: () => void;
}

const CustomToast = ({
  visible,
  message,
  type = "info",
  duration = 2500,
  onHide,
}: ToastProps) => {
  const { selectedTheme } = useSelectedTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const iconMap = {
    success: <CheckCircle color="#22c55e" size={20} />,
    error: <XCircle color="#ef4444" size={20} />,
    warning: <AlertTriangle color="#facc15" size={20} />,
    info: <Info color="#3b82f6" size={20} />,
  };

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          onHide?.();
        });
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      style={{
        position: "absolute",
        bottom: 50,
        left: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: selectedTheme.SecondaryColor,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: "row",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5,
        opacity: fadeAnim,
      }}
    >
      {iconMap[type]}
      <Text
        style={{
          color: selectedTheme.TextColor,
          marginLeft: 10,
          fontWeight: "600",
        }}
      >
        {message}
      </Text>
    </Animated.View>
  );
};

export default CustomToast;
