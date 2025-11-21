import { ThemedText } from '@/components/ThemedText';
import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import MapView, { Circle, Marker, Region } from 'react-native-maps';

interface UserLocation {
  latitude: number;
  longitude: number;
}

const SoundTownScreen = () => {
  const [initialRegion, setInitialRegion] = useState<Region | null>(null);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const subscriptionRef = useRef<Location.LocationSubscription | null>(null);

  const [markers] = useState([
    { id: 1, coordinate: { latitude: 37.78825, longitude: -122.4324 }, title: 'Landmark 1', description: 'This is a cool landmark.' },
    { id: 2, coordinate: { latitude: 37.75825, longitude: -122.4524 }, title: 'Landmark 2', description: 'Another cool landmark.' },
    { id: 3, coordinate: { latitude: 37.76825, longitude: -122.4124 }, title: 'Landmark 3', description: 'Yet another cool landmark.' },
  ]);

  useEffect(() => {
    requestLocationPermission();

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
        subscriptionRef.current = null;
      }
    };
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        startLocationUpdates();
      } else {
        Alert.alert('Permission Denied', 'Location permission denied');
      }
    } catch (err) {
      console.warn(err);
      Alert.alert('Error', 'Could not request location permission');
    }
  };

  const startLocationUpdates = async () => {
    try {
      const last = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      if (last?.coords) {
        const loc: UserLocation = { latitude: last.coords.latitude, longitude: last.coords.longitude };
        setUserLocation(loc);
        if (!initialRegion) {
          setInitialRegion({
            latitude: loc.latitude,
            longitude: loc.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        }
      }

      const sub = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 10, timeInterval: 5000 },
        (position) => {
          if (position?.coords) {
            const loc: UserLocation = { latitude: position.coords.latitude, longitude: position.coords.longitude };
            setUserLocation(loc);
            if (!initialRegion) {
              setInitialRegion({
                latitude: loc.latitude,
                longitude: loc.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              });
            }
            checkGeofence(loc);
          }
        }
      );

      subscriptionRef.current = sub;
    } catch (err) {
      console.warn(err);
      Alert.alert('Error', 'Could not start location updates');
    }
  };

  const checkGeofence = (location: UserLocation) => {
    markers.forEach(marker => {
      const distance = getDistance(location, marker.coordinate);
      if (distance < 100) {
        Alert.alert('Geofence Alert', `You have entered the area of ${marker.title}`);
      }
    });
  };

  const getDistance = (loc1: UserLocation, loc2: { latitude: number; longitude: number }) => {
    const R = 6371; // km
    const dLat = deg2rad(loc2.latitude - loc1.latitude);
    const dLon = deg2rad(loc2.longitude - loc1.longitude);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(deg2rad(loc1.latitude)) * Math.cos(deg2rad(loc2.latitude)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 1000; // meters
  };

  const deg2rad = (deg: number) => deg * (Math.PI / 180);

  return (
    <View style={styles.container}>
      {initialRegion ? (
        <MapView style={styles.map} initialRegion={initialRegion} showsUserLocation={true}>
          {markers.map(marker => (
            <Marker key={marker.id} coordinate={marker.coordinate} title={marker.title} description={marker.description} />
          ))}
          {markers.map(marker => (
            <Circle
              key={marker.id}
              center={marker.coordinate}
              radius={100}
              strokeColor="rgba(255,0,0,0.5)"
              fillColor="rgba(255,0,0,0.2)"
            />
          ))}
        </MapView>
      ) : (
        <ThemedText>Loading Map...</ThemedText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  map: { ...StyleSheet.absoluteFillObject },
});

export default SoundTownScreen;
