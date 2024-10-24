import { assets } from "@/index";
import { renderMessagesProps } from "@/models/types.home";
import { messages } from "@/utils/constants";
import style from "@/utils/style";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const Message: React.FC = () => {
  const renderMessages: ListRenderItem<renderMessagesProps> = ({ item }) => {
    return (
      <TouchableOpacity
        className="py-4 px-2 flex-row  mx-2 rounded-xl my-2 justify-center "
        activeOpacity={0.8}
        style={styles.elevation}
      >
        <View className="px-1">
          <Image
            source={item?.profileImage}
            className="h-16 w-16 rounded-2xl"
          />
          <Image
            source={item?.carImage}
            className="absolute h-8 w-8 top-10 left-12 border-white border-2 rounded-xl"
          />
        </View>
        <View className="flex-row justify-between flex-1 ">
          <View className="pl-4 justify-evenly  flex-initial ">
            <Text className="text-base font-gilroySemibold ">{item?.name}</Text>

            <Text
              className="text-gray font-gilroyMedium text-xs"
              numberOfLines={1}
            >
              {item?.messages?.pop?.()}
            </Text>
          </View>
          <View className="items-center justify-evenly ">
            <Text className="font-gilroySemibold text-xs">{item?.time}</Text>

            <View className="h-6 w-6 bg-green rounded-3xl items-center justify-center self-end">
              <Text className="text-white text-xxs ">
                {item?.messages.length}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1  bg-white">
      <View className="flex-row items-center gap-3 mx-5 my-5">
        <Image source={assets.messages} className="h-8 w-8" />
        <View className="flex-row flex-1 justify-between items-center">
          <Text className="text-lg font-gilroySemibold">Messages</Text>
          <TouchableOpacity>
            <Image source={assets.discover} className="h-6 w-6" />
          </TouchableOpacity>
        </View>
      </View>

      <FlashList
        contentContainerStyle={styles.containerStyle}
        renderItem={renderMessages}
        data={messages}
      />
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  elevation: {
    shadowColor: style.blackBackground.backgroundColor,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    backgroundColor: style.whiteBackground.backgroundColor,
    elevation: 2,
  },
  containerStyle: { paddingBottom: 20 },
});
