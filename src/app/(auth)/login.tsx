import { View, Text, ImageBackground, Image } from "react-native";
import AppButton from "@/components/button/Button";
import { assets } from "assets";
import { useAuthStore, useUserStore } from "@/store";
import { login } from "@/api";
import { router } from "expo-router";

const LoginScreen = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const setUserId = useAuthStore((state) => state.setUserId);

  return (
    <View className="flex-1 bg-white dark:bg-gray-600 ">
      <ImageBackground
        className="flex-1 h-200 w-[100%]"
        source={assets.imgBackground}
      >
        <View className="justify-center	flex-1 dark:bg-gray-600 bg-blackOverlay">
          <View className="h-[40%] justify-center top-10">
            <Text className="text-text6xl text-center text-white font-montserratBold">
              Log in to Autocart
            </Text>
            <Text className="text-sm text-center text-white font-montserratMedium mb-8	mt-5">
              {"Manage your account, check notifications\n and much more"}
            </Text>
          </View>
          <View className="h-[60%]">
            <AppButton
              title="Continue With Email"
              buttonStyle={
                "w-[83%] my-3 rounded-3xl h-14 self-center dark:bg-appText bg-primary "
              }
              textStyle={"montserratbuttonTextStyle w-[70%] text-left"}
              onPress={async () => {
                const response = await login({
                  email: "user@example.com",
                  password: "password123",
                });
                setToken(response.user.authentication.sessionToken);
                setUserId(response.user._id);
                // router.push('')
              }}
              leftIcon={assets.email}
              leftIconStyle={"h-8 w-8  ml-6 mr-8"}
            />
            <AppButton
              title="Continue With Facebook"
              buttonStyle={
                "w-[83%] my-3 rounded-3xl	h-14 self-center dark:bg-appText bg-blue"
              }
              textStyle={"montserratbuttonTextStyle w-[70%] text-left"}
              onPress={() => {
                setToken("Admin");
              }}
              leftIcon={assets.facebook}
              leftIconStyle={"h-8 w-8 ml-6 mr-8"}
            />
            <AppButton
              title="Continue With Apple"
              buttonStyle={
                "w-[83%] my-3 rounded-3xl	h-14 self-center dark:bg-appText bg-white"
              }
              textStyle={
                "montserratbuttonTextStyle w-[70%] text-black text-left"
              }
              onPress={() => {
                setToken("Admin");
              }}
              leftIcon={assets.apple}
              leftIconStyle={"h-8 w-8 ml-6 mr-8"}
            />
            <AppButton
              title="Continue With Gmail"
              buttonStyle={
                "w-[83%] my-3 rounded-3xl	h-14 self-center dark:bg-appText bg-red"
              }
              textStyle={"montserratbuttonTextStyle w-[70%] text-left "}
              onPress={() => {
                setToken("Admin");
              }}
              leftIcon={assets.gmail}
              leftIconStyle={"h-8 w-8 ml-6 mr-8"}
            />
            <View className="mt-16 my-4 flex-row items-center	ml-2 mr-2 self-center">
              <Image source={assets.ellipseLine} className="h-[1] w-[40%]" />
              <Text className="text-sm text-center text-white font-[Montserrat-ExtraBold] ml-4 mr-4">
                OR
              </Text>
              <Image source={assets.ellipseLine} className="h-[1] w-[40%]" />
            </View>
            <AppButton
              title="Continue As a Guest"
              buttonStyle={
                "w-[75%] my-3 rounded-3xl	h-14 self-center dark:bg-appText border-2 border-white bg-whiteOverlay justify-center "
              }
              textStyle={"montserratbuttonTextStyle "}
              onPress={() => {
                setToken("Guest");
              }}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
