import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/Splash/SplashScreen"
import LoginScreen from "../screens/Auth/LoginScreen"
import HomeScreen from "../screens/Home/HomeScreen"
import  ProductDetail from "../screens/Product/ProductDeatails"
const Stack = createNativeStackNavigator();

const Authnavigator =() =>{
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
          
          <Stack.Screen  name="Splash" component={SplashScreen}/>
          <Stack.Screen  name="Login" component={LoginScreen}/>

          <Stack.Screen  name="Home" component={HomeScreen}/>
          <Stack.Screen name="ProductDetail" component={ProductDetail} />
        </Stack.Navigator>
    )
}

export default Authnavigator