// app/(drawer)/_layout.tsx
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        drawerStyle: { backgroundColor: "#181818", width: 240 },
        drawerActiveTintColor: "#1DB954",
        drawerInactiveTintColor: "white",
      }}
    >
      {/* 👇 This points to /app/(drawer)/profile/index.tsx */}
      <Drawer.Screen
        name="profile"
        options={{
          title: "Profile",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="playlist"
        options={{
          title: "Playlists",
          drawerIcon: ({ color, size }) => (
            <Feather name="music" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="playlist/Settings"
        options={{
          title: "Settings",
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="settings" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="SoundTownScreen"
        options={{
          title: "Sound Town",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="map-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
