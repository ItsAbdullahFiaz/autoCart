import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { assets } from "assets";
import AppButton from "@/components/button/Button";
import Carousel from "react-native-reanimated-carousel";
import CustomPagination from "@/components/carousel/carousel";
import Eye from "react-native-vector-icons/Feather";
import { StyleSheet } from "react-native";
import Arrow from "react-native-vector-icons/MaterialIcons";
import {
  renderCarInfoProps,
  renderVehicleOverviewProps,
} from "@/models/types.home";
import {
  buttonShadow,
  carInfo,
  deviceWidth,
  keyExtractor,
  textShadow,
  vehicleOverview,
} from "@/utils/constants";
import style from "@/utils/style";

const CarDescription = () => {
  const item = useLocalSearchParams() as {
    [x: string]: string;
  };
  const navigation = useNavigation();
  const { profileImage, description, name, location, carName, price, cars } =
    item;
  const carImage = cars?.split(",");
  const [currentIndex, setCurrentIndex] = useState(0);

  const [toggleLike, setToggleLike] = useState(false);
  const [swipeEnabled, setSwipeEnabled] = useState(true);
  const renderCarInfo = ({ item }: { item: renderCarInfoProps }) => {
    const { image, value } = item;
    return (
      <View className="h-24 w-24 rounded-3xl  items-center justify-center bg-dullWhite  my-2 ">
        <View className="items-center gap-2.5">
          <Image source={image} className="h-8 w-8 " resizeMode="contain" />
          <Text
            className="text-xxs font-gilroySemibold"
            allowFontScaling={false}
          >
            {value}
          </Text>
        </View>
      </View>
    );
  };
  const renderVehicleOverview = ({
    item,
  }: {
    item: renderVehicleOverviewProps;
  }) => {
    const {
      make,
      trim,
      year,
      fuelType,
      bodyType,
      doors,
      model,
      trimLevel,
      mileage,
      transmission,
      seats,
      color,
    } = item;
    return (
      <View className=" w-[100%] flex-row gap-10 py-5">
        <View className="flex-row w-[45%]">
          <View className="gap-8 w-[100%]">
            <View className="flex-row justify-between">
              <Text
                className="text-grey font-montserratSemiBold text-xs"
                allowFontScaling={false}
              >
                Make
              </Text>
              <Text
                className="text-black font-montserratSemiBold text-xs"
                allowFontScaling={false}
              >
                {make || "---"}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text
                className="text-grey font-montserratSemiBold text-xs"
                allowFontScaling={false}
              >
                Trim
              </Text>
              <Text
                className="text-black font-montserratSemiBold text-xs"
                allowFontScaling={false}
              >
                {trim || "---"}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text
                className="text-grey font-montserratSemiBold text-xs"
                allowFontScaling={false}
              >
                Year
              </Text>
              <Text
                className="text-black font-montserratSemiBold text-xs"
                allowFontScaling={false}
              >
                {year || "---"}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text
                className="text-grey font-montserratSemiBold text-xs"
                allowFontScaling={false}
              >
                Fuel Type
              </Text>
              <Text
                className="text-black font-montserratSemiBold text-xs"
                allowFontScaling={false}
              >
                {fuelType || "---"}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text
                className="text-grey font-montserratSemiBold text-xs"
                allowFontScaling={false}
              >
                Body Type
              </Text>
              <Text
                className="text-black font-montserratSemiBold text-xs"
                allowFontScaling={false}
              >
                {bodyType || "---"}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text
                className="text-grey font-montserratSemiBold text-xs"
                allowFontScaling={false}
              >
                Doors
              </Text>
              <Text
                className="text-black font-montserratSemiBold text-xs"
                allowFontScaling={false}
              >
                {doors || "---"}
              </Text>
            </View>
          </View>
        </View>
        <View className="flex-row w-[45%]">
          <View className="gap-8 w-[100%]">
            <View className="flex-row justify-between">
              <Text
                className="text-grey font-montserratSemiBold text-xs"
                allowFontScaling={false}
              >
                Modal
              </Text>
              <Text
                className="text-black font-montserratSemiBold text-xs"
                allowFontScaling={false}
              >
                {model || "---"}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text
                className="text-grey font-montserratSemiBold text-xs"
                allowFontScaling={false}
              >
                Trim Level
              </Text>
              <Text
                className="text-black font-montserratSemiBold text-xs"
                allowFontScaling={false}
              >
                {trimLevel || "---"}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text
                className="text-grey font-montserratSemiBold text-xs"
                allowFontScaling={false}
              >
                Mileage
              </Text>
              <Text
                className="text-black font-montserratSemiBold text-xs"
                allowFontScaling={false}
              >
                {mileage || "---"}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text
                className="text-grey font-montserratSemiBold text-xs"
                allowFontScaling={false}
              >
                Transmission
              </Text>
              <Text
                className="text-black font-montserratSemiBold text-xs"
                allowFontScaling={false}
              >
                {transmission || "---"}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text
                className="text-grey font-montserratSemiBold text-xs"
                allowFontScaling={false}
              >
                Seats
              </Text>
              <Text
                className="text-black font-montserratSemiBold text-xs"
                allowFontScaling={false}
              >
                {seats || "---"}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text
                className="text-grey font-montserratSemiBold text-xs"
                allowFontScaling={false}
              >
                Colors
              </Text>
              <Text
                className="text-black font-montserratSemiBold text-xs"
                allowFontScaling={false}
              >
                {color || "---"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderCarImages = ({
    item,
    index,
  }: {
    item: string;
    index: number;
  }) => {
    return (
      <View className="mx-1">
        <Image
          source={{ uri: item }}
          height={200}
          className="rounded-3xl self-center h-full w-full"
        />
      </View>
    );
  };
  const renderImages = ({ item, index }: { item: string; index: number }) => {
    return (
      <TouchableOpacity>
        <Image
          source={{ uri: item }}
          className="rounded-xl self-center mx-1"
          style={[
            styles.imageStyle,
            {
              borderWidth: currentIndex === index ? 2 : 0,
              borderColor:
                currentIndex === index
                  ? style.greenBackground.backgroundColor
                  : "transparent",
            },
          ]}
        />
      </TouchableOpacity>
    );
  };
  const flatListRef = useRef(null);
  useEffect(() => {
    flatListRef.current.scrollToIndex({
      animated: true,
      index: currentIndex,
    });
  }, [currentIndex]);
  return (
    <>
      <View className="flex-row  py-2 px-2 justify-between bg-white">
        <View className="flex-row gap-2">
          <TouchableOpacity
            className="self-center"
            onPress={() => navigation.goBack()}
          >
            <Image
              source={assets.backArrow}
              className="h-6 w-6 "
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View className="flex-row ">
            <View className="border-2 border-primary rounded-2xl h-17 w-17 p-0.5">
              <Image
                source={{ uri: profileImage }}
                className="rounded-2xl h-12 w-12 self-center "
              />
            </View>

            <View className="p-2 justify-center">
              <Text
                className="font-gilroySemibold text-sm"
                allowFontScaling={false}
              >
                {name}
              </Text>
              <TouchableOpacity className="flex-row items-center gap-1">
                <Text className="text-grey text-xxs " allowFontScaling={false}>
                  View Profile
                </Text>
                <Arrow name="arrow-forward-ios" size={10} color={"gray"} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className=" flex-row self-center flex-initial ">
          <TouchableOpacity
            style={buttonShadow}
            className={"py-2 px-2 rounded-lg bg-darkBlue mx-2 "}
          >
            <Image
              className="h-5 w-5 absolute right-1 bottom-5"
              source={assets.tickBox}
              resizeMode="contain"
            />
            <Text className="text-white" allowFontScaling={false}>
              Trade Seller
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView className="flex-1 " scrollEnabled={swipeEnabled}>
        <View className="flex-1 bg-white px-2 pb-2">
          <View className="flex-row pt-1 "></View>
          <View className="flex-1">
            <View className="absolute z-[999] flex-row gap-4 right-6 top-5">
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
                  toggleLike ? setToggleLike(false) : setToggleLike(true);
                }}
              >
                <Image
                  source={assets.blurBg}
                  className="h-11 w-11 "
                  resizeMode="contain"
                />
                <Image
                  source={assets.likeIcon}
                  className="h-7 w-7 absolute"
                  resizeMode="contain"
                />
                {toggleLike ? (
                  <Image
                    source={assets.heartFilled}
                    className="h-7 w-7 absolute"
                    resizeMode="contain"
                  />
                ) : (
                  <Image
                    source={assets.likeIcon}
                    className="h-7 w-7 absolute"
                    resizeMode="contain"
                  />
                )}
              </TouchableOpacity>
            </View>

            <View>
              <Carousel
                loop
                width={deviceWidth * 0.98}
                height={200}
                data={carImage}
                onSnapToItem={(index) => {
                  setCurrentIndex(index);
                }}
                renderItem={renderCarImages}
                style={styles.carousel}
                overscrollEnabled={true}
                enabled={true}
                onScrollBegin={() => {
                  setSwipeEnabled(false);
                }}
                onScrollEnd={() => {
                  setSwipeEnabled(true);
                }}
              />
              <CustomPagination data={carImage} currentIndex={currentIndex} />
            </View>

            <View className="flex-row align-center justify-center self-center gap-1 mt-2">
              <FlatList
                ref={flatListRef}
                renderItem={renderImages}
                data={carImage}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>

            <FlatList
              renderItem={renderCarInfo}
              data={carInfo}
              horizontal
              keyExtractor={keyExtractor}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.category}
              style={styles.flatListStyle}
            />
          </View>

          <View className="pt-3 ">
            <View className="flex-row align-center justify-between items-center py-2 px-2">
              <View className="flex-row gap-1 items-center">
                <Image source={assets.location} className="h-5 w-5" />
                <Text
                  className="font-gilroyMedium text-xs text-text"
                  allowFontScaling={false}
                >
                  {location}
                </Text>
              </View>
              <Text
                className="self-center gilroy12Medium  font-montserratSemiBold text-gray text-xxs"
                allowFontScaling={false}
              >
                10 Days ago
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text
                className="font-montserratBold text-2xl"
                allowFontScaling={false}
              >
                {carName}
              </Text>

              <View className="self-center flex-row gap-1 justify-center px-2 items-center ">
                <Eye name="eye" size={16} className="" />
                <Text
                  className="font-montserratSemiBold text-xxs"
                  allowFontScaling={false}
                >
                  10 Views
                </Text>
              </View>
            </View>
            <View className="flex-row items-center gap-1 ">
              <Text
                className="text-2xl text-black font-montserratMedium"
                allowFontScaling={false}
                style={textShadow}
              >
                {price}
              </Text>
              <Text
                className="text-xxs font-montserratMedium"
                allowFontScaling={false}
              >
                From $32/mo
              </Text>
            </View>
            <View>
              <Text
                className="my-5 font-montserratBold text-xs"
                style={textShadow}
                allowFontScaling={false}
              >
                Description
              </Text>
              <Text
                className="font-montserratSemiBold mb-4 text-xs"
                allowFontScaling={false}
              >
                {description}
              </Text>
            </View>
            <View>
              <View className="flex-row items-center gap-2">
                <Image source={assets.dot} className="h-2 w-2" />
                <Text
                  className="text-darkGreen text-xs font-montserratBold "
                  allowFontScaling={false}
                >
                  Vehicle Overview
                </Text>
              </View>
              <FlatList
                data={vehicleOverview}
                renderItem={renderVehicleOverview}
                keyExtractor={(item) => item?.id?.toString()}
              />
              <View className="flex-row align-center w-[100%] justify-center self-center gap-2 py-1">
                <AppButton
                  buttonStyle="bg-green rounded-xl py-2 px-4 w-[22%]"
                  title="Call"
                  textStyle="text-white font-gilroySemibold text-xs"
                  leftIcon={assets.call}
                  leftIconStyle="h-5 w-5 mr-2 "
                />
                <AppButton
                  buttonStyle="bg-mustard rounded-xl py-2 px-4 w-[23%]"
                  title="Follow"
                  textStyle="text-white font-gilroySemibold text-xs"
                  leftIcon={assets.follow}
                  leftIconStyle="h-5 w-5"
                />
                <AppButton
                  buttonStyle="bg-lightBlueMessage rounded-xl py-2 px-4 w-[25%] justify-center"
                  title="Message"
                  textStyle="text-white font-gilroySemibold text-xs"
                  leftIcon={assets.messageIcon}
                  leftIconStyle="h-5 w-5 mr-2"
                />
                <AppButton
                  buttonStyle="bg-alertGreen rounded-xl py-2 px-4 w-[22%]"
                  title="Alert"
                  textStyle="text-white font-gilroySemibold text-xs"
                  leftIcon={assets.notification}
                  leftIconStyle="h-5 w-5 mr-2"
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default CarDescription;

const styles = StyleSheet.create({
  category: { justifyContent: "space-around", flex: 1 },

  flatListStyle: {
    borderBottomColor: style.borderGray.borderColor,
    borderBottomWidth: 2,
    paddingBottom: 10,
  },
  imageStyle: {
    width: 100,
    height: 75,
  },
  carousel: {
    alignSelf: "center",
  },
});
