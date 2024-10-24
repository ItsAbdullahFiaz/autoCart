import AppButton from "@/components/button/Button";
import { assets } from "@/index";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import {
  useCameraPermissions,
  PermissionStatus,
  PermissionResponse,
} from "expo-camera";
import { useRouter } from "expo-router";
import * as Linking from "expo-linking";
import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { shadow } from "@/utils";
import style from "@/utils/style";
const Scan: React.FC = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const router = useRouter();
  const isFocus = useIsFocused();
  useEffect(() => {
    if (isFocus) {
      handlepermission();
    }
  }, [isFocus]);
  const handlePermissionDenied = () => {
    Alert.alert(
      "Permission Denied",
      "Camera permission is required to use this feature. Please enable it in settings.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Open Settings",
          onPress: () => Linking.openSettings(),
        },
      ],
      { cancelable: false },
    );
  };

  const handlepermission = () => {
    requestPermission().then((response: PermissionResponse) => {
      if (response.status !== PermissionStatus.GRANTED) {
        handlePermissionDenied();
      }
    });
  };

  const handleCamera = () => {
    if (permission?.status !== PermissionStatus.GRANTED) {
      handlepermission();
    } else {
      router.push({
        pathname: "(app)/cameraScreen",
      });
    }
  };
  const handleCreateAd = () => {
    router.push({
      pathname: "(app)/createAd",
    });
  };
  return (
    <View className="flex-1">
      <View className="flex-1 bg-white px-4 pt-6">
        <Text className="text-xl font-[Gilroy-SemiBold]">Reg Scanner</Text>
        <View className="h-[220] justify-center items-center bg-white mt-16 mb-10">
          <Image
            source={assets.regScanner}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>
        <View className="mx-3">
          <Text className="text-base font-[Gilroy-Medium] text-center leading-7 tracking-wide text-black">
            This option allows you to check your vehicle details before
            purchasing
          </Text>
          <AppButton
            title="Open Camera"
            buttonStyle={
              "w-[80%] my-3 rounded-xl h-14 self-center dark:bg-appText bg-green my-8"
            }
            textStyle={"gilroybuttonTextStyle text-lg"}
            style={styles.elevation}
            onPress={() => {
              handleCamera();
            }}
          />
          <AppButton
            title="Place Ad Manually"
            buttonStyle={
              "w-[80%] rounded-xl h-14 self-center dark:bg-appText bg-white"
            }
            textStyle={
              "text-base font-[Gilroy-SemiBold] text-center text-black"
            }
            style={shadow}
            onPress={handleCreateAd}
          />
        </View>
      </View>
    </View>
  );
};
export default Scan;
const styles = StyleSheet.create({
  elevation: {
    shadowColor: style.blackBackground.backgroundColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
    padding: 8,
  },
  camera: {
    flex: 1,
  },
});
