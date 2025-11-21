import React, { useRef, useState, useEffect } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function CameraScreen({ navigation }: any) {
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraType, setCameraType] = useState<"front" | "back">("front");
  const [photo, setPhoto] = useState<string | null>(null);
  const cameraRef = useRef<any>(null); // ✅ changed type to "any" for compatibility

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photoData = await cameraRef.current.takePicture({});
      setPhoto(photoData?.uri);
    }
  };

  if (!permission?.granted) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      {!photo ? (
        <CameraView
          ref={cameraRef}
          style={{ flex: 1 }}
          facing={cameraType}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
              marginBottom: 30,
            }}
          >
            <TouchableOpacity onPress={takePhoto}>
              <Text style={{ color: "white", fontSize: 18 }}>📸 Capture</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                setCameraType((prev) => (prev === "back" ? "front" : "back"))
              }
            >
              <Text style={{ color: "white", marginTop: 10 }}>🔄 Flip</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      ) : (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Image
            source={{ uri: photo }}
            style={{ width: 300, height: 400, resizeMode: "cover" }}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("index", { newPhoto: photo })}
          >
            <Text style={{ color: "#1DB954", marginTop: 20, fontSize: 16 }}>
              Save Photo
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
