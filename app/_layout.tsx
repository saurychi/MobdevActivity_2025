import { Stack } from "expo-router";
import { View } from "react-native";

// Create a custom layout wrapper
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <View style={{ flex: 1, backgroundColor: "#121212" }}>
      {children}
    </View>
  );
}

export default function RootLayout() {
  return (
    <Layout>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" /> {/* Sign In */}
        <Stack.Screen name="Signup" /> {/* Sign Up */}
        <Stack.Screen
          name="(drawer)"
          options={{ headerShown: false }}
        />
      </Stack>
    </Layout>
  );
}
