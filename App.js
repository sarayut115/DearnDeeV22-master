const Stack = createNativeStackNavigator();
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import WelcomeScreen from "./screens/WelcomeScreen";
import LoginPage from "./screens/LoginPage";
import SuccessRegistration from "./screens/SuccessRegistration";
import RegisterPage from "./screens/RegisterPage";
import RegisterPage1 from "./screens/RegisterPage1";
import Onboarding from "./screens/Onboarding";
import Onboarding1 from "./screens/Onboarding1";
import Onboarding2 from "./screens/Onboarding2";
import Onboarding3 from "./screens/Onboarding3";
import ForgotPassword from "./screens/ForgotPassword";
import HomeScreen from "./navigation/screens/HomeScreen";
import Profile from "./screens/Profile";
import MainContainer from './navigation/MainContainer';
import ControlScreen from "./LoggedIn/ControlScreen";
import SetttingScreen from "./LoggedIn/SettingScreen";
import PrivacyPolicyScreen from "./LoggedIn/PrivacyPolicyScreen";
import TermsOfUseScreen from "./LoggedIn/TermsOfUseScreen";
import ContactUsScreen from "./LoggedIn/ContactUsScreen";
import History from "./LoggedIn/History";
import PersonalInformationScreen from "./LoggedIn/PersonalInformationScreen";
import Safety from "./LoggedIn/Safety";
import ForgotPasswordAct from "./screens/ForgotPasswordAct";
import NotificationScreen from "./LoggedIn/์NotificationScreen";
import SettingDevice from "./LoggedIn/SettingDevice";
import Otp from "./screens/Otp";
// import LiquidFillGauge from "./compo/LiquidFillGauge";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable, TouchableOpacity } from "react-native";



const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

  React.useEffect(() => {
    // จำลองเวลาการโหลดข้อมูล
    const timer = setTimeout(() => {
      setHideSplashScreen(true); // ซ่อนหน้าจอ Splash หลังจากผ่านเวลาที่กำหนด
    }, 3000); // ปรับเวลาตามที่ต้องการ

    return () => clearTimeout(timer); // ล้าง timeout เมื่อ unmount
  }, []);


  const [fontsLoaded, error] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-LightItalic": require("./assets/fonts/Poppins-LightItalic.ttf"),
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!hideSplashScreen ? (
            <Stack.Screen
              name="Splash"
              component={Splash}
              options={{ headerShown: false }}
            />
          ) : null}
          <Stack.Screen name="WelcomeScreen" component={LoginPage} />
          <Stack.Screen name="Otp" component={Otp} />
          <Stack.Screen name="SettingDevice" component={SettingDevice} />
          <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
          <Stack.Screen name="ForgotPasswordAct" component={ForgotPasswordAct} />
          <Stack.Screen name="Safety" component={Safety} />
          <Stack.Screen name="PersonalInformationScreen" component={PersonalInformationScreen} />
          <Stack.Screen name="History" component={History} />
          <Stack.Screen name="ContactUsScreen" component={ContactUsScreen} />
          <Stack.Screen
            name="PrivacyPolicyScreen"
            component={PrivacyPolicyScreen}
          />
          <Stack.Screen
            name="TermsOfUseScreen"
            component={TermsOfUseScreen}
          />
          <Stack.Screen name="ControlScreen" component={ControlScreen} />
          <Stack.Screen name="SetttingScreen" component={SetttingScreen} />
          <Stack.Screen name="MainContainer" component={MainContainer} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="LoginPage" component={LoginPage} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="RegisterPage1" component={RegisterPage1} />
          <Stack.Screen name="RegisterPage" component={RegisterPage} />
          <Stack.Screen
            name="SuccessRegistration"
            component={SuccessRegistration}
          />
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="Onboarding1" component={Onboarding1} />
          <Stack.Screen name="Onboarding2" component={Onboarding2} />
          <Stack.Screen name="Onboarding3" component={Onboarding3} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
export default App;
