import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

export default function SpotifySignup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [gender, setGender] = useState<"male" | "female" | null>(null);

  const onChangeDob = (_: any, selected?: Date) => {
    setShowPicker(false);
    if (selected) setDob(selected);
  };

  const dobLabel = dob ? dob.toLocaleDateString() : "Select date of birth";

  return (
    <LinearGradient
      colors={["#444", "#000"]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/Spotify_icon.png")}
          style={{ width: 90, height: 90 }}
        />
        <Text style={styles.title}>Create account</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Username"
          placeholderTextColor="#aaa"
          autoCapitalize="none"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        {/* Date of Birth */}
        <Pressable onPress={() => setShowPicker(true)} style={styles.inputLike}>
          <Text style={dob ? styles.inputText : styles.placeholder}>{dobLabel}</Text>
        </Pressable>
        {showPicker && (
          <DateTimePicker
            value={dob ?? new Date(2000, 0, 1)}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onChangeDob}
            maximumDate={new Date()}
          />
        )}

        {/* Gender */}
        <View style={styles.genderRow}>
          <Pressable
            onPress={() => setGender("male")}
            style={[
              styles.genderPill,
              gender === "male" && styles.genderPillActive,
            ]}
          >
            <Text style={gender === "male" ? styles.genderTextActive : styles.genderText}>
              Male
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setGender("female")}
            style={[
              styles.genderPill,
              gender === "female" && styles.genderPillActive,
            ]}
          >
            <Text style={gender === "female" ? styles.genderTextActive : styles.genderText}>
              Female
            </Text>
          </Pressable>
        </View>

        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Sign up</Text>
        </Pressable>

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Or Connect With…</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialRow}>
          <Pressable style={[styles.iconButton, { backgroundColor: "#DB4437" }]}>
            <AntDesign name="google" size={20} color="white" />
          </Pressable>
          <Pressable style={[styles.iconButton, { backgroundColor: "#1877F2" }]}>
            <FontAwesome name="facebook" size={20} color="white" />
          </Pressable>
        </View>

        <View style={styles.footer}>
          <Text style={{ color: "#aaa" }}>Already have an account?</Text>
          <Pressable onPress={() => router.push("../Authentication/spotifyLogin")}>
            <Text style={styles.signup}>Log in</Text>
          </Pressable>
        </View>
      </View>


    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 48,
    gap: 50,
  },
  header: {
    alignItems: "center",
    marginTop: 40,
    gap: 10,
  },
  title: { fontSize: 28, fontWeight: "bold", color: "#fff" },

  form: {
    gap: 14,
  },
  input: {
    backgroundColor: "#222",
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: "#fff",
    height: 56,
    fontSize: 16,
  },
  inputLike: {
    backgroundColor: "#222",
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 16,
    height: 56,
    justifyContent: "center",
  },
  placeholder: { color: "#aaa", fontSize: 16 },
  inputText: { color: "#fff", fontSize: 16 },

  genderRow: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
    marginTop: 4,
  },
  genderPill: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 22,
    backgroundColor: "#222",
  },
  genderPillActive: {
    backgroundColor: "#1DB954",
  },
  genderText: {
    color: "#ddd",
    fontWeight: "600",
  },
  genderTextActive: {
    color: "#fff",
    fontWeight: "800",
  },

  button: {
    backgroundColor: "#1DB954",
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 6,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  signup: { color: "#1DB954", fontWeight: "bold" },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  iconButton: {
    height: 55,
    width: 55,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 8,
    marginBottom: 4,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#2a2a2a",
  },
  dividerText: {
    color: "#aaa",
    fontSize: 12,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
});
