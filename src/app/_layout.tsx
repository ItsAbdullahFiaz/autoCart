import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../global.css";
import { Stack, useRouter, useSegments, withLayoutContext } from "expo-router";
import React, { useEffect } from "react";
import { useAuthStore } from "@/store";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  createStackNavigator,
  StackNavigationEventMap,
  StackNavigationOptions,
  TransitionPresets,
} from "@react-navigation/stack";
import { ParamListBase, StackNavigationState } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { LogBox } from "react-native";
const { Navigator } = createStackNavigator();
export const JsStack = withLayoutContext<
  StackNavigationOptions,
  typeof Navigator,
  StackNavigationState<ParamListBase>,
  StackNavigationEventMap
>(Navigator);
const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
    mutations: {
      onError: (error) => {
        if ("message" in error) {
          console.error(error.message);
        }
      },
    },
  },
});

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const rootSegment = useSegments()[0];
  const token = useAuthStore((state) => state.token);
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    "Gilroy-Bold": require("../../assets/fonts/Gilroy-Bold.ttf"),
    "Gilroy-Light": require("../../assets/fonts/Gilroy-Light.ttf"),
    "Gilroy-Medium": require("../../assets/fonts/Gilroy-Medium.ttf"),
    "Gilroy-Regular": require("../../assets/fonts/Gilroy-Regular.ttf"),
    "Gilroy-SemiBold": require("../../assets/fonts/Gilroy-SemiBold.ttf"),
    "Gilroy-ExtraBold": require("../../assets/fonts/Gilroy-ExtraBold.ttf"),
    "Gilroy-Heavy": require("../../assets/fonts/Gilroy-Heavy.ttf"),

    "Montserrat-Bold": require("../../assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Black": require("../../assets/fonts/Montserrat-Black.ttf"),
    "Montserrat-ExtraBold": require("../../assets/fonts/Montserrat-ExtraBold.ttf"),
    "Montserrat-ExtraLight": require("../../assets/fonts/Montserrat-ExtraLight.ttf"),
    "Montserrat-Light": require("../../assets/fonts/Montserrat-Light.ttf"),
    "Montserrat-Medium": require("../../assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-Regular": require("../../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-SemiBold": require("../../assets/fonts/Montserrat-SemiBold.ttf"),
    "Montserrat-Thin": require("../../assets/fonts/Montserrat-Thin.ttf"),
  });

  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.preventAutoHideAsync();
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await SplashScreen.hideAsync();
    };
    prepare();
  }, []);

  React.useEffect(() => {
    if (fontsLoaded) {
      if (token === undefined) return;
      if (!token && rootSegment !== "(auth)") {
        router.replace("/(auth)/login");
      } else if (
        token &&
        rootSegment !== "(drawer)" &&
        rootSegment !== "(app)"
      ) {
        router.replace("(drawer)/(tab)/home");
      } else if (
        token &&
        rootSegment !== "(app)" &&
        rootSegment === "(drawer)/(tab)/home"
      ) {
        router.replace("(app)/sellerProfile");
      }
    }
  }, [token, rootSegment, fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }
  LogBox.ignoreAllLogs();

  return (
    <QueryClientProvider client={client}>
      <StatusBar style="auto" />
      <SafeAreaView style={{ flex: 1 }}>
        <JsStack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)/login" />
          <Stack.Screen name="(auth)/forgotPassword" />
          <JsStack.Screen
            name="(app)/filter"
            options={{
              ...TransitionPresets.SlideFromRightIOS,
              presentation: "transparentModal",
              gestureEnabled: true,
            }}
          />
          <JsStack.Screen
            name="(app)/cameraScreen"
            options={{
              ...TransitionPresets.DefaultTransition,
              presentation: "modal",
              gestureEnabled: true,
            }}
          />
          <Stack.Screen name="(drawer)" />
        </JsStack>
      </SafeAreaView>
    </QueryClientProvider>
  );
}
