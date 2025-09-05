// app/playlist.tsx
import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

type Track = {
  id: string;
  title: string;
  artist: string;
  cover: any; // require(...) or uri
  playedAt?: string;
};

type Playlist = {
  id: string;
  name: string;
  cover: any;
  tracks: number;
};

const MOCK_RECENT: Track[] = [
  {
    id: "t1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    cover: { uri: "https://i.scdn.co/image/ab67616d0000b2733f08d1bd3d8f6d1f8771ca1c" },
    playedAt: "3m ago",
  },
  {
    id: "t2",
    title: "Levitating",
    artist: "Dua Lipa",
    cover: { uri: "https://i.scdn.co/image/ab67616d0000b273ee7f8fb32a5a3d8eaaf2a2d1" },
    playedAt: "11m ago",
  },
  {
    id: "t3",
    title: "As It Was",
    artist: "Harry Styles",
    cover: { uri: "https://i.scdn.co/image/ab67616d0000b273b1a1ce1ae3a5a5c33de6b5b1" },
    playedAt: "1h ago",
  },
];

const MOCK_PLAYLISTS: Playlist[] = [
  {
    id: "p1",
    name: "Coding Focus",
    cover: require("@/assets/images/Spotify_icon.png"),
    tracks: 42,
  },
  {
    id: "p2",
    name: "Gym Pump",
    cover: { uri: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400" },
    tracks: 31,
  },
  {
    id: "p3",
    name: "Chill Vibes",
    cover: { uri: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400" },
    tracks: 58,
  },
];

export default function PlaylistScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // TODO: refetch tracks & playlists here
    setTimeout(() => setRefreshing(false), 800);
  }, []);

  return (
    <LinearGradient
      colors={["#444", "#000"]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#1DB954" />}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Your Library</Text>
          <Pressable onPress={() => router.push("/profile")}>
            <Feather name="user" size={20} color="#fff" />
          </Pressable>
        </View>

        {/* Liked Songs / Quick actions */}
        <View style={styles.quickRow}>
          <Pressable style={styles.quickCard}>
            <LinearGradient colors={["#4c1d95", "#6d28d9"]} style={styles.quickIcon}>
              <AntDesign name="heart" size={18} color="#fff" />
            </LinearGradient>
            <Text style={styles.quickText}>Liked Songs</Text>
          </Pressable>

          <Pressable style={styles.quickCard}>
            <LinearGradient colors={["#065f46", "#10b981"]} style={styles.quickIcon}>
              <Ionicons name="add" size={18} color="#fff" />
            </LinearGradient>
            <Text style={styles.quickText}>New Playlist</Text>
          </Pressable>
        </View>

        {/* Recently Played */}
        <SectionHeader title="Recently Played"/>
        <FlatList
          data={MOCK_RECENT}
          keyExtractor={(t) => t.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          contentContainerStyle={{ paddingHorizontal: 4 }}
          renderItem={({ item }) => (
            <Pressable style={styles.recentCard}>
              <Image source={item.cover} style={styles.recentCover} />
              <Text numberOfLines={1} style={styles.recentTitle}>{item.title}</Text>
              <Text numberOfLines={1} style={styles.recentArtist}>{item.artist} · {item.playedAt}</Text>
            </Pressable>
          )}
        />

        <SectionHeader title="Your Playlists"/>
        <View style={{ gap: 10 }}>
          {MOCK_PLAYLISTS.map((pl) => (
            <Pressable key={pl.id} style={styles.playlistRow}>
              <Image source={pl.cover} style={styles.playlistCover} />
              <View style={{ flex: 1 }}>
                <Text numberOfLines={1} style={styles.playlistName}>{pl.name}</Text>
                <Text style={styles.playlistMeta}>{pl.tracks} tracks</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#888" />
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <Pressable style={styles.miniPlayer}>
        <Image
          source={MOCK_RECENT[0].cover}
          style={{ width: 40, height: 40, borderRadius: 4 }}
        />
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={styles.miniTitle}>{MOCK_RECENT[0].title}</Text>
          <Text numberOfLines={1} style={styles.miniArtist}>{MOCK_RECENT[0].artist}</Text>
        </View>
        <Ionicons name="play-circle" size={28} color="#1DB954" />
      </Pressable>
    </LinearGradient>
  );
}

function SectionHeader({ title, onSeeAll }: { title: string; onSeeAll?: () => void }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {onSeeAll && (
        <Pressable onPress={onSeeAll}>
          <Text style={styles.seeAll}>See all</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 100,
    gap: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  title: { color: "#fff", fontSize: 24, fontWeight: "800" },

  quickRow: {
    flexDirection: "row",
    gap: 12,
  },
  quickCard: {
    flex: 1,
    backgroundColor: "#161b22",
    borderRadius: 14,
    padding: 12,
    gap: 10,
  },
  quickIcon: {
    width: 32, height: 32, borderRadius: 16,
    alignItems: "center", justifyContent: "center",
  },
  quickText: { color: "#eee", fontWeight: "700" },

  sectionHeader: {
    marginTop: 4,
    marginBottom: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    color: "#eee",
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  seeAll: { color: "#1DB954", fontWeight: "700" },

  recentCard: {
    width: 140,
    backgroundColor: "#161b22",
    borderRadius: 12,
    padding: 8,
    gap: 6,
  },
  recentCover: { width: "100%", height: 110, borderRadius: 8 },
  recentTitle: { color: "#fff", fontWeight: "700" },
  recentArtist: { color: "#aaa", fontSize: 12 },

  playlistRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#161b22",
    padding: 10,
    borderRadius: 12,
  },
  playlistCover: { width: 52, height: 52, borderRadius: 6 },
  playlistName: { color: "#fff", fontWeight: "700" },
  playlistMeta: { color: "#aaa", fontSize: 12 },

  miniPlayer: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 14,
    backgroundColor: "#161b22",
    borderRadius: 12,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  miniTitle: { color: "#fff", fontWeight: "700" },
  miniArtist: { color: "#bbb", fontSize: 12 },
});
