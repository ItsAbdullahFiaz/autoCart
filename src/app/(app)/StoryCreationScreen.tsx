import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import apiClient from "@/api/api.client";

const addStory = async ({ text, image }) => {
  return await apiClient.post("users/stories", { text, image });
};

const StoryCreationScreen: React.FC = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: { text: string; image: string }) => addStory(data),
    onSuccess: () => {
      // Invalidate and refetch queries after successful mutation
      queryClient.invalidateQueries({
        queryKey: ["stories"],
      });
      router.back();
    },
  });
  const [storyText, setStoryText] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fadeAnim] = useState<Animated.Value>(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      //   allowsEditing: true,
      quality: 1,
      base64: true,
      //   aspect:[10,20]
    });

    if (!result.canceled) {
      setSelectedImage(
        `data:${result.assets[0].mimeType};base64,${result.assets[0].base64}`
      );
    }
  };

  const handlePostStory = () => {
    mutation.mutate({ text: storyText, image: selectedImage });
  };

  return (
    <View className="flex-1 bg-[#52a15a] relative">
      <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
        {selectedImage ? (
          <Image
            source={{ uri: selectedImage }}
            className="w-full h-full "
            resizeMode="center"
          />
        ) : (
          <Image
            source={require("../../../assets/images/placeholder.png")}
            className="w-full h-full"
            resizeMode="center"
          />
        )}
      </TouchableOpacity>

      <TouchableOpacity
        className="absolute top-6 right-3 px-4 bg-white rounded-lg p-2 shadow-lg"
        onPress={handlePostStory}
      >
        <Text className="text-lg text-[#52a15a] font-bold">Post</Text>
      </TouchableOpacity>

      <View className="absolute bottom-6 left-0 right-0 items-center shadow-2xl p-1">
        <TextInput
          className="bg-white rounded-lg p-4 text-lg text-black w-[96%]"
          placeholder="Add a caption for your story..."
          placeholderTextColor="#999"
          value={storyText}
          onChangeText={setStoryText}
          multiline
        />
      </View>
    </View>
  );
};

export default StoryCreationScreen;
