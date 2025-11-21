import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function Signup() {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.top}>
            <Text style={styles.text}>Create Account</Text>
        </View>

        <View style={styles.bottom}>

                <View>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18
                    }}>What's your email?</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#a9a9a9"
                    />

                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18
                    }}>Create a password</Text>
                    <TextInput
                    style={styles.input}
                    placeholderTextColor="#a9a9a9"
                    />

                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18
                    }}>What's your gender?</Text>
                    <TextInput
                    style={styles.input}
                    placeholderTextColor="#a9a9a9"
                    />

                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18
                    }}>What's your name?</Text>
                    <TextInput
                    style={styles.input}
                    placeholderTextColor="#a9a9a9"
                    />
                </View>
                
                
                <TouchableOpacity style={styles.button}>
                    <Link href="/Playlists">
                        <Text style={styles.buttonText}>Create an account</Text>
                    </Link>
                </TouchableOpacity>
        

                
                
        </View>
    


    </SafeAreaView>       
  );
}


const styles = StyleSheet.create({

  bottomImgContainer: {
    flexDirection: 'row',   // 👈 side by side
    justifyContent: 'center', // center them horizontally
    alignItems: 'center',    // align them vertically
    marginTop: -60,
    marginBottom: -40,
  },
  bottomImg: {
    width: 30,
    height: 30,
    marginHorizontal: 10, // spacing between images
  },
  forgotText: {
    color: '#555',
    textAlign: 'right',
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
    marginTop: -20,
  },
 container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  top: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -590,
  },
  bottom: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: -600,
    height: 400,

  },
  
  input: {
    height: 60,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#555',
    paddingHorizontal: 12,
    marginBottom: 15,
    color: 'white',
    backgroundColor: '#818181ff', // dark input background
  },
  button: {
    backgroundColor: '#1DB954', // Spotify green
    padding: 15,
    marginTop: 50,
    borderRadius: 25,
    alignItems: 'center',
    width: '50%',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomOfButton: {
    color: '#1DB954',
    fontSize: 15,
    marginTop: 10,
    textAlign: 'center',
  },
  textLine: {
  color: 'gray',   // default gray for the sentence
  fontSize: 15,
  textAlign: 'center',
  marginTop: 60,
  marginBottom: 20,
  },
  signUp: {
  color: '#1DB954', // Spotify bright green
  fontWeight: 'bold',
  },
});