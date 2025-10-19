import React, { ReactNode } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { GlobalStyles } from "../style/global.style";
import { useSelectedTheme } from "../../context/selectedThemeContext";

type Option = {
  label: string;
  color?: string;
  icon?: ReactNode;
  onPress: () => void;
};

type CustomModalProps = {
  visible: boolean;
  onClose: () => void;
  title: string;
  options: Option[];
};

const CustomModal = ({
  visible,
  onClose,
  title,
  options,
}: CustomModalProps) => {
  const { selectedTheme } = useSelectedTheme();
  return (
    <>
      <Modal
        isVisible={visible}
        onBackdropPress={onClose}
        animationIn="fadeIn"
        animationOut="fadeOut"
      >
        <View
          style={{
            backgroundColor: selectedTheme.SecondaryColor,
            borderRadius: 15,
            padding: 20,
          }}
        >
          <Text
            style={{
              color: selectedTheme.TextColor,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            {title}
          </Text>

          {options.map((option, index) => (
            <TouchableOpacity
              style={{
                display: "flex",
                flexDirection: "row",
                width: "40%",
                justifyContent: "space-between",
                alignItems: "center",
                margin: 15,
              }}
              key={index}
              onPress={option.onPress}
            >
              {option.icon}
              <Text
                style={[
                  GlobalStyles.Primary_text,
                  option.color ? { color: option.color } : {},
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </>
  );
};
export default CustomModal;
