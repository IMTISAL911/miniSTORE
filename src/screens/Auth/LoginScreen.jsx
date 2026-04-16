// import React, { useState } from 'react';
// import { View, TextInput, Text, StyleSheet, Alert } from 'react-native';
// import CustomButton from '../../components/Common/CustomButton';

// const LoginScreen = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     // Hardcoded login
//     if (email === 'admin@gmail.com' && password === '123456') {
//       navigation.replace('Home'); // later we will add Home
//     } else {
//       Alert.alert('Invalid Credentials');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>

//       <TextInput
//         placeholder="Email"
//         placeholderTextColor="gray"
//         style={styles.input}
//         onChangeText={setEmail}
//       />

//       <TextInput
//         placeholder="Password"
//         placeholderTextColor="gray"
//         secureTextEntry
//         style={styles.input}
//         onChangeText={setPassword}
//       />

//       <CustomButton title="Login" onPress={handleLogin} />
//     </View>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20
//   },
//   input: {
//     borderWidth: 1,
//     marginBottom: 10,
//     padding: 10,
//     color:"gray"
//   }
// });


import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/authSlice";
import CustomButton from "../../components/Common/CustomButton";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email === "admin@gmail.com" && password === "123456") {
      dispatch(loginSuccess({ email }));
      navigation.replace("Home");
    } else {
      Alert.alert("Invalid Credentials");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput placeholder="Email" style={styles.input} onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} onChangeText={setPassword} />

      <CustomButton title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    color:"gray"
  }

})
  


export default LoginScreen;