import { assets } from "@/index";
import { MenuItem } from "@/models/types.home";
import { useAuthStore } from "@/store";
import { menuItems } from "@/utils";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native";
import { Image, Text, View } from "react-native";
const CustomDrawer: React.FC = () => {
  const router = useRouter();
  const setToken = useAuthStore((state) => state.setToken);
  const customDrawerItems: ListRenderItem<MenuItem> = ({ item }) => (
    <TouchableOpacity
      key={item?.title}
      onPress={() => {
        router.replace({
          pathname: "(auth)/login",
        });
        setToken(null);
      }}
      className={`flex-row items-center py-2 px-4 ${item?.title === "Logout" ? "mt-6 ml-1" : ""}`}
    >
      <Image
        source={item?.icon}
        className={`mr-2 ${item?.title === "Logout" ? "h-6 w-6" : "h-7 w-7"}`}
        resizeMode="contain"
      />
      <Text className="font-montserratMedium text-black text-base">
        {item?.title}
      </Text>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView className="flex-1">
      <View className="rounded-t l-10 rounded-bl-10 flex-1  bg-white">
        <View className="flex-row pt-14 items-center justify-between px-6">
          <Text className="text-text4xl font-montserratBold text-darkGreen">
            Auto<Text className=" text-black">Cart</Text>
          </Text>
          <Image source={assets.profileDrawer} className="h-14 w-14" />
        </View>
        <View className=" h-[2] bg-cardBorderColor mt-4 w-[88%] self-center" />
        <View className="flex-1 mt-4">
          <FlashList
            data={menuItems}
            renderItem={customDrawerItems}
            keyExtractor={(item) => item?.title}
            estimatedItemSize={50}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default CustomDrawer;
