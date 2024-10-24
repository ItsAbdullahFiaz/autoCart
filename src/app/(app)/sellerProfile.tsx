import { assets } from "assets";
import { adsData, keyExtractor, profilePicturePlaceholder } from "@/utils";
import {
  useLocalSearchParams,
  useNavigation,
  useRouter,
  useFocusEffect,
} from "expo-router";
import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import AppButton from "@/components/button/Button";
import style from "@/utils/style";
import { getUserbyId } from "@/api";

const SellerProfile = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const [carAdData, setCarAdData] = useState(adsData);
  const [sellerData, setSellerData] = useState(null);
  const scrollY = useSharedValue(0);
  const data = useLocalSearchParams() as {
    [x: string]: string;
  };

  const fetchSellerProfile = async (userId) => {
    setSellerData(null);
    try {
      const response = await getUserbyId(userId);
      setSellerData(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchSellerProfile(data._id);
    }, [data._id]),
  );
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const profileImageStyle = useAnimatedStyle(() => {
    const size = interpolate(
      scrollY.value,
      [0, 200],
      [160, 100],
      Extrapolation.CLAMP,
    );
    const top = interpolate(
      scrollY.value,
      [0, 200],
      [200, 80],
      Extrapolation.CLAMP,
    );

    return {
      width: size,
      height: size,
      top: top,
    };
  });

  const carImageHeightStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, 200],
      [280, 130],
      Extrapolation.CLAMP,
    );

    return {
      height: height,
    };
  });

  const userInfoStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, 200],
      [70, 25],
      Extrapolation.CLAMP,
    );
    const scale = interpolate(
      scrollY.value,
      [0, 100],
      [1, 0.8],
      Extrapolation.CLAMP,
    );
    const borderBottomOpacity = interpolate(
      scrollY.value,
      [0, 100],
      [1, 0],
      Extrapolation.CLAMP,
    );

    return {
      transform: [{ translateY }, { scale }],
      borderBottomColor: `rgba(226, 226, 226, ${borderBottomOpacity})`,
      borderBottomWidth: 2,
    };
  });

  const adsHeaderStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 100],
      [1, 0],
      Extrapolation.CLAMP,
    );

    return {
      opacity: opacity,
    };
  });

  if (!sellerData) {
    return null;
  }

  const isMyAds = data?.isSeller == "false" ? false : true;
  const carImage = data?.cars?.split(",");
  const handleHeartPress = (id: number) => {
    const newData = carAdData?.map((item) => {
      if (item?.id === id) {
        return { ...item, isFavorite: !item?.isFavorite };
      }
      return item;
    });
    setCarAdData(newData);
  };
  const handleMyAdsScreen = (value) => {
    const { id, car, daysAgo, location } = value;
    router.push({
      pathname: "(app)/myAdScreen",
      params: {
        id: id,
        carName: car,
        cars: carImage,
        key: isMyAds,
        daysAgo: daysAgo,
        location: location,
      },
    });
  };
  const renderAds = ({ item }) => {
    const heartIcon = item?.isFavorite ? assets.redHeart : assets.grayHeart;
    return (
      <>
        <View className="flex-initial w-[49%] bg-white rounded-lg p-1 mx-1 drop-shadow-md mb-4">
          {data?.isSeller === "false" && (
            <View
              className={`py-2 px-2 rounded-lg w-[35%] items-center my-2 ${item?.status == "Active" ? "bg-darkGreen" : "bg-red"}`}
            >
              <Text className="text-white font-montserratMedium">
                {item?.status}
              </Text>
            </View>
          )}
          <TouchableOpacity
            className="flex-initial w-[100%] bg-white border-cardBorderColor border-2 rounded-xl p-1.5 "
            activeOpacity={0.8}
            onPress={() => handleMyAdsScreen(item)}
          >
            <View className="rounded-lg flex-1 overflow-hidden h-[150] items-center ">
              {data?.isSeller == "false" && (
                <TouchableOpacity
                  className="absolute top-2 right-1 flex-row items-center z-10"
                  onPress={() => handleHeartPress(item?.id)}
                >
                  <Image
                    className={`h-5 w-5 mr-1`}
                    source={heartIcon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )}
              <Image className="h-[100%] w-[100%] " source={item?.image} />
            </View>
            <View className="mx-1">
              <View className="flex-row items-center mt-2 justify-between">
                <Text className="text-base font-montserratSemiBold text-darkGreen">
                  {item?.price}
                </Text>
                <Text className="text-xxs font-montserratSemiBold text-grey">
                  {item?.daysAgo}
                </Text>
              </View>
              <Text className="text-black my-2 font-montserratSemiBold">
                {item?.car}
              </Text>
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                  <Image
                    className="h-4 w-4 mr-1"
                    source={assets.locationImg}
                    resizeMode="contain"
                  />
                  <View className="items-center flex-row justify-between w-[90%] ">
                    <Text className="text-text font-montserratMedium">
                      {item?.location}
                    </Text>
                    {data?.isSeller == "true" && (
                      <View className="flex-row gap-1 items-center">
                        <Image
                          className={`h-4 w-4 `}
                          source={assets.redHeart}
                          resizeMode="stretch"
                        />
                        <Text className="text-xs text-gray font-montserratMedium">
                          12k
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row absolute z-[999] top-4 w-[100%] justify-between px-3">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={assets.blurBg}
            className="h-11 w-11 "
            resizeMode="contain"
          />
          <Image
            source={assets.backArrow}
            className="h-5 w-5 absolute self-center top-3"
            resizeMode="contain"
            style={styles.iconColor}
          />
        </TouchableOpacity>
        {data?.isSeller === "true" && (
          <TouchableOpacity>
            <Image
              source={assets.blurBg}
              className="h-11 w-11 "
              resizeMode="contain"
            />
            <Image
              source={assets.edit}
              className="h-5 w-5 absolute self-center top-3"
              resizeMode="contain"
              style={styles.iconColor}
            />
          </TouchableOpacity>
        )}
      </View>

      <Animated.View style={carImageHeightStyle}>
        <Animated.Image
          source={{ uri: carImage[0] }}
          style={styles.imageStyle}
        />
        <View className="items-center absolute self-center">
          <Animated.Image
            source={{
              uri: sellerData.profilePicture || profilePicturePlaceholder,
            }}
            style={[styles.profileImage, profileImageStyle]}
          />
        </View>
      </Animated.View>
      <Animated.View style={[styles.userInfo, userInfoStyle]}>
        <Text className="text-black font-gilroyBold text-xl mb-4">
          {sellerData.username}
        </Text>
        {sellerData.location && (
          <View className="flex-row gap-1 items-center ">
            <Image source={assets.location} className="h-5 w-5" />
            <Text
              className="font-gilroyMedium text-sm text-gray "
              allowFontScaling={false}
            >
              {sellerData.location}
            </Text>
          </View>
        )}
        <View
          className="flex-row gap-11 py-5 rounded-xl px-5 mb-11 mt-8"
          style={styles.categoryView}
        >
          <View className="items-center">
            <Text className="text-xl font-gilroySemibold">
              {sellerData.followers?.length}
            </Text>
            <Text className="text-grey font-montserratMedium text-base">
              Follower{sellerData.followers?.length > 1 && "s"}
            </Text>
          </View>
          <View className="w-[0.5%] bg-dullWhite" />
          <View className="items-center">
            <Text className="text-xl font-gilroySemibold">
              {sellerData.following?.length}
            </Text>
            <Text className="text-grey font-montserratMedium text-base">
              Following
            </Text>
          </View>
        </View>
      </Animated.View>

      <Animated.FlatList
        data={carAdData}
        renderItem={renderAds}
        keyExtractor={keyExtractor}
        numColumns={2}
        onScroll={scrollHandler}
        contentContainerStyle={styles.flashlistContainer}
        scrollEventThrottle={10}
        ListHeaderComponent={
          data?.isSeller == "true" ? (
            <Animated.View style={adsHeaderStyle}>
              <View className="flex-row items-center gap-2 self-start py-2 px-3 justify-between w-[100%] ">
                <View className="flex-row gap-2 items-center">
                  <Image
                    source={assets.dot}
                    className="h-2 w-2"
                    resizeMode="contain"
                  />
                  <Text
                    className="text-darkGreen text-sm font-montserratBold "
                    allowFontScaling={false}
                  >
                    My Ads
                  </Text>
                </View>
                <AppButton
                  buttonStyle="bg-darkGreen rounded-xl justify-center w-['40%'] p-1 h-11 align-center"
                  title="Manage my ads"
                  textStyle="text-white font-montserratBold"
                />
              </View>
            </Animated.View>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default SellerProfile;

const styles = StyleSheet.create({
  profileImage: {
    borderRadius: 80,
    borderColor: style.whiteBackground.backgroundColor,
    borderWidth: 3,
    position: "absolute",
  },
  categoryView: {
    shadowColor: style.blackBackground.backgroundColor,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    backgroundColor: style.whiteBackground.backgroundColor,
    elevation: 2,
  },
  userInfo: {
    alignItems: "center",
    marginTop: 10,
    width: "93%",
    alignSelf: "center",
  },
  flashlistContainer: {
    paddingTop: 80,
    paddingHorizontal: 5,
  },
  iconColor: {
    tintColor: style.whiteBackground.backgroundColor,
  },
  imageStyle: { width: "100%", height: "100%" },
});
