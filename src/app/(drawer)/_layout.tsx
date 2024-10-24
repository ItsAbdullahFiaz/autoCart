import { Drawer } from "expo-router/drawer";
import CustomDrawer from "../(app)/drawerContent";
import { useUserStore } from "@/store";

export default function Layout() {
  return (
    <Drawer
      drawerContent={() => <CustomDrawer />}
      screenOptions={{
        drawerType: "front",
        drawerPosition: "right",
        headerShown: false,
        overlayColor: "rgba(0, 0, 0, 0.7)",
      }}
    ></Drawer>
  );
}
