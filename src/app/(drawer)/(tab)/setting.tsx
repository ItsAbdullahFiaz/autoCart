import { unfollowUser, removeFollower } from "@/api";
import AppButton from "@/components/button/Button";
import { UserData } from "@/models/types.home";
import { useUserStore } from "@/store";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { useState } from "react";
import { View, Text, Image } from "react-native";

const Setting: React.FC = () => {
  const user = useUserStore((state) => state);
  const [showFollowers, setShowFollowers] = useState<boolean>(true);
  const listData = showFollowers ? user.followers : user.following;

  const removeUserFollower = async (id: string) => {
    const response = await removeFollower(id);
    user.setFollowers(response.followers);
  };
  const unfollow = async (id: string) => {
    const response = await unfollowUser(id);
    user.setFollowing(response.following);
  };

  const renderItem: ListRenderItem<UserData> = ({ item }) => {
    const buttonTitle = showFollowers ? "Remove" : "unfollow";

    return (
      <View className="flex-row items-center px-6 py-4 justify-between mx-2">
        <View className="flex-row items-center">
          <Image
            source={item?.avatar}
            className="h-10 w-10 mr-5"
            resizeMode="contain"
          />
          <Text
            className="text-base font-gilroyMedium"
            allowFontScaling={false}
          >
            {item.username}
          </Text>
        </View>
        <AppButton
          title={buttonTitle}
          buttonStyle={`bg-borderColor p-3.5 mx-2 rounded-lg w-[28%] justify-center self-end`}
          textStyle={`text-sm font-gilroySemibold`}
          onPress={() =>
            showFollowers ? removeUserFollower(item?._id) : unfollow(item?._id)
          }
        />
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white pt-8">
      <View className="flex-row pb-4 ml-4">
        <AppButton
          title="Followers"
          buttonStyle={`bg-borderColor p-3.5 mx-2 rounded-lg w-[35%] justify-center ${showFollowers ? "border-2 border-cardBorderColor" : null}`}
          textStyle={`text-base ${showFollowers ? "font-gilroyBold" : "font-gilroyMedium"}`}
          onPress={() => setShowFollowers(true)}
        />
        <AppButton
          title="Following"
          buttonStyle={`bg-borderColor p-3.5 mx-2 rounded-lg w-[35%] justify-center ${!showFollowers ? "border-2 border-cardBorderColor" : null}`}
          textStyle={`text-base ${!showFollowers ? "font-gilroyBold" : "font-gilroyMedium"}`}
          onPress={() => setShowFollowers(false)}
        />
      </View>
      <FlashList
        data={listData}
        renderItem={renderItem}
        keyExtractor={(i, index) => {
          return i._id;
        }}
        estimatedItemSize={100}
      />
    </View>
  );
};

export default Setting;
