import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login'); // move to login
    }, 3000); // 3 seconds
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Mini Store</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold'
  }
});