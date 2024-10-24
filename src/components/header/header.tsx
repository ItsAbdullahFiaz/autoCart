import { Text, View, Image } from "react-native";
import AppButton from "../button/Button";
import { useAuthStore, useUserStore } from "@/store";
import { TouchableOpacity } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { assets } from "@/index";
import { DrawerActions } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { profileInfo } from "@/utils";

const Header = () => {
  const token = useAuthStore((state) => state.token);
  const router = useRouter();
  const user = useUserStore((state) => state);

  const handleCreateAd = () => {
    router.push({
      pathname: "(app)/createAd",
    });
  };
  const navigation = useNavigation();
  const handleDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };
  const handleViewProfle = (value) => {
    router.push({
      pathname: "(app)/sellerProfile",
      params: {
        _id: profileInfo?._id,
        id: profileInfo?.id,
        name: profileInfo?.name,
        profileImage: profileInfo?.profileImage,
        cars: profileInfo?.backgroundImage,
        location: profileInfo?.address,
        isSeller: profileInfo.isSeller,
      },
    });
  };
  return (
    <View className=" px-4 flex-row justify-between w-[100%] ">
      <View className="flex-row align-center">
        {token == "Guest" ? (
          <TouchableOpacity onPress={() => handleDrawer()}>
            <Image source={assets.menuIcon} style={styles.menuIcon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleViewProfle}>
            <Image
              source={{ uri: profileInfo.profileImage }}
              className="rounded-3xl h-16 w-16 self-center"
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
        <View className="px-2 mt-1">
          <Text
            className="text-gray text-xs font-gilroySemibold"
            allowFontScaling={false}
          >
            Welcome
          </Text>
          <View className="flex-row justify-center">
            <Text
              className="gilroy18SemiBold font-gilroySemibold"
              allowFontScaling={false}
            >
              {user.username}
            </Text>
            <Image
              source={assets.wavingHand}
              resizeMode="contain"
              style={styles.wavingIcon}
            />
          </View>
        </View>
      </View>
      <View className="flex-row items-center">
        <AppButton
          buttonStyle="bg-green rounded-xl justify-center  p-1 h-11 align-center px-5 mr-3"
          title="Place Ad"
          textStyle="text-white font-gilroySemibold"
          onPress={handleCreateAd}
        />
        {token == "Admin" ? (
          <TouchableOpacity onPress={() => handleDrawer()}>
            <Image source={assets.menuIcon} style={styles.menuIcon} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  menuIcon: { height: 50, width: 50 },
  wavingIcon: { height: 22, width: 22 },
});
