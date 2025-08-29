import React, { useState } from "react";
import { View, Text, Button, Image, ScrollView, StyleSheet, Alert } from "react-native";

export default function ComponentShowcase() {
  const [count, setCount] = useState(0);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Component Showcase</Text>

      <Text style={styles.paragraph}>
        This screen demonstrates core React Native components: {" "}
        <Text style={styles.bold}>Text</Text>, <Text style={styles.bold}>Button</Text>,{" "}
        <Text style={styles.bold}>Image</Text>, and <Text style={styles.bold}>ScrollView</Text>.
      </Text>

      <Image
        style={styles.hero}
        source={{ uri: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=1200" }}
        resizeMode="cover"
      />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Counter</Text>
        <Text style={styles.counterText}>Count: {count}</Text>
        <View style={styles.row}>
          <View style={styles.buttonWrap}>
            <Button title="Increment" onPress={() => setCount((c) => c + 1)} />
          </View>
          <View style={styles.buttonWrap}>
            <Button title="Alert" onPress={() => Alert.alert("Hello!", "Button works ✅")} />
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Scrollable Content</Text>
        <Text style={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
          in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
          sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae
          vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
          magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
          consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
          Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
          Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat
          quo voluptas nulla pariatur?
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 16, backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "700", marginTop: 8 },
  paragraph: { fontSize: 16, lineHeight: 22, color: "#333" },
  bold: { fontWeight: "700" },
  hero: { width: "100%", height: 200, borderRadius: 12, backgroundColor: "#eee" },
  card: { backgroundColor: "#f8f9fb", padding: 16, borderRadius: 12, gap: 8 },
  cardTitle: { fontSize: 18, fontWeight: "700" },
  counterText: { fontSize: 16 },
  row: { flexDirection: "row", gap: 12 },
  buttonWrap: { flex: 1 }
});
