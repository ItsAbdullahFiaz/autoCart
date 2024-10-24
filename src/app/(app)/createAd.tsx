import AppButton from "@/components/button/Button";
import AppTextInput from "@/components/textinput/TextInput";
import { assets } from "@/index";
import { router, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FlatList, ScrollView, StyleSheet } from "react-native";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { buttonShadow, keyExtractor } from "@/utils";
import style from "@/utils/style";
interface ImageObject {
  id: number;
  uri: string;
}

const flags = [assets.flag, assets.flag, assets.flag];
const countries = ["India", "Pakistan", "Australia"];
const mileage = ["Km", "Mm"];
const categories = ["Category 1", "Category 2", "Category 3"];

const CreateAd = () => {

  const [selectedValue, setSelectedValue] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectCategories, setSelectCategories] = useState(null);
  const [selectMilageType, setSelectMilageType] = useState(null);
  const [selectCountry, setselectCountry] = useState(null);

  const [reg, setReg] = useState("");
  const navigation = useNavigation();
  const { control } = useForm();
  const [images, setImages] = useState<ImageObject[]>([
    {
      id: 1,
      uri: "https://images.unsplash.com/photo-1490902931801-d6f80ca94fe4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      uri: "https://images.unsplash.com/photo-1490902931801-d6f80ca94fe4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      uri: "https://images.unsplash.com/photo-1490902931801-d6f80ca94fe4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ]);

  useEffect(() => {
    const data = global.data
    if (global.isManualAd === false) {
      setReg(data.reg)
    }
  }, [])

  const handleDropdownToggle = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };
  const handleOutsideClick = () => {
    setOpenDropdown(null);
  };
  const handlePostAd = () => {
    router.replace({
      pathname: "(drawer)/(tab)/home",
    });
  };
  const RadioButton = React.useCallback(
    ({ label, value, selectedValue, onPress }) => {
      return (
        <TouchableOpacity
          onPress={() => onPress(value)}
          className="flex-row items-center mb-2"
          activeOpacity={0.8}
        >
          <View
            className={`h-6 w-6 rounded-full border-2 border-gray-400 flex items-center justify-center mr-2 ${selectedValue === value ? "border-green" : "border-gray"}`}
          >
            {selectedValue === value && (
              <View className="h-3 w-3 rounded-full bg-green" />
            )}
          </View>
          <Text className="text-black font-gilroySemibold text-sm">
            {label}
          </Text>
        </TouchableOpacity>
      );
    },
    [],
  );
  const ImageUploadComponent = () => {
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        const newImage = {
          id: Date.now(),
          uri: result.assets[0].uri,
        };

        setImages([newImage, ...images]);
      }
    };
    const handleDelete = (id) => {
      const updatedImages = images.filter((image) => image.id !== id);
      setImages(updatedImages);
    };
    const renderImage = ({ item }) => {
      const { id, uri } = item;
      return (
        <View>
          <TouchableOpacity
            className="absolute z-[999] top-1 right-2"
            onPress={() => handleDelete(id)}
          >
            <Image source={assets.deleteImage} className="h-[24px] w-[24px]" />
          </TouchableOpacity>
          <Image
            source={{ uri: uri }}
            className="w-[100px] h-[100px] rounded-xl mx-1"
            resizeMode="cover"
          />
        </View>
      );
    };
    return (
      <View className="flex-row">
        <TouchableOpacity
          className="bg-white items-center justify-center w-[100px] h-[100px] rounded-xl mr-1"
          onPress={() => pickImage()}
        >
          <Image
            source={assets.addImage}
            className="h-[30px] w-[30px]"
            resizeMode="contain"
          />
        </TouchableOpacity>
        <FlatList
          data={images}
          renderItem={renderImage}
          keyExtractor={keyExtractor}
          horizontal
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled
        />
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row  px-5 items-center gap-3 bg-dullWhite  h-[10%]">
        <TouchableOpacity
          className="bg-white p-3 rounded-xl w-[40px] h-[40px] items-center justify-center "
          onPress={() => navigation.goBack()}
        >
          <Image
            source={assets.backButton}
            className="h-5 w-5"
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text className="font-gilroySemibold text-lg">Create Ad</Text>
      </View>
      <ScrollView
        className="flex-1 bg-dullWhite "
        keyboardShouldPersistTaps={"always"}
      >
        <View className="items-center z-[99] ">
          <AppTextInput
            control={control}
            name="selling"
            placeholder="What are you selling?"
            viewStyle="border-0 bg-white py-3 w-[95%] rounded-xl px-2"
          />
          <TouchableOpacity
            className="bg-white p-4 rounded-xl flex-row justify-between gap-2 items-center mb-4 mx-2.5 py-6 w-[95%] z-[999]"
            activeOpacity={0.8}
            onPress={() => handleDropdownToggle("category")}
          >
            <Text
              className={`text-base px-1 ${
                selectCategories
                  ? "font-gilroyMedium text-black"
                  : "font-gilroyMedium text-grey"
              }`}
            >
              {selectCategories ? selectCategories : "Select Categories"}
            </Text>
            <Image
              source={
                openDropdown === "category" ? assets.upArrow : assets.downArrow
              }
              className="h-6 w-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
          {openDropdown === "category" && (
            <View
              style={buttonShadow}
              className="bg-white w-[95%] rounded-xl p-2 absolute top-[145px] z-[99]"
            >
              {categories?.map((category) => (
                <TouchableOpacity
                  style={styles.bottomBorder}
                  onPress={() => {
                    setSelectCategories(category);
                    handleOutsideClick();
                  }}
                >
                  <Text className="text-black font-gilroyMedium py-3 px-2 text-base">
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        <View className="px-5">
          <Text className="font-gilroySemibold text-lg pb-3">
            Upload Images
          </Text>
          <Text className="font-gilroyMedium text-sm">
            You can upload up to 20 images
          </Text>
          <View className="py-3 bg-gray-200">
            <ImageUploadComponent />
          </View>
        </View>
        <View className="items-center flex-1 ">
          <View className="flex-row mx-3 pb-2">
            <AppTextInput
              control={control}
              name="youtube"
              placeholder="Youtube Video Link"
              viewStyle="border-0 bg-white py-3 rounded-l-xl px-2"
            />
            <View className="bg-white justify-center rounded-r-xl px-2">
              <Text className="font-gilroyMedium text-base">(Optional)</Text>
            </View>
          </View>
          <View className="flex-row gap-2 items-center px-2">
            <TouchableOpacity
              className="bg-white p-4 rounded-xl flex-row justify-between gap-2 items-center py-3.5"
              activeOpacity={0.8}
              onPress={() => {
                handleDropdownToggle("flag");
              }}
            >
              <Image
                source={assets.flag}
                className="h-10 w-10"
                resizeMode="contain"
              />
              <Image
                source={
                  openDropdown === "flag" ? assets.upArrow : assets.downArrow
                }
                className="h-6 w-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
            {openDropdown === "flag" && (
              <View
                style={buttonShadow}
                className="bg-white w-[25%] rounded-xl p-2 absolute top-[65px] left-2 z-[999]"
              >
                {flags?.map((flag) => (
                  <TouchableOpacity
                    style={styles.bottomBorder}
                    className="items-center py-2"
                  >
                    <Image
                      source={flag}
                      className="h-10 w-10"
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
            <AppTextInput
              control={control}
              name="license"
              placeholder="Vehicle License Number"
              value={reg}
              onChangeText={(text) => setReg(text)}
              viewStyle="border-0 bg-white py-3 rounded-xl px-2"
            />
          </View>
          <View className="flex-row gap-2 items-center px-2 py-2">
            <AppTextInput
              control={control}
              name="mileage"
              placeholder="Mileage"
              viewStyle="border-0 bg-white py-2.5 mb-0 rounded-xl px-2"
              keyboardType="number-pad"
            />
            <TouchableOpacity
              className="bg-white p-4 rounded-xl flex-row justify-between gap-2 items-center py-6 w-[24%]"
              activeOpacity={0.8}
              onPress={() => handleDropdownToggle("mileage")}
            >
              <Text
                className={`text-base px-1 ${
                  selectMilageType
                    ? "font-gilroyMedium text-black"
                    : "font-gilroyMedium text-grey"
                }`}
              >
                {selectMilageType ? selectMilageType : "Km"}
              </Text>
              <Image
                source={
                  openDropdown === "mileage" ? assets.upArrow : assets.downArrow
                }
                className="h-6 w-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
            {openDropdown === "mileage" && (
              <View
                style={buttonShadow}
                className="bg-white w-[25%] rounded-xl p-2 absolute top-[75px] right-2 z-[999]"
              >
                {mileage?.map((mileage) => (
                  <TouchableOpacity
                    style={styles.bottomBorder}
                    onPress={() => {
                      setSelectMilageType(mileage);
                      handleOutsideClick();
                    }}
                  >
                    <Text className="text-black font-gilroyMedium py-3 px-2 text-base">
                      {mileage}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          <AppTextInput
            control={control}
            name="price"
            placeholder="$ Price"
            viewStyle="border-0 bg-white py-3 w-[95%] rounded-xl px-2"
            keyboardType="number-pad"
          />
          <AppTextInput
            control={control}
            name="desc"
            placeholder="Description"
            viewStyle="border-0 bg-white py-3 pb-20 w-[95%] rounded-xl px-2"
            textAlignVertical="top"
          />
        </View>
        <View className=" flex-1 ">
          <Text className="font-gilroySemibold text-lg px-5 pb-4">
            Contact Details
          </Text>
          <AppTextInput
            control={control}
            name="name"
            placeholder="Full Name"
            viewStyle="border-0 bg-white py-3 w-[95%] self-center rounded-xl px-2"
          />
          <AppTextInput
            control={control}
            name="email"
            placeholder="Email Address"
            viewStyle="border-0 bg-white py-3 self-center w-[95%] rounded-xl px-2"
          />
          <AppTextInput
            control={control}
            name="number"
            placeholder="Phone Number"
            viewStyle="border-0 bg-white py-3 self-center w-[95%] rounded-xl px-2"
            placeholderTextColor="black"
          />
          <View>
            <TouchableOpacity
              className="bg-white p-4 rounded-xl flex-row justify-between gap-2 items-center mb-4 mx-2.5 py-6 w-[95%]"
              activeOpacity={0.8}
              onPress={() => handleDropdownToggle("country")}
            >
              <Text
                className={`text-base px-1 ${
                  selectCountry
                    ? "font-gilroyMedium text-black"
                    : "font-gilroyMedium text-grey"
                }`}
              >
                {selectCountry ? selectCountry : "Select Country"}
              </Text>
              <Image
                source={
                  openDropdown === "country" ? assets.upArrow : assets.downArrow
                }
                className="h-6 w-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
            {openDropdown === "country" && (
              <View
                style={buttonShadow}
                className="bg-white w-[95%] rounded-xl p-2 absolute top-[70px] z-[999] self-center"
              >
                {countries?.map((country) => (
                  <TouchableOpacity
                    style={styles.bottomBorder}
                    onPress={() => {
                      setselectCountry(country);
                      handleOutsideClick();
                    }}
                  >
                    <Text className="text-black font-gilroyMedium py-3 px-2 text-base">
                      {country}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          <AppTextInput
            control={control}
            name="area"
            placeholder="Area"
            viewStyle="border-0 bg-white py-3 self-center w-[95%] rounded-xl px-2"
          />
        </View>
        <View className=" flex-1">
          <Text className="font-gilroySemibold text-lg px-5 pb-3">
            Seller Type
          </Text>
          <Text className="text-black font-gilroyMedium px-5">
            Choose what type of seller are you?
          </Text>
          <View className="flex-row gap-16 py-4 px-4">
            <RadioButton
              label="Car Dealer"
              value="individual"
              selectedValue={selectedValue}
              onPress={() => setSelectedValue("individual")}
            />
            <RadioButton
              label="Private Seller"
              value="company"
              selectedValue={selectedValue}
              onPress={() => setSelectedValue("company")}
            />
          </View>
          <AppTextInput
            control={control}
            name="finance"
            placeholder="Enter Monthly Finance Price"
            viewStyle="border-0 bg-white py-3 self-center w-[95%] rounded-xl px-2"
          />
          <View className="bg-white flex-1 mx-2 rounded-xl gap-4 px-4 py-5 mb-4">
            <Text className="font-gilroySemibold text-base">Ad Details</Text>
            <Text className="font-gilroySemibold text-sm">
              Standard Car Post
            </Text>
            <View className="flex-row  items-center gap-3">
              <Image
                source={assets.greenTick}
                className="h-[20px] w-[20px]"
                resizeMode="contain"
              />
              <Text className="font-gilroyMedium text-xs text-black">
                30 Days Car Listing
              </Text>
            </View>
            <View className="flex-row  items-center gap-3">
              <Image
                source={assets.greenTick}
                className="h-[20px] w-[20px]"
                resizeMode="contain"
              />
              <Text className="font-gilroyMedium text-xs">Upto 20 Images</Text>
            </View>
            <View className="flex-row  items-center gap-3">
              <Image
                source={assets.greenTick}
                className="h-[20px] w-[20px]"
                resizeMode="contain"
              />
              <Text className="font-gilroyMedium text-xs">
                2x Bump up to the top
              </Text>
            </View>
          </View>
          <View className="flex-row items-center gap-4 mb-4 self-center">
            <AppButton
              title="Preview Ad"
              buttonStyle="border-2 rounded-xl px-11 py-4 border-green bg-white"
              textStyle="text-green font-gilroySemibold text-lg"
            />
            <AppButton
              title="Post Ad/Pay"
              buttonStyle="border-2 rounded-xl px-11 py-4 border-green bg-green"
              textStyle="text-white  font-gilroySemibold text-lg"
              onPress={handlePostAd}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateAd;
const styles = StyleSheet.create({
  bottomBorder: {
    borderBottomColor: style.borderGray.borderColor,
    borderBottomWidth: 0.5,
  },
});
