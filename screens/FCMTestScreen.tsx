import React, { useEffect } from "react";
import { Text, View, Alert, StyleSheet } from "react-native";
import messaging from "@react-native-firebase/messaging";

const FCMTestScreen = () => {
  const requestUserPermission = async () => {
    const authSatus = await messaging().requestPermission();
    const enabled =
      authSatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authSatus === messaging.AuthorizationStatus.PROVISIONAL;

    console.log("Authorization status:", authSatus);

    return enabled;
  };

  useEffect(() => {
    (async () => {
      const enabled = await requestUserPermission();

      if (!enabled) {
        console.log("Permission not granted");
        return;
      }

      messaging()
        .getToken()
        .then((token) => {
          console.log("FCM Token:", token);
        });

      // Check whether an initial notification is available
      messaging()
        .getInitialNotification()
        .then((remoteMessage) => {
          if (remoteMessage) {
            console.log(
              "Notification caused app to open from quit state:",
              remoteMessage.notification
            );
          }
        });

      // Assume a message-notification contains a "type" property in the data payload of the screen to open
      messaging().onNotificationOpenedApp((remoteMessage) => {
        console.log(
          "Notification caused app to open from background state:",
          remoteMessage.notification
        );
      });

      // Register background handler
      messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        console.log("Message handled in the background!", remoteMessage);
      });

      const unsubscribe = messaging().onMessage(async (remoteMessage) => {
        Alert.alert(
          "A new FCM message arrived!",
          JSON.stringify(remoteMessage)
        );
      });

      return unsubscribe;
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>FCM Tutorial</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default FCMTestScreen;
