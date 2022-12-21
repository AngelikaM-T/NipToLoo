import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import LottieView from "lottie-react-native";

const AppLoader = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>    
      <LottieView source={require("../assets/spinner.json")} autoPlay loop />
      <Text style={styles.loadingText}>Loading toilets...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 1,
  },
  loadingText: {
    justifyContent: 'center',
    color: 'white',
    paddingBottom: 300,
    fontSize: 18
  }
});

export default AppLoader;