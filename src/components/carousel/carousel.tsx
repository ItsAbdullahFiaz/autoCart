import style from "@/utils/style";
import React from "react";
import { View, StyleSheet } from "react-native";

const CustomPagination = ({ data, currentIndex }) => {
  return (
    <View className="flex-row absolute bottom-5 self-center">
      {data?.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === currentIndex ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    alignSelf: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: style.whiteBackground.backgroundColor,
  },
  inactiveDot: {
    backgroundColor: style.shadowGray.shadowColor,
  },
});

export default CustomPagination;
