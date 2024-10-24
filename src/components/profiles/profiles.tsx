import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import { assets } from "assets";
import { StyleSheet } from "react-native";
import { useUserStore } from "@/store";
import { useEffect, useRef } from "react";
import InstagramStories from "@birdwingo/react-native-instagram-stories";
import apiClient from "@/api/api.client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";

const fetchItems = async () => {
  const { data } = await apiClient.get("/users/following/stories");
  console.log(JSON.stringify(data?.stories));

  return data;
};

const deleteStory = async (id: string) => {
  return await apiClient.delete(`users/stories/${id}`);
};

const Profiles = () => {
  const userStore = useUserStore((state) => state);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: string) => deleteStory(data),
    onSuccess: () => {
      // Invalidate and refetch queries after successful mutation
      queryClient.invalidateQueries({
        queryKey: ["stories"],
      });
    },
  });
  const { data, error, isLoading } = useQuery({
    queryKey: ["stories"],
    queryFn: fetchItems,
  });
  useEffect(() => {
    console.log(JSON.stringify(data?.stories));
  }, []);

  const ref = useRef(null);
  const handleDeleteStory = (id: string) => {
    mutation.mutate(id);
  };
  const transformedData = data?.stories?.map((storyItem) => ({
    id: storyItem?.user?._id,
    name: storyItem?.user?.username,

    avatarSource: {
      uri: storyItem?.user["profilePicture"],
      width: 40,
    },

    stories: storyItem?.stories?.map((story) => ({
      id: story?._id,
      source: {
        uri: story?.image,
      },
      renderFooter() {
        return story.text ? (
          <>
            <View className="bg-primary w-full p-3">
              <Text style={{ color: "#fff" }}>{story.text}</Text>
            </View>
            {storyItem?.user?._id === userStore?._id && (
              <TouchableOpacity
                onPress={() => handleDeleteStory(story?._id)}
                className="bg-darkRed w-full items-center justify-center p-3"
              >
                <Text className="text-lg text-white">{"Delete"}</Text>
              </TouchableOpacity>
            )}
          </>
        ) : storyItem?.user?._id === userStore?._id ? (
          <TouchableOpacity
            onPress={() => handleDeleteStory(story?._id)}
            className="bg-darkRed w-full items-center justify-center p-3"
          >
            <Text className="text-sm text-white">{"Delete"}</Text>
          </TouchableOpacity>
        ) : null;
      },
    })),
  }));

  const RenderProfiles = ({ item }) => {
    return (
      <View className="m-2">
        <View
          className={`p-0.5 ${
            item._id ? "border-2 border-primary rounded-3xl" : ""
          } h-18 w-18 self-center`}
        >
          {item?.profilePicture ? (
            <TouchableOpacity
              className="rounded-3xl overflow-hidden h-16 w-16 self-center items-center justify-center "
              onPress={() => router.push("(app)/StoryCreationScreen")}
            >
              <ImageBackground
                source={{ uri: item?.profilePicture }}
                className="rounded-3xl h-16 w-16  justify-center items-center"
                children={
                  <Image source={assets.addIcon} style={styles.addIcon} />
                }
              />
            </TouchableOpacity>
          ) : item._id === userStore?._id ? (
            <View className="rounded-3xl h-16 w-16 self-center items-center justify-center ">
              <TouchableOpacity
                onPress={() => router.push("(app)/StoryCreationScreen")}
              >
                <Image source={assets.addIcon} style={styles.addIcon} />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
        <Text
          className={`${
            item?._id
              ? "text-sm self-center top-1 font-gilroyMedium"
              : "text-sm self-center font-gilroyMedium"
          }`}
        >
          Add Story
        </Text>
      </View>
    );
  };
  return (
    <View className="flex-row bg-white">
      <RenderProfiles item={userStore} />
      <InstagramStories
        ref={ref}
        stories={transformedData || []}
        avatarSize={56}
        storyAvatarSize={40}
        progressColor="#52a15a"
        loopingStories={"none"}
        avatarListContainerProps={{ className: "pt-2 space-x-4" }}
        nameTextProps={{
          className: "text-sm self-center top-1 font-gilroyMedium text-black",
        }}
        textStyle={{ color: "white", fontSize: 16 }}
        showName={true}
        avatarBorderColors={["#52a15a", "#52a15a"]}
        animationDuration={5000}
      />
    </View>
  );
};

export default Profiles;

const styles = StyleSheet.create({
  addIcon: { height: 22, width: 22 },
  addIconView: { bottom: -5, right: -3 },
});
