import React, { useState } from "react";
import AppButton from "../../components/button/Button";
import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { router, useNavigation } from "expo-router";
import { bodyTypes } from "@/utils/constants";
import Cross from "react-native-vector-icons/Entypo";
import { FilterProps } from "@/models/types.home";
import style from "@/utils/style";
const Filter: React.FC<FilterProps> = ({ modalVisible }) => {
  const [selectedBodyType, setSelectedBodyType] = useState<string | null>(
    bodyTypes[0],
  );
  const navigation = useNavigation();
  const handleBodyTypeSelection = (type: string) => {
    setSelectedBodyType(type);
  };
  const filterItems = ({ item }: { item: string }) => {
    return (
      <TouchableOpacity
        key={item}
        className={`px-1.5 py-2 mt-[10px] flex justify-center items-center ${selectedBodyType === item ? "border" : "border"} rounded mr-2 ${selectedBodyType === item ? "border-black" : "border-gray"}`}
        onPress={() => handleBodyTypeSelection(item)}
      >
        <Text
          className={`text-base ${selectedBodyType === item ? "text-black" : "text-gray"} ${selectedBodyType === item ? "font-montserratSemiBold" : "font-montserratRegular"}`}
        >
          {item}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View className="flex-1 ">
      <View className="flex-1 bg-blackOverlay">
        <View className="rounded-t l-10 rounded-bl-10 my-[60] flex-1 ml-[20] bg-white px-10">
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            className="mt-8  w-[17%] self-end p-2 "
          >
            <Cross name="cross" size={25} className="self-center" />
          </TouchableOpacity>
          <View className="flex-1 ">
            <Text className="text-text3xl font-montserratBold">Filter</Text>
            <TouchableOpacity onPress={() => setSelectedBodyType(null)}>
              <Text className="text-royalBlue mb-4 text-sm font-montserratBold">
                Reset All
              </Text>
            </TouchableOpacity>
            <Text className="text-text3xl my-4 font-montserratBold">
              Body Type
            </Text>
            <View className="flex flex-row flex-wrap w-[90%]">
              {bodyTypes?.map((i) => {
                return filterItems({ item: i });
              })}
            </View>
            <Text className="text-text3xl my-4 font-montserratBold">
              Transmission
            </Text>
          </View>
          <AppButton
            title="Apply"
            buttonStyle={
              "w-[95%] my-3 rounded-lg h-14 self-center dark:bg-appText bg-darkGreen my-8 justify-center"
            }
            style={styles.shadow}
            textStyle="montserratbuttonTextStyle text-2xl text-white w-[100%] text-center"
            onPress={() => {
              router.back();
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: style.blackBackground.backgroundColor,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
});
