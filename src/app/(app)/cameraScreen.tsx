import AppButton from "@/components/button/Button";
import { View, StyleSheet, Alert, Text, ActivityIndicator } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { shadow } from "@/utils";
import axios from "axios";
import { useRef, useState } from "react";
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera'

const getMimeType = (uri: string) => {
  const extension = uri.split('.').pop().toLowerCase();

  switch (extension) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    default:
      return 'application/octet-stream'; // Fallback for unknown types
  }
};

const CameraScreen: React.FC = () => {

  const [loading, setLoading] = useState(false)
  const router = useRouter();
  const navigation = useNavigation();

  const device = useCameraDevice('back')
  const cameraRef = useRef()

  const fetchRegNo = async (url: string) => {
    try {
      const fileType = getMimeType(url);

      const formData = new FormData();
      formData.append('image', {
        uri: url,
        type: fileType,
        name: url.split('/').pop(),
      });

      const response = await axios.post(
        'http://192.168.1.12:8080/car/extract-registration',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setLoading(false)
      if (response.status == 200) {
        Alert.alert(`Your regestration number is: ${response?.data?.data?.registrationNumber}`, "We are unable to retrive so continuing with test number")
        global.registrationNo = response?.data?.data?.registrationNumber
        router.push({
          pathname: "(app)/scanDetail",
        });
      }
      else {
        Alert.alert("Unable to get regestration number at this moment")
        navigation.goBack();
      }
    } catch (error) {
      console.log("error:", error)
      setLoading(false)
    }
  }

  const onClickPicture = async () => {
    const photo = await cameraRef.current.takePhoto()
    fetchRegNo("file://" + photo.path)
  }

  return (
    <>
      <View className="flex-1">
        <Camera
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          device={device}
          photo={true}
          isActive
        />
        {loading &&
          <View className="my-2 w-[100%]" style={{ height: '100%', justifyContent: 'center', alignContent: 'center', position: 'absolute', zIndex: 1 }}>
            <ActivityIndicator size={150} />
          </View>
        }
        <View className="my-2 w-[100%]" style={{ position: 'absolute', bottom: 0, zIndex: 1 }}>
          <AppButton
            title="View Detail"
            buttonStyle={
              "w-[80%] rounded-xl	h-14 self-center dark:bg-appText bg-green"
            }
            textStyle={"text-base font-gilroySemibold text-center text-white"}
            style={shadow}
            onPress={() => {
              setLoading(true)
              onClickPicture()
            }}
          />
        </View>
      </View>
    </>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
});
