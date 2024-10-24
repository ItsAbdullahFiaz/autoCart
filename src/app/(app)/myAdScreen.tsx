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
import Eye from "react-native-vector-icons/Feather";
import { StyleSheet } from "react-native";
import { renderVehicleOverviewProps } from "@/models/types.home";
import {
  buttonShadow,
  deviceWidth,
  keyExtractor,
  vehicleOverview,
} from "@/utils/constants";
import style from "@/utils/style";

const CarDescription = () => {
  const item = useLocalSearchParams() as {
    [x: string]: string;
  };
  const navigation = useNavigation();
  const carImage = item?.cars.split(",");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeEnabled, setSwipeEnabled] = useState(true);
  const renderVehicleOverview = ({
    item,
  }: {
    item: renderVehicleOverviewProps;
  }) => {
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
                {item?.make || "---"}
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
                {item?.trim || "---"}
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
                {item?.year || "---"}
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
                {item?.fuelType || "---"}
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
                {item?.bodyType || "---"}
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
                {item?.doors || "---"}
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
                {item?.model || "---"}
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
                {item?.trimLevel || "---"}
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
                {item?.mileage || "---"}
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
                {item?.transmission || "---"}
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
                {item?.seats || "---"}
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
                {item?.color || "---"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderCarImages = ({ item }: { item: string; index: number }) => {
    return (
      <View className="mx-1">
        <Image
          source={{ uri: item }}
          height={200}
          className="rounded-3xl self-center h-full w-full "
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
      <View className="flex-row pt-16 py-4 px-4 justify-between bg-white ">
        <View className="flex-row gap-2 bg-white">
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
          <View className="flex-row justify-center w-[90%] ">
            <Text className="font-montserratBold text-3xl text-darkGreen">
              Auto
            </Text>
            <Text className="font-montserratBold text-3xl ">Cart</Text>
          </View>
        </View>
      </View>
      <View className="bg-white">
        <View className="flex-row gap-2 items-center bg-white px-4 ">
          <Image source={assets.dot} className="h-2 w-2" resizeMode="contain" />
          <Text
            className="text-darkGreen text-sm font-montserratBold "
            allowFontScaling={false}
          >
            My Ads
          </Text>
        </View>
      </View>
      <ScrollView className="flex-1 pt-6 bg-white" scrollEnabled={swipeEnabled}>
        <View className="flex-1 bg-white px-2 pb-2 ">
          <View className="flex-1">
            <View>
              <Carousel
                loop
                width={deviceWidth * 0.98}
                height={230}
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
          </View>

          <View
            className="flex-row justify-between mt-4 "
            style={{
              borderTopColor: style.borderGray.borderColor,
              borderTopWidth: 1,
            }}
          >
            <Text
              className="font-montserratBold text-2xl"
              allowFontScaling={false}
            >
              {item?.carName}
            </Text>
            <View className="px-2">
              <View className="self-center flex-row gap-1 justify-center  items-center py-2 ">
                <Eye name="eye" size={16} className="" />
                <Text
                  className="font-montserratSemiBold text-xxs"
                  allowFontScaling={false}
                >
                  10 Views
                </Text>
              </View>
              <Text
                className="self-end font-montserratSemiBold text-gray text-xxs "
                allowFontScaling={false}
              >
                {item?.daysAgo}
              </Text>
            </View>
          </View>

          <Text className="font-montserratSemiBold text-xs pb-4">
            BMW has full service history, etc
          </Text>

          <View className="flex-row justify-between pr-2">
            <View className="flex-row gap-1 items-center">
              <Image
                source={assets.locationImg}
                className="h-5 w-5"
                tintColor={"gray"}
              />
              <Text
                className="font-montserratSemiBold text-xs text-text"
                allowFontScaling={false}
              >
                {item?.location}
              </Text>
            </View>
          </View>
          <View className="pt-3 ">
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
                keyExtractor={keyExtractor}
              />
              <View className="flex-row align-center w-[100%] justify-between self-center pb-6 px-10">
                <AppButton
                  title="Delete Ad"
                  buttonStyle="bg-red py-3 pr-8 rounded-lg pl-2 "
                  textStyle="text-white font-montserratSemiBold text-xs"
                  leftIcon={assets.trash}
                  leftIconStyle="h-12 w-12"
                  style={buttonShadow}
                />
                <AppButton
                  title="Renew Ad"
                  buttonStyle="bg-green py-3 pr-8 rounded-lg pl-2 gap-1 "
                  textStyle="text-white font-montserratSemiBold text-xs"
                  leftIcon={assets.plus}
                  leftIconStyle="h-10 w-10"
                  style={buttonShadow}
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
