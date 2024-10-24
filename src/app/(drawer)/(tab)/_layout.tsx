import { Image, StyleSheet, View } from "react-native";
import { assets } from "@/index";
import {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import Header from "@/components/header/header";
import { deviceWidth } from "@/utils";
import style from "@/utils/style";
const { Navigator } = createMaterialTopTabNavigator();
export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);
export default function TabLayout() {
  return (
    <>
      <View className="bg-white w-[100%] pt-3 ">
        <Header />
      </View>
      <MaterialTopTabs
        tabBarPosition="top"
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 15,
          },
          tabBarIndicatorStyle: {
            alignSelf: "center",
            height: 0,
          },
          tabBarStyle: {
            height: 50,
          },
          tabBarItemStyle: {
            justifyContent: "center",
            alignItems: "center",
            width: deviceWidth / 5,
          },
        }}
      >
        <MaterialTopTabs.Screen
          name="home"
          options={{
            tabBarLabel: () => null,
            swipeEnabled: false,
            tabBarIcon: ({ focused }) => (
              <View className="align-center justify-center gap-2">
                <Image
                  source={assets.home}
                  style={[
                    styles.tabImage,
                    {
                      tintColor: focused
                        ? style.greenBackground.backgroundColor
                        : style.blackBackground.backgroundColor,
                    },
                  ]}
                />
                {focused ? (
                  <View style={styles.activeIndicatorStyle} />
                ) : (
                  <View style={styles.indicatorStyle} />
                )}
              </View>
            ),
          }}
        />
        <MaterialTopTabs.Screen
          name="discover"
          options={{
            tabBarLabel: () => null,
            swipeEnabled: false,
            tabBarIcon: ({ focused }) => (
              <View className="align-center justify-center gap-2">
                <Image
                  source={assets.discover}
                  style={[
                    styles.tabImage,
                    {
                      tintColor: focused
                        ? style.greenBackground.backgroundColor
                        : style.blackBackground.backgroundColor,
                    },
                  ]}
                />

                {focused ? (
                  <View style={styles.activeIndicatorStyle} />
                ) : (
                  <View style={styles.indicatorStyle} />
                )}
              </View>
            ),
          }}
        />
        <MaterialTopTabs.Screen
          name="scan"
          options={{
            tabBarLabel: () => null,
            swipeEnabled: false,
            tabBarIcon: ({ focused }) => (
              <View className="align-center justify-center gap-2">
                <Image
                  source={assets.scan}
                  style={[
                    styles.tabImage,
                    {
                      tintColor: focused
                        ? style.greenBackground.backgroundColor
                        : style.blackBackground.backgroundColor,
                    },
                  ]}
                />

                {focused ? (
                  <View style={styles.activeIndicatorStyle} />
                ) : (
                  <View style={styles.indicatorStyle} />
                )}
              </View>
            ),
          }}
        />
        <MaterialTopTabs.Screen
          name="message"
          options={{
            tabBarLabel: () => null,
            swipeEnabled: false,
            tabBarIcon: ({ focused }) => (
              <View className="align-center justify-center gap-2">
                <Image
                  source={assets.message}
                  style={[
                    styles.tabImage,
                    {
                      tintColor: focused
                        ? style.greenBackground.backgroundColor
                        : style.blackBackground.backgroundColor,
                    },
                  ]}
                />

                {focused ? (
                  <View style={styles.activeIndicatorStyle} />
                ) : (
                  <View style={styles.indicatorStyle} />
                )}
              </View>
            ),
          }}
        />
        <MaterialTopTabs.Screen
          name="setting"
          options={{
            tabBarLabel: () => null,
            swipeEnabled: false,
            tabBarIcon: ({ focused }) => (
              <View className="align-center justify-center">
                <Image
                  source={assets.setting}
                  style={[
                    styles.tabImage,
                    {
                      tintColor: focused
                        ? style.greenBackground.backgroundColor
                        : style.blackBackground.backgroundColor,
                    },
                  ]}
                />
                {focused ? (
                  <View style={[styles.activeIndicatorStyle, { top: 5 }]} />
                ) : (
                  <View style={styles.indicatorStyle} />
                )}
              </View>
            ),
          }}
        />
      </MaterialTopTabs>
    </>
  );
}
const styles = StyleSheet.create({
  indicatorStyle: {
    height: 2,
  },
  tabImage: {
    width: 25,
    height: 25,
    alignSelf: "center",
  },
  activeIndicatorStyle: {
    width: 35,
    height: 2,
    backgroundColor: style.greenBackground.backgroundColor,
    alignSelf: "center",
  },
});
