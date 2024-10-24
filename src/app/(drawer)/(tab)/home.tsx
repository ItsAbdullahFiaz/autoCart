import React, { useEffect, useRef, useState } from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import AppButton from "@/components/button/Button";
import Profiles from "@/components/profiles/profiles";
import { useRouter } from "expo-router";
import { carData, deviceHeight } from "@/utils/constants";
import Eye from "react-native-vector-icons/Feather";
import { assets } from "assets";
import { CarDetailProps } from "@/models/types.home";
import { Link } from "expo-router";
import style from "@/utils/style";
import { followUser, getUserbyId, unfollowUser } from "@/api";
import { useAuthStore, useUserStore } from "@/store";
import { likeVehicle, unlikeVehicle } from "@/api/api.vehicles";

const HomeScreen: React.FC = () => {
  const [carsData, setCarsData] = useState<CarDetailProps[]>(carData);
  const [isFollowLoading, setIsFollowLoading] = useState<boolean>(false);
  const [listHeight, setListHeight] = useState<number>(0);
  const refFlashList = useRef<FlashList<CarDetailProps>>(null);
  const router = useRouter();
  const userId = useAuthStore((state) => state.userId);
  const setUser = useUserStore((state) => state.setUser);
  const userStore = useUserStore((state) => state);
  const followingUserIds = userStore.following.map((i) => i._id);

  const fetchUser = async () => {
    const res = await getUserbyId(userId);
    setUser(res.data);
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const handleImageClick = (value: CarDetailProps) => {
    const { id, name, profileImage, cars, daysAgo } = value;
    router.push({
      pathname: "(app)/carDescription",
      params: {
        id: id,
        name: name,
        profileImage: profileImage,
        cars: cars?.carImage,
        description: cars?.description,
        carName: cars?.carName,
        price: cars?.price,
        location: cars?.location,
        daysAgo: daysAgo,
      },
    });
  };

  // Update vehicleStore with vehicle data first
  const handleLikeVehicle = async (id: string) => {
    const response = await likeVehicle(id);
    // vehicleStore.setLikes(response.likes);
  };

  const handleUnlikeVehicle = async (id: string) => {
    const response = await unlikeVehicle(id);
    // vehicleStore.setLikes(response.likes);
  };

  const handleHeartPress = (id: number) => {
    const newData = carsData?.map((item) => {
      if (item?.id === id) {
        return { ...item, isFavorite: !item?.isFavorite };
      }
      return item;
    });
    setCarsData(newData);
  };
  const handleLayout = (e) => {
    const heightLayout = e?.nativeEvent?.layout?.height;
    setListHeight(heightLayout);
  };

  const handleViewProfle = (value) => {
    const { id, name, profileImage, cars, isSeller } = value;
    router.push({
      pathname: "(app)/sellerProfile",
      params: {
        id: id,
        name: name,
        profileImage: profileImage,
        cars: cars?.carImage,
        description: cars?.description,
        carName: cars?.carName,
        price: cars?.price,
        location: cars?.location,
        isSeller: isSeller,
      },
    });
  };

  const toggleFollow = async (id, isFollowing) => {
    try {
      setIsFollowLoading(true);
      const response = await (isFollowing ? unfollowUser : followUser)(id);

      userStore.setFollowing(response.following);
    } finally {
      setIsFollowLoading(false);
    }
  };

  const renderCarDetail: ListRenderItem<CarDetailProps> = ({ item }) => {
    const heartIcon = item?.isFavorite ? assets.heartFilled : assets.likeIcon;
    const isFollowing = followingUserIds.includes(item.userId);
    return (
      <View className={`flex-1 px-3`} style={{ height: listHeight }}>
        <View className=" h-[54%] bg-white">
          <View className="flex-row justify-evenly align-center py-1 flex-1  items-center">
            <View className="flex-row flex-1 ">
              <Image
                source={{ uri: item?.profileImage }}
                className="rounded-xl h-[43px] w-[46px] self-center"
              />
              <View className="self-center pl-1 flex-1">
                <Text
                  className="gilroy18SemiBold font-gilroySemibold "
                  allowFontScaling={false}
                  numberOfLines={1}
                  lineBreakMode="tail"
                >
                  {item?.name}
                </Text>
                <TouchableOpacity onPress={() => handleViewProfle(item)}>
                  <Text
                    className="text-primary text-sm font-gilroySemibold ml-1"
                    allowFontScaling={false}
                  >
                    View Profile
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className="flex-row  gap-1 px-1 flex-1 items-center justify-between ">
              <AppButton
                buttonStyle="bg-darkBlue rounded-full py-2 justify-between gap-1 mt-2"
                title="Trade Seller"
                textStyle="text-white text-xs ml-2 font-gilroySemibold"
                rightIcon={assets.tick}
                rightIconStyle="h-5 w-5 mr-2 self-center"
              />
              <View className="flex-row gap-1 pr-2 mt-2">
                <TouchableOpacity>
                  <View style={styles.elevation}>
                    <Image source={assets.search} className="h-5 w-5" />
                  </View>
                </TouchableOpacity>
                <Link href={"/(app)/filter"} className="">
                  <View style={styles.elevation}>
                    <Image source={assets.filter} className="h-5 w-5" />
                  </View>
                </Link>
              </View>
            </View>
          </View>
          <View className="w-['100%']">
            <View className=" absolute z-[999] flex-row gap-4 right-6 top-5">
              <TouchableOpacity className="items-center justify-center ">
                <Image
                  source={assets.blurBg}
                  className="h-11 w-11 "
                  resizeMode="contain"
                />
                <Image
                  source={assets.shareIcon}
                  className="h-6 w-6 absolute "
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                className="items-center justify-center"
                onPress={() => {
                  handleHeartPress(item?.id);
                }}
              >
                <Image
                  source={assets.blurBg}
                  className="h-11 w-11 "
                  resizeMode="contain"
                />
                <Image
                  source={heartIcon}
                  className="h-7 w-7 absolute"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              className="py-1 w-[100%]"
              style={{ height: listHeight * 0.3 }}
            >
              <Image
                source={{ uri: item?.cars?.carImage[0] }}
                className="rounded-3xl self-center h-full w-full"
              />
            </TouchableOpacity>
            <View className="flex-row align-center justify-center self-center gap-1 mt-1">
              {item?.cars?.carImage?.slice(1, 5)?.map((value, idx) => (
                <TouchableOpacity
                  className="w-[24%] "
                  style={styles.imageView}
                  key={idx}
                  activeOpacity={0.8}
                >
                  <Image
                    source={{ uri: value }}
                    className="rounded-xl self-center w-[100%]"
                    style={{ height: deviceHeight * 0.1 }}
                  />
                  {idx === 3 && (
                    <View className="absolute h-[100%] w-[100%] bg-blackOverlay justify-center rounded-xl">
                      <Text
                        className="self-center text-white text-xl font-gilroySemibold"
                        allowFontScaling={false}
                      >{`+${item?.cars?.carImage?.length - 4}`}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
        <View className="h-[43%]">
          <View className="mt-1 justify-between flex-1 ">
            <Text
              className="self-end  px-1 mt-2 font-gilroyRegular "
              allowFontScaling={false}
            >
              07 june 2024
            </Text>
            <View>
              <View className="flex-row justify-between mb-3">
                <Text
                  className="text-xl font-gilroySemibold "
                  allowFontScaling={false}
                >
                  {item?.cars?.carName}
                </Text>
                <View className="self-center flex-row gap-1 items-center align-center">
                  <Eye name="eye" size={15} />
                  <Text
                    className="font-gilroySemibold pr-2 text-center"
                    allowFontScaling={false}
                  >
                    10
                  </Text>
                </View>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => handleImageClick(item)}
                  activeOpacity={1}
                >
                  <Text
                    className="font-gilroySemibold mb-1"
                    allowFontScaling={false}
                  >
                    Description
                  </Text>

                  <Text
                    className="gilroy12Medium font-gilroyMedium"
                    numberOfLines={3}
                    allowFontScaling={false}
                  >
                    {item?.cars?.description}
                  </Text>
                </TouchableOpacity>
                <View className="flex-row align-center my-2 gap-1">
                  <Image source={assets.location} className="h-5 w-5" />
                  <Text
                    className="gilroy12Medium font-gilroyMedium"
                    allowFontScaling={false}
                  >
                    {item?.cars?.location}
                  </Text>
                </View>
                <Text
                  className="text-2xl text-darkGreen font-gilroySemibold "
                  allowFontScaling={false}
                >
                  {item?.cars?.price}
                </Text>
              </View>
            </View>
            <View className="flex-row w-[100%] justify-evenly  gap-1 py-0.5 self-end">
              <AppButton
                buttonStyle="bg-green rounded-xl py-1.5 px-4 w-[22%]"
                title="Call"
                textStyle="text-white font-gilroySemibold text-xs"
                leftIcon={assets.call}
                leftIconStyle="h-5 w-5 mr-2 "
              />

              <AppButton
                buttonStyle="bg-mustard rounded-xl py-1.5 px-4 w-[23%]"
                title={isFollowing ? "Following" : "Follow"}
                textStyle="text-white font-gilroySemibold text-xs"
                leftIcon={assets.follow}
                leftIconStyle="h-5 w-5"
                onPress={() => toggleFollow(item.userId, isFollowing)}
                loading={isFollowLoading}
              />

              <AppButton
                buttonStyle="bg-lightBlueMessage rounded-xl py-1.5 px-4 w-[25%] justify-center"
                title="Message"
                textStyle="text-white font-gilroySemibold text-xs"
                leftIcon={assets.messageIcon}
                leftIconStyle="h-5 w-5 mr-2"
              />
              <AppButton
                buttonStyle="bg-alertGreen rounded-xl py-1.5 px-4 w-[22%]"
                title="Alert"
                textStyle="text-white font-gilroySemibold text-xs"
                leftIcon={assets.notification}
                leftIconStyle="h-5 w-5 mr-2"
              />
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <View className="flex-1 bg-white">
        <Profiles />
        <FlashList
          estimatedItemSize={580}
          data={carsData}
          renderItem={renderCarDetail}
          pagingEnabled
          showsVerticalScrollIndicator={false}
          ref={refFlashList}
          onLayout={(e) => {
            handleLayout(e);
          }}
          extraData={followingUserIds}
        />
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  elevation: {
    shadowColor: style.blackBackground.backgroundColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    backgroundColor: style.whiteBackground.backgroundColor,
    elevation: 5,
    padding: 8,
    borderRadius: 10,
  },
  imageView: { overflow: "hidden" },
});
