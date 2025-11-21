import { useLocalSearchParams } from "expo-router";
import React, { useReducer, useState } from "react";
import Animated, { Layout, FadeIn, FadeOut } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';


import {
    Button,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

// playlists array (same as in Playlists.tsx)
const playlists = [
  { id: "1", title: "Cabinet Wonderland", image: require("../../../assets/images/nadeshiko-kagamihara.jpg") },
  { id: "2", title: "Sky-Colored Walk", image: require("../../../assets/images/rimuru.jpg") },
  { id: "3", title: "Playlist 3", image: require("../../../assets/images/baka_teto.jpg") },
  { id: "4", title: "Playlist 4", image: require("../../../assets/images/d28761f16f34280193c11e59ec2aab1d.png") },
];

// Reducer for songs
type Song = { title: string; image: any };

type State = {
  past: { [playlistId: string]: Song[] }[];
  present: { [playlistId: string]: Song[] };
  future: { [playlistId: string]: Song[] }[];
};

function songsReducer(state: State, action: any): State {
  const { past, present, future } = state;
  const { playlistId } = action;

  switch (action.type) {
    case "SET": // new action
      return {
        past: [...past, present],
        present: {
          ...present,
          [playlistId]: action.songs, // directly set the array
        },
        future: [],
      };
    case "ADD":
      return {
        past: [...past, present],
        present: {
          ...present,
          [playlistId]: [...(present[playlistId] || []), { title: action.song, image: action.image }],
        },
        future: [],
      };
    case "REMOVE":
      return {
        past: [...past, present],
        present: {
          ...present,
          [playlistId]: (present[playlistId] || []).filter(s => s.title !== action.song),
        },
        future: [],
      };
    case "CLEAR":
      return {
        past: [...past, present],
        present: {
          ...present,
          [playlistId]: [],
        },
        future: [],
      };
    case "UNDO":
      if (!past.length) return state;
      const previous = past[past.length - 1];
      return {
        past: past.slice(0, -1),
        present: previous,
        future: [present, ...future],
      };
    case "REDO":
      if (!future.length) return state;
      const next = future[0];
      return {
        past: [...past, present],
        present: next,
        future: future.slice(1),
      };
    default:
      return state;
  }
}



export default function PlaylistDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const playlist = playlists.find((p) => p.id === id);

 // Initialize the reducer with undo/redo structure
  const [state, dispatch] = useReducer(songsReducer, {
    past: [],
    present: {},
    future: [],
  });

  // songsMap is just the current "present" state for convenience
  const songsMap = state.present;

  const [newSong, setNewSong] = useState("");


  // ---- Add AsyncStorage effects here ----

  // Load saved playlist on mount
  useEffect(() => {
    const loadPlaylist = async () => {
      if (!id) return;

      const saved = await AsyncStorage.getItem(`playlist-${id}`);
      if (saved) {
        const savedSongs: Song[] = JSON.parse(saved);
        dispatch({
          type: "SET",
          playlistId: id,
          songs: savedSongs,
        });
      }
    };
    loadPlaylist();
  }, [id]);

  // Save playlist whenever it changes
  useEffect(() => {
    if (!id) return; // make sure we have a playlist id
    AsyncStorage.setItem(`playlist-${id}`, JSON.stringify(songsMap[id] || []));
  }, [songsMap, id]);


  if (!playlist) return <Text>Playlist not found</Text>;

  return (
    <View style={styles.container}>
      {/* Playlist Info */}
      <Text style={styles.header}>Playlist: {playlist.title}</Text>
      <Image source={playlist.image} style={styles.playlistImage} />

      {/* Add Song */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter song name"
          placeholderTextColor="#aaa"
          value={newSong}
          onChangeText={setNewSong}
        />
        <Button
          title="Add"
          onPress={() => {
            if (newSong.trim()) {
              dispatch({
                type: "ADD",
                playlistId: id,
                song: newSong.trim(),
                image: playlist.image,
              });
              setNewSong("");
            }
          }}
        />
      </View>


      {/* Songs List */}
      <FlatList
        data={songsMap[id] || []}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Animated.View
            entering={FadeIn.duration(300)}
            exiting={FadeOut.duration(300)}
            layout={Layout.springify()}
            style={styles.songRow}
          >
            <Image source={item.image} style={styles.songImage} />
            <Text style={styles.songTitle}>{item.title}</Text>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() =>
                dispatch({ type: "REMOVE", playlistId: id, song: item.title })
              }
            >
              <Text style={{ color: "white" }}>Remove</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      />



       {/* Clear All */}
       <Button title="Undo" onPress={() => dispatch({ type: 'UNDO' })} />

       <Button title="Redo" onPress={() => dispatch({ type: 'REDO' })} />

       <Button title="Clear Playlist" onPress={() => dispatch({ type: "CLEAR", playlistId: id })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 20, paddingBottom: 40 },
  header: { color: "white", fontSize: 24, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  playlistImage: { width: 150, height: 150, borderRadius: 10, marginBottom: 20, alignSelf: "center" },
  inputRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  input: {
    flex: 1,
    borderColor: "#555",
    borderWidth: 1,
    color: "white",
    padding: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  songRow: {
  flexDirection: "row",
  alignItems: "center",
  marginVertical: 8,
  flex: 1 // make sure row can stretch
  },
  songImage: { width: 50, height: 50, borderRadius: 5, marginRight: 10 },
  songTitle: { flex: 1, color: "white", fontSize: 16, },
  removeButton: {
    backgroundColor: "red",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
});
