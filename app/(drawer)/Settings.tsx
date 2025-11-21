import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Settings() {

  const navigation = useNavigation();

   const handleLogout = () => {
    // Reset navigation stack and go back to SignIn (index.tsx)
    navigation.reset({
      index: 0,
      routes: [{ name: 'index' as never }], //index is the sign in screen
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      <View style={styles.option}>
        <Ionicons name="notifications-outline" size={22} color="white" />
        <Text style={styles.optionText}>Notifications</Text>
      </View>

      <View style={styles.option}>
        <Ionicons name="lock-closed-outline" size={22} color="white" />
        <Text style={styles.optionText}>Privacy</Text>
      </View>

      <View style={styles.option}>
        <Ionicons name="color-palette-outline" size={22} color="white" />
        <Text style={styles.optionText}>Appearance</Text>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 20 },
  header: { color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  option: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  optionText: { color: 'white', fontSize: 16, marginLeft: 10 },
  logoutButton: {
    backgroundColor: '#1DB954',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 40,
  },
  logoutText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});
