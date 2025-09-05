// app/settings.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Pressable,
  Alert,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifyNewReleases, setNotifyNewReleases] = useState(true);
  const [notifyRecommendations, setNotifyRecommendations] = useState(false);
  const [downloadOnlyWifi, setDownloadOnlyWifi] = useState(true);

  const confirmLogout = () =>
    Alert.alert("Log out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Log out", style: "destructive", onPress: () => {/* TODO: signOut() */} },
    ]);

  const confirmDelete = () =>
    Alert.alert(
      "Delete account",
      "This will permanently remove your account and data.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => {/* TODO: delete flow */} },
      ]
    );

  return (
    <LinearGradient
      colors={["#444", "#000"]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>

        {/* Account */}
        <Section title="Account">
          <Row
            icon={<Feather name="user" size={18} color="#aaa" />}
            label="Profile"
            right={<Ionicons name="chevron-forward" size={18} color="#888" />}
            onPress={() => router.push("/profile")}
          />
          <Row
            icon={<Feather name="lock" size={18} color="#aaa" />}
            label="Change Password"
            right={<Ionicons name="chevron-forward" size={18} color="#888" />}
          />
          <Row
            icon={<Feather name="map-pin" size={18} color="#aaa" />}
            label="Location"
            right={<Text style={styles.rightText}>Philippines</Text>}
          />
        </Section>

        {/* Preferences */}
        <Section title="Preferences">
          <ToggleRow
            icon={<Ionicons name="moon" size={18} color="#aaa" />}
            label="Dark Mode"
            value={darkMode}
            onValueChange={setDarkMode}
          />
          <ToggleRow
            icon={<Feather name="wifi" size={18} color="#aaa" />}
            label="Download over Wi-Fi only"
            value={downloadOnlyWifi}
            onValueChange={setDownloadOnlyWifi}
          />
          <Row
            icon={<Feather name="globe" size={18} color="#aaa" />}
            label="Language"
            right={<Text style={styles.rightText}>English</Text>}
          />
          <Row
            icon={<Feather name="music" size={18} color="#aaa" />}
            label="Streaming Quality"
            right={<Text style={styles.rightText}>High</Text>}
          />
        </Section>

        {/* Notifications */}
        <Section title="Notifications">
          <ToggleRow
            icon={<Ionicons name="notifications" size={18} color="#aaa" />}
            label="New releases"
            value={notifyNewReleases}
            onValueChange={setNotifyNewReleases}
          />
          <ToggleRow
            icon={<Ionicons name="notifications-outline" size={18} color="#aaa" />}
            label="Recommendations"
            value={notifyRecommendations}
            onValueChange={setNotifyRecommendations}
          />
        </Section>

        {/* Connected Accounts */}
        <Section title="Connected Accounts">
          <Row
            icon={
              <View style={[styles.socialIcon, { backgroundColor: "#DB4437" }]}>
                <AntDesign name="google" size={14} color="#fff" />
              </View>
            }
            label="Google"
            right={<Text style={styles.rightText}>Connected</Text>}
          />
          <Row
            icon={
              <View style={[styles.socialIcon, { backgroundColor: "#1877F2" }]}>
                <Ionicons name="logo-facebook" size={14} color="#fff" />
              </View>
            }
            label="Facebook"
            right={<Text style={styles.rightText}>Connect</Text>}
          />
        </Section>

        {/* About */}
        <Section title="About">
          <Row
            icon={<Feather name="info" size={18} color="#aaa" />}
            label="App Version"
            right={<Text style={styles.rightText}>1.0.0</Text>}
          />
          <Row
            icon={<Feather name="file-text" size={18} color="#aaa" />}
            label="Terms & Privacy"
            right={<Ionicons name="chevron-forward" size={18} color="#888" />}
          />
        </Section>

        {/* Danger zone */}
        <Pressable style={styles.primaryBtn} onPress={confirmLogout}>
          <Text style={styles.primaryBtnText}>Log Out</Text>
        </Pressable>
        <Pressable style={styles.dangerBtn} onPress={confirmDelete}>
          <Text style={styles.dangerBtnText}>Delete Account</Text>
        </Pressable>
      </ScrollView>
    </LinearGradient>
  );
}

/* Reusable components */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={{ gap: 10 }}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.card}>{children}</View>
    </View>
  );
}

function Row({
  icon,
  label,
  right,
  onPress,
}: {
  icon?: React.ReactNode;
  label: string;
  right?: React.ReactNode;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.row}>
      {icon && <View style={{ width: 24, alignItems: "center" }}>{icon}</View>}
      <Text style={styles.rowLabel}>{label}</Text>
      <View style={{ flex: 1 }} />
      {right}
    </Pressable>
  );
}

function ToggleRow({
  icon,
  label,
  value,
  onValueChange,
}: {
  icon?: React.ReactNode;
  label: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
}) {
  return (
    <View style={styles.row}>
      {icon && <View style={{ width: 24, alignItems: "center" }}>{icon}</View>}
      <Text style={styles.rowLabel}>{label}</Text>
      <View style={{ flex: 1 }} />
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
}

/* Styles */
const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 16,
  },

  header: {
    alignItems: "center",
    marginBottom: 4,
  },
  title: { color: "#fff", fontSize: 24, fontWeight: "800" },

  sectionTitle: {
    color: "#eee",
    fontWeight: "700",
    fontSize: 12,
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  card: {
    backgroundColor: "#161b22",
    borderRadius: 14,
    padding: 8,
    gap: 4,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  rowLabel: { color: "#fff", fontSize: 16, fontWeight: "600" },
  rightText: { color: "#bbb", fontWeight: "600" },

  socialIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },

  primaryBtn: {
    backgroundColor: "#222",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  primaryBtnText: { color: "#fff", fontWeight: "800" },

  dangerBtn: {
    backgroundColor: "#2a2a2a",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  dangerBtnText: { color: "#ff6b6b", fontWeight: "800" },
});
