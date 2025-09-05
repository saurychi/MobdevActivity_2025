import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";

export default function SpotifyLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
          style={{ width: 100, height: 100 }}
        />
        <Text style={styles.title}>Spotify</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          placeholder="Username"
          placeholderTextColor="#aaa"
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

        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
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
          <Text style={{ color: "#aaa" }}>Don't have an account?</Text>
          <Pressable onPress={() => router.push("../Authentication/spotifySignup")}>
            <Text style={styles.signup}>Sign up</Text>
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
    paddingVertical: 60,
    gap: 120,
  },
  header: {
    alignItems: "center",
    gap: 12,
    marginTop: 70,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  form: {
    gap: 16,
  },
  input: {
    backgroundColor: "#222",
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: "#fff",
    height: 60,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#1DB954",
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
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
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  signup: {
    color: "#1DB954",
    fontWeight: "bold",
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
