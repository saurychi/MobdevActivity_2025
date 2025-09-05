// app/profile.tsx (or any screen file)
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Profile() {
  const [name, setName] = useState("Walter White");
  const [email, setEmail] = useState("walter@example.com");
  const [username, setUsername] = useState("heisenberg");
  const [dob, setDob] = useState("Jan 07, 1990");
  const [gender, setGender] = useState<"male" | "female" | "other">("male");

  return (
    <LinearGradient
      colors={["#444", "#000"]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header / avatar */}
        <View style={styles.header}>
          <View>
            <Image
              source={require("@/assets/images/Spotify_icon.png")}
              style={styles.avatar}
            />
            <Pressable style={styles.avatarEdit} onPress={() => {}}>
              <Feather name="camera" size={16} color="#fff" />
            </Pressable>
          </View>

          <View style={{ alignItems: "center", gap: 6 }}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.email}>{email}</Text>

            <View style={styles.statsRow}>
              <Stat label="Playlists" value="12" />
              <View style={styles.dot} />
              <Stat label="Followers" value="842" />
              <View style={styles.dot} />
              <Stat label="Following" value="131" />
            </View>
          </View>
        </View>

        {/* Editable fields */}
        <Section title="Profile">
          <LabeledInput
            label="Display Name"
            value={name}
            onChangeText={setName}
            icon={<Feather name="user" size={18} color="#aaa" />}
          />
          <LabeledInput
            label="Username"
            value={username}
            onChangeText={setUsername}
            icon={<Feather name="at-sign" size={18} color="#aaa" />}
          />
          <LabeledInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            icon={<Feather name="mail" size={18} color="#aaa" />}
          />
          <LabeledInput
            label="Date of Birth"
            value={dob}
            onChangeText={setDob}
            icon={<Feather name="calendar" size={18} color="#aaa" />}
          />
          <View style={styles.row}>
            <Text style={styles.label}>Gender</Text>
            <View style={styles.genderRow}>
              {(["male", "female", "other"] as const).map((g) => (
                <Pressable
                  key={g}
                  onPress={() => setGender(g)}
                  style={[
                    styles.pill,
                    gender === g && styles.pillActive,
                  ]}
                >
                  <Text
                    style={gender === g ? styles.pillTextActive : styles.pillText}
                  >
                    {g[0].toUpperCase() + g.slice(1)}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </Section>

        {/* Connected accounts */}
        <Section title="Connected Accounts">
          <View style={styles.socialRow}>
            <Pressable style={[styles.iconButton, { backgroundColor: "#DB4437" }]} onPress={() => {}}>
              <AntDesign name="google" size={20} color="white" />
            </Pressable>
            <Pressable style={[styles.iconButton, { backgroundColor: "#1877F2" }]} onPress={() => {}}>
              <Ionicons name="logo-facebook" size={20} color="white" />
            </Pressable>
          </View>
        </Section>

        <View style={{ gap: 12 }}>
          <Pressable style={styles.primaryBtn} onPress={() => {}}>
            <Text style={styles.primaryBtnText}>Save Changes</Text>
          </Pressable>
          <Pressable style={styles.secondaryBtn} onPress={() => router.back()}>
            <Text style={styles.secondaryBtnText}>Back</Text>
          </Pressable>
          <Pressable style={styles.dangerBtn} onPress={() => {}}>
            <Text style={styles.dangerBtnText} onPress={() => router.push("../Authentication/spotifyLogin")}>Log Out</Text>
          </Pressable>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

/* Reusable bits */
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ color: "#fff", fontWeight: "800" }}>{value}</Text>
      <Text style={{ color: "#aaa", fontSize: 12 }}>{label}</Text>
    </View>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={{ gap: 10 }}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.card}>{children}</View>
    </View>
  );
}

function LabeledInput({
  label,
  icon,
  ...props
}: {
  label: string;
  icon?: React.ReactNode;
} & React.ComponentProps<typeof TextInput>) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrap}>
        {icon && <View style={{ width: 22, alignItems: "center" }}>{icon}</View>}
        <TextInput
          placeholderTextColor="#888"
          style={styles.input}
          {...props}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: {
    paddingHorizontal: 24,
    paddingVertical: 28,
    gap: 20,
  },

  header: {
    alignItems: "center",
    gap: 14,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  avatarEdit: {
    position: "absolute",
    right: -2,
    bottom: -2,
    backgroundColor: "#1DB954",
    borderRadius: 14,
    padding: 6,
    borderWidth: 2,
    borderColor: "#000",
  },
  name: { color: "#fff", fontSize: 22, fontWeight: "800" },
  email: { color: "#aaa" },

  statsRow: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  dot: {
    width: 4, height: 4, borderRadius: 2, backgroundColor: "#555",
  },

  sectionTitle: {
    color: "#eee",
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  card: {
    backgroundColor: "#161b22",
    borderRadius: 16,
    padding: 14,
    gap: 12,
  },

  row: { gap: 6 },
  label: { color: "#bbb", marginLeft: 4, fontSize: 12 },

  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#222",
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 48,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },

  genderRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 4,
  },
  pill: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: "#222",
  },
  pillActive: { backgroundColor: "#1DB954" },
  pillText: { color: "#ddd", fontWeight: "600" },
  pillTextActive: { color: "#fff", fontWeight: "800" },

  socialRow: {
    flexDirection: "row",
    gap: 12,
  },

  primaryBtn: {
    backgroundColor: "#1DB954",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
  },
  primaryBtnText: { color: "#fff", fontWeight: "800" },

  secondaryBtn: {
    backgroundColor: "#222",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
  },
  secondaryBtnText: { color: "#fff", fontWeight: "700" },

  dangerBtn: {
    backgroundColor: "#2a2a2a",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
  },
  dangerBtnText: { color: "#ff6b6b", fontWeight: "800" },
    iconButton: {
        height: 55,
        width: 55,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
    },
});
