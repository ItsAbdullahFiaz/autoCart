import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { useForm } from "react-hook-form";
import Profiles from "@/components/profiles/profiles";
import AppButton from "@/components/button/Button";
import AppTextInput from "@/components/textinput/TextInput";
import { assets } from "@/index";
import {
  carListingData,
  categories,
  buttonShadow,
  keyExtractor,
} from "@/utils/constants";
import { CarListProps, Category } from "@/models/types.home";
import Animated, { FadeIn, FadeOut, Easing } from "react-native-reanimated";
import style from "@/utils/style";
const Discover: React.FC = () => {
  const [carListData, setCarListData] =
    useState<CarListProps[]>(carListingData);
  const [isLoading, setIsLoading] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const router = useRouter();
  const { control } = useForm();

  const handleFilterScreen = () => {
    router.push({
      pathname: "(app)/filter",
    });
  };

  const handleHeartPress = (id: number) => {
    const newData = carListData.map((item) => {
      if (item.id === id) {
        return { ...item, isFavorite: !item.isFavorite };
      }
      return item;
    });
    setCarListData(newData);
  };

  const loadMoreData = () => {
    if (isLoading) return;

    setIsLoading(true);
    setTimeout(() => {
      const newItems = carListingData.map((item, index) => ({
        ...item,
        id: carListData.length + index + 1,
      }));

      setCarListData((prevData) => [...prevData, ...newItems]);
      setIsLoading(false);
    }, 500);
  };

  const renderCategories: ListRenderItem<Category> = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryView}
      className="bg-white p-3 px-6 rounded-xl"
    >
      <View className="rounded-xl flex items-start flex-col box-border w-full">
        <View className="mb-5 mx-auto h-[15px]">
          <Image
            source={item.image}
            resizeMode="contain"
            className="h-[30] w-[30]"
          />
        </View>
        <Text className="text-sm font-gilroySemibold">{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCarListing: ListRenderItem<CarListProps> = ({ item }) => {
    const {
      avatarImg,
      name,
      daysAgo,
      image,
      price,
      pricePerMonth,
      car,
      sellerType,
      isFavorite,
    } = item;
    const seller = sellerType === "Private seller";
    const heartIcon = isFavorite ? assets.redHeart : assets.grayHeart;

    return (
      <View className="bg-white rounded-lg p-1 mx-1 drop-shadow-md border border-cardBorderColor flex-1 mb-4 max-h-full">
        <View className="flex-row items-center justify-between flex-1">
          <View className="flex-row gap-1.5 items-center">
            <Image
              className="w-8 h-8"
              source={avatarImg}
              resizeMode="contain"
            />
            <Text className="text-xs font-montserratSemiBold">{name}</Text>
          </View>
          <Text className="text-gray text-[10px] font-montserratMedium">
            {daysAgo}
          </Text>
        </View>
        <View className="rounded-lg mt-0.5 w-full overflow-hidden h-[150px]">
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
          <Image className="h-full w-full" source={image} />
          <View className="absolute bottom-2 left-2 flex-row items-center">
            <Image
              className="h-[18] w-[18] mr-1"
              source={assets.imgIcon}
              resizeMode="contain"
            />
            <Text className="text-white text-xs font-montserratMedium">
              1/7
            </Text>
          </View>
        </View>
        <View className="mx-1">
          <View className="flex-row items-center mt-2">
            <Text className="text-base font-montserratSemiBold text-darkGray">
              {price}
            </Text>
            {item.pricePerMonth && (
              <Text className="text-black ml-1 font-montserratMedium bottom-2 text-xs">
                From {pricePerMonth}
              </Text>
            )}
          </View>
          <Text className="text-black my-2 font-montserratSemiBold text-xs">
            {car}
          </Text>
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <Image
                className="h-4 w-4 mr-1"
                source={assets.locationImg}
                resizeMode="contain"
              />
              <Text className="text-lightBlack font-montserratMedium">
                {item.location}
              </Text>
            </View>
            <TouchableOpacity
              style={buttonShadow}
              className={`py-2 px-2 rounded-lg ${seller ? "bg-green" : "bg-darkBlue"}`}
            >
              <Text className="text-white">{sellerType}</Text>
              {!seller && (
                <Image
                  className="h-4 w-4 absolute top-0 right-1"
                  source={assets.tickBox}
                  resizeMode="contain"
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white">
      <Profiles />
      <FlashList
        ListHeaderComponentStyle={styles.header}
        ListHeaderComponent={() => (
          <View className="flex-1">
            <View className="px-2 gap-4">
              <Text className="text-black text-lg font-montserratSemiBold pt-5">
                Discover new and used cars
              </Text>
              <View style={styles.divider} />
              <Text className="text-2xl font-gilroySemibold bottom-1">
                Categories
              </Text>
            </View>
            <View className="mt-6">
              <FlatList
                nestedScrollEnabled
                renderItem={renderCategories}
                data={categories}
                horizontal
                keyExtractor={keyExtractor}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.category}
              />
            </View>
            <View className="flex-row items-center gap-2 px-4 pt-4">
              <AppTextInput
                name={"SearchCars"}
                control={control}
                placeholder="Search Cars"
                placeholderStyle="text-sm font-montserratMedium "
                placeholderTxtColor={style.grayText.color}
                viewStyle="border-dullGray w-[80%] rounded-xl bg-textInputBg py-1 "
                rightIcon={
                  <TouchableOpacity style={styles.elevationButton}>
                    <Image
                      source={assets.search}
                      className="h-5 w-5"
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                }
                rightIconStyle="right-2"
              />
              <Link href={"/(app)/filter"} className="">
                <View style={styles.elevationButton}>
                  <Image source={assets.filter} className="h-5 w-5" />
                </View>
              </Link>
            </View>
            <View className="flex-row justify-between px-2 my-6">
              <Text className="text-2xl self-center font-gilroySemibold">
                Recommended
              </Text>
            </View>
          </View>
        )}
        data={carListData.slice(0)}
        renderItem={renderCarListing}
        keyExtractor={keyExtractor}
        estimatedItemSize={2}
        numColumns={2}
        scrollToOverflowEnabled
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.2}
        onScroll={(e) => setScrollPosition(e.nativeEvent.contentOffset.y)}
        ListFooterComponent={
          isLoading && <ActivityIndicator size="large" color="#0000ff" />
        }
      />
      {scrollPosition > 250 && (
        <Animated.View
          entering={FadeIn.duration(300).easing(Easing.inOut(Easing.ease))}
          exiting={FadeOut.duration(200).easing(Easing.inOut(Easing.ease))}
        >
          <AppButton
            title="Filter Search"
            buttonStyle="w-[95%] rounded-lg h-14 self-center bg-darkGreen bottom-3 justify-center"
            textStyle="montserratbuttonTextStyle text-text2xl text-white w-[100%] text-center"
            onPress={handleFilterScreen}
          />
        </Animated.View>
      )}
    </View>
  );
};

export default Discover;

const styles = StyleSheet.create({
  header: { flex: 1 },
  elevationButton: {
    shadowColor: style.blackBackground.backgroundColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    backgroundColor: style.whiteBackground.backgroundColor,
    elevation: 8,
    padding: 8,
    borderRadius: 12,
  },
  category: { justifyContent: "space-around", flex: 1 },
  footerPagination: {
    shadowColor: style.blackBackground.backgroundColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    backgroundColor: style.whiteBackground.backgroundColor,
    elevation: 6,
    borderRadius: 12,
    width: 46,
    height: 47,
  },
  categoryView: {
    shadowColor: style.blackBackground.backgroundColor,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    borderRadius: 16,
    marginVertical: 5,
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: style.borderGray.borderColor,
  },
});
