import LottieView from "lottie-react-native";
import { StyleProp, ViewStyle } from "react-native";

export default function LoadingScreen({
  type,
  height,
  width,
}: {
  type: string;
  height?: any;
  width?: any;
}) {
  if (type == "done") {
    return (
      <LottieView
        source={require("./animation/lottie/done.json")}
        autoPlay
        loop
        style={{
          height: height ?? 200,
          width: width ?? 200,
        }}
      />
    );
  } else {
    return (
      <LottieView
        source={require("./animation/lottie/loading.json")}
        autoPlay
        style={{
          height: height ?? 200,
          width: width ?? 200,
        }}
      />
    );
  }
}
