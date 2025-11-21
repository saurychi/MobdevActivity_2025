import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

// Predefined genres
const GENRES = ["Pop", "Rock", "Jazz", "Classical", "Hip-Hop"];

// Validation helpers
const validateUsername = (name: string) => /^[\w]{3,20}$/.test(name);
const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
const validateGenre = (genre: string) => GENRES.includes(genre);

export default function Profile() {
  const router = useRouter();
  const { newPhoto } = useLocalSearchParams(); // photo passed from CameraScreen

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [genre, setGenre] = useState("");
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  const [errors, setErrors] = useState({ username: "", email: "", genre: "" });

  // Load saved form and photo on mount
  useEffect(() => {
    const loadForm = async () => {
      const saved = await AsyncStorage.getItem("profileForm");
      const savedPhoto = await AsyncStorage.getItem("profilePhoto");
      if (savedPhoto) setProfilePhoto(savedPhoto);
      if (saved) {
        try {
          const data = JSON.parse(saved);
          setUsername(data.username || "");
          setEmail(data.email || "");
          setGenre(data.genre || "");
        } catch (e) {
          console.log("Failed to parse saved form", e);
        }
      }
    };
    loadForm();
  }, []);

  // Save form whenever inputs change
  useEffect(() => {
    AsyncStorage.setItem("profileForm", JSON.stringify({ username, email, genre }));
  }, [username, email, genre]);

  // When returning from CameraScreen
  useEffect(() => {
    if (newPhoto) {
      setProfilePhoto(String(newPhoto));
      AsyncStorage.setItem("profilePhoto", String(newPhoto));
    }
  }, [newPhoto]);

  // --- Handlers
  const handleUsernameChange = (text: string) => {
    setUsername(text);
    setErrors((prev) => ({
      ...prev,
      username: validateUsername(text) ? "" : "3–20 chars, alphanumeric/underscores",
    }));
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setErrors((prev) => ({
      ...prev,
      email: validateEmail(text) ? "" : "Invalid email format",
    }));
  };

  const handleGenreChange = (text: string) => {
    setGenre(text);
    setErrors((prev) => ({
      ...prev,
      genre: validateGenre(text) ? "" : "Select a valid genre",
    }));
  };

  const handleSubmit = async () => {
    const usernameValid = validateUsername(username);
    const emailValid = validateEmail(email);
    const genreValid = validateGenre(genre);

    if (usernameValid && emailValid && genreValid) {
      setErrors({ username: "", email: "", genre: "" });
      await AsyncStorage.removeItem("profileForm");
      alert("Profile submitted!");
    } else {
      alert("Please fix the errors first!");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
        <Ionicons name="settings-outline" size={24} color="white" />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        {/* Profile Info */}
        <Animated.View entering={FadeIn} style={styles.profileSection}>
          {/* Change Picture Button */}
          <TouchableOpacity
            onPress={() => router.push("/profile/CameraScreen")}
            style={{ marginBottom: 10 }}
          >
            <Text style={{ color: "#1DB954" }}>Change Profile Picture</Text>
          </TouchableOpacity>

          <Image
            source={
              profilePhoto
                ? { uri: profilePhoto }
                : require("../../../assets/images/profile-photo.jpg")
            }
            style={styles.profileImage}
          />

          <Text style={styles.name}>{username || "Walter Arnold Janssen Caballero"}</Text>
          <Text style={styles.username}>{email || "@saurychi"}</Text>
          {genre ? (
            <Text style={[styles.username, { marginTop: 4 }]}>
              Favorite Genre: {genre}
            </Text>
          ) : null}
        </Animated.View>

        {/* Stats */}
        <View style={styles.stats}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>4</Text>
            <Text style={styles.statLabel}>Playlists</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>10</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>10</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>

        {/* Form */}
        <View style={{ paddingHorizontal: 20 }}>
          <TextInput
            placeholder="Username"
            placeholderTextColor="#aaa"
            value={username}
            onChangeText={handleUsernameChange}
            style={[styles.input, errors.username && styles.inputError]}
          />
          {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}

          <TextInput
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
            style={[styles.input, errors.email && styles.inputError]}
          />
          {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

          <TextInput
            placeholder="Genre"
            placeholderTextColor="#aaa"
            value={genre}
            onChangeText={handleGenreChange}
            style={[styles.input, errors.genre && styles.inputError]}
          />
          {errors.genre ? <Text style={styles.errorText}>{errors.genre}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  headerText: { color: "white", fontSize: 24, fontWeight: "bold" },
  profileSection: { alignItems: "center", marginBottom: 30 },
  profileImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  name: { color: "white", fontSize: 22, fontWeight: "bold" },
  username: { color: "gray", fontSize: 14, marginTop: 4 },
  stats: { flexDirection: "row", justifyContent: "space-around", marginBottom: 30 },
  statBox: { alignItems: "center" },
  statNumber: { color: "white", fontSize: 18, fontWeight: "bold" },
  statLabel: { color: "gray", fontSize: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 10,
    padding: 12,
    marginVertical: 10,
    color: "white",
  },
  inputError: { borderColor: "red" },
  errorText: { color: "red", marginTop: -5, marginBottom: 5 },
  button: {
    backgroundColor: "#1DB954",
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: "center",
    marginVertical: 20,
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
