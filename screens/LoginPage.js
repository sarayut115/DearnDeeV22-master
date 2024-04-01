import React, { useState, useEffect, useRef } from "react";
import { Text, StyleSheet, View, Pressable, TextInput, Alert, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Border, Color } from "../GlobalStyles";
import { firebase } from '../config';

// import { GoogleSignin } from "@react-native-google-signin/google-signin";
// GoogleSignin.configure({
//   webClientId: '280195130430-kp53d45d5flio58nd037tds2tq8j4rf2.apps.googleusercontent.com',
// });

const LoginPage = () => {
  const navigation = useNavigation();
  const auth = firebase.auth();
  const db = firebase.firestore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);




  const handleForgotPasswordPress = () => {
    // นำทางไปยังหน้า ForgotPassword
    navigation.navigate('ForgotPassword'); // แทน 'ForgotPassword' ด้วยชื่อ Stack.Screen หรือชื่อหน้าที่คุณต้องการนำทางไป
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("MainContainer")
      }
    })

    return unsubscribe
  }, [])

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      })
      .catch(error => alert(error.message))
  }

  return (
    <View style={styles.loginPage}>
      <View style={styles.titleSection}>
        <Text style={[styles.text, styles.textFlexBox]}>ยินดีต้อนรับ</Text>
        <Text style={[styles.text1, styles.textTypo]}>เข้าสู่ระบบ</Text>
      </View>
      <View style={[styles.labelSection, styles.buttonLoginPosition]}>

        {/* ช่องกรอกอีเมล */}
        <View style={[styles.label, styles.labelLayout]}>
          <View style={[styles.labelBg, styles.labelChildPosition]}>
            <TouchableOpacity
              style={[styles.labelBgChild]}
              onPress={() => {
                emailInputRef.current.focus(); // focus ที่ TextInput ของอีเมล
              }}
            >
              {/* ... ข้อมูลที่อยู่ใน TouchableOpacity ... */}
            </TouchableOpacity>
          </View>
          <View style={[styles.placeholder, styles.placeholderPosition]}>
            <Image
              style={[styles.iconlylightmessage, styles.IconLayoutemail]}
              contentFit="cover"
              source={require("../assets/iconlylightmessage.png")}
            />
            <TextInput
              ref={emailInputRef}
              style={styles.email}
              placeholder="อีเมล"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
        </View>

        {/* ช่องกรอกรหัสผ่าน */}
        <View style={[styles.label1, styles.labelLayout]}>
          <View style={[styles.labelBg, styles.labelChildPosition]}>
            <TouchableOpacity
              style={[styles.labelBgChild, styles.childLayout]}
              onPress={() => {
                passwordInputRef.current.focus(); // focus ที่ TextInput ของรหัสผ่าน
              }}
            >
              {/* ... ข้อมูลที่อยู่ใน TouchableOpacity ... */}
            </TouchableOpacity>
          </View>
          {/* <Image
            style={[styles.hidePasswordIcon, styles.hidePasswordIconLayout]}
            contentFit="cover"
            source={require("../assets/hidepassword.png")}
          /> */}
          <View style={[styles.placeholder1, styles.placeholderPosition]}>
            <Image
              style={[styles.iconlylightmessage, styles.IconLayoutpassword]}
              contentFit="cover"
              source={require("../assets/iconlylightlock.png")}
            />
            <TextInput
              ref={passwordInputRef}
              style={styles.password}
              placeholder="รหัสผ่าน"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={{ position: "absolute", right: 10, top: 10 }}
            >
              <Image
                style={[styles.hidePasswordIcon, styles.hidePasswordIconLayout]}
                contentFit="cover"
                source={
                  showPassword
                    ? require("../assets/showpassword.png")
                    : require("../assets/hidepassword.png")
                }
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.forgetPassword, styles.registerTextLayout]}>
          <TouchableOpacity style={styles.text6Clr} onPress={handleForgotPasswordPress}>
            <Text>ลืมรหัสผ่านหรือไม่?</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* ปุ่มเข้าสู่ระบบ */}
      <TouchableOpacity
        style={[styles.buttonLogin, styles.buttonLoginPosition]}
        onPress={handleLogin}
      >
        <LinearGradient
          style={[styles.buttonLoginChild, styles.labelChildPosition]}
          locations={[0, 1]}
          colors={["#92a3fd", "#9dceff"]}
        />
        <View style={styles.iconlyboldloginParent}>
          <Image
            style={styles.iconlyboldlogin}
            contentFit="cover"
            source={require("../assets/iconlyboldlogin1.png")}
          />
          <Text style={[styles.login, styles.textTypo]}>เข้าสู่ระบบ</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.or}>
        <Text style={[styles.text2, styles.text2Layout]}>หรือ</Text>
      </View>
      <TouchableOpacity style={[styles.loginSocialMedia, styles.groupChildLayout]} onPress={() => navigation.navigate("LoginPage")}>
        <View style={[styles.rectangleParent, styles.groupChildLayout]}>
          <View style={[styles.groupChild, styles.childLayout]} />
          <Image
            style={styles.googleLogoPngSuiteEverythiIcon}
            contentFit="cover"
            source={require("../assets/googlelogopngsuiteeverythingyouneedknowaboutgooglenewest0-2.png")}
          />
          <Text style={[styles.google, styles.textFlexBox]}>
            ดำเนินการต่อด้วย google
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.registerText, styles.registerTextLayout]}
        onPress={() => navigation.navigate("RegisterPage1")}
      >
        <Text style={[styles.text3, styles.textPosition]}>
          <Text style={styles.text4}>{`ยังไม่มีบัญชีใช่หรือไม่? `}</Text>
          <Text style={[styles.text5, styles.textTypo]}>ลงทะเบียน</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textFlexBox: {
    textAlign: "left",
    position: "absolute",
  },
  textTypo: {
    fontFamily: FontFamily.titleH4Bold,
    fontWeight: "700",
  },
  buttonLoginPosition: {
    width: 315,
    left: 30,
    position: "absolute",
  },
  labelChildPosition: {
    left: "0%",
    bottom: "0%",
    right: "0%",
    height: "100%",
    top: "0%",
    width: "100%",
  },
  text2Layout: {
    lineHeight: 18,
    fontSize: FontSize.textSmallTextRegular_size,
  },
  orItemPosition: {
    top: 9,
    maxHeight: "100%",
    position: "absolute",
  },
  registerTextLayout: {
    height: 21,
    position: "absolute",
  },
  textPosition: {
    lineHeight: 21,
    fontSize: FontSize.linkBig_size,
    left: 0,
    top: 0,
  },
  groupChildLayout: {
    height: 50,
    width: 213,
  },
  childLayout: {
    borderRadius: Border.br_sm,
    position: "absolute",
  },
  text6Clr: {
    color: Color.gray2,
    textAlign: "left",
    position: "absolute",


  },
  labelLayout: {
    height: 48,
    width: 315,
    left: 0,
    position: "absolute",
    // backgroundColor: 'yellow'
  },
  placeholderPosition: {
    left: 15,
    top: 15,
    height: 18,
    position: "absolute",
    // backgroundColor: 'red'
  },
  hidePasswordIcon: {
    left: 50,
    top: -10,
  },
  hidePasswordIconLayout: {
    width: 23,
    height: 23,
    position: "absolute",
    // backgroundColor:'red'
  },
  IconLayoutemail: {
    width: 18,
    height: 18,
    position: "absolute",

  },
  IconLayoutpassword: {
    width: 18,
    height: 18,
    position: "absolute",
  },
  text: {
    left: 3,
    color: Color.blackColor,
    fontFamily: FontFamily.textSmallTextRegular,
    lineHeight: 24,
    textAlign: "left",
    fontSize: FontSize.textLargeTextRegular_size,
    top: 0,
  },
  text1: {
    top: 33,
    fontSize: FontSize.titleH4Bold_size,
    lineHeight: 30,
    left: 0,
    textAlign: "left",
    position: "absolute",
    color: Color.blackColor,
  },
  text5: {
    top: 33,
    fontSize: FontSize.titleH4Bold_size - 5,
    lineHeight: 30,
    left: 0,
    textAlign: "left",
    position: "absolute",
    color: "#C58BF2",
  },
  titleSection: {
    top: 40,
    left: 144,
    width: 100,
    height: 63,
    position: "absolute",
  },
  buttonLoginChild: {
    borderRadius: Border.br_80xl,
    backgroundColor: Color.blueLinear,
    position: "absolute",
  },
  iconlyboldlogin: {
    width: "24%",
    right: "76%",
    maxWidth: "100%",
    maxHeight: "100%",
    left: "-10%",
    bottom: "0%",
    top: "0%",
    height: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  login: {
    left: "20%",
    color: Color.whiteColor,
    top: "0%",
    textAlign: "left",
    position: "absolute",
    lineHeight: 24,
    fontSize: FontSize.textLargeTextRegular_size,
  },
  iconlyboldloginParent: {
    height: "40%",
    width: "31.75%",
    top: "30%",
    right: "30.79%",
    bottom: "30%",
    left: "37.46%",
    position: "absolute",
  },
  buttonLogin: {
    top: 553,
    shadowColor: "rgba(149, 173, 254, 0.3)",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 22,
    elevation: 22,
    shadowOpacity: 1,
    height: 60,
  },
  text2: {
    left: 151,
    fontFamily: FontFamily.interRegular,
    textAlign: "left",
    position: "absolute",
    color: Color.blackColor,
    top: 0,
  },
  orChild: {
    width: 141,
    left: 0,
  },
  orItem: {
    left: 175,
    width: 140,
  },
  or: {
    top: 633,
    height: 18,
    width: 315,
    left: 30,
    position: "absolute",
  },
  text4: {
    color: Color.blackColor,
    fontFamily: FontFamily.textSmallTextRegular,
  },
  text3: {
    textAlign: "left",
    position: "absolute",
  },
  registerText: {
    top: 750,
    left: 98,
    width: 200,
  },
  groupChild: {
    backgroundColor: Color.colorGainsboro,
    height: 50,
    width: 213,
    left: 0,
    top: 0,
  },
  googleLogoPngSuiteEverythiIcon: {
    left: 174,
    width: 20,
    height: 20,
    top: 15,
    position: "absolute",
  },
  google: {
    width: "69.95%",
    top: "22%",
    left: "9.39%",
    fontSize: FontSize.size_smi,
    color: Color.blackColor,
    fontFamily: FontFamily.textSmallTextRegular,
    lineHeight: 24,
    textAlign: "left",
  },
  rectangleParent: {
    left: 0,
    top: 0,
    position: "absolute",
  },
  loginSocialMedia: {
    top: 671,
    left: 82,
    position: "absolute",
  },
  text6: {
    textDecoration: "underline",
    fontWeight: "500",
    fontFamily: FontFamily.textSmallTextMedium,
    lineHeight: 21,
    fontSize: FontSize.linkBig_size,
    left: 0,
    top: 0,
  },
  forgetPassword: {
    top: 128,
    left: 105,
    width: 120,
  },
  labelBgChild: {
    backgroundColor: Color.borderColor,
    // backgroundColor: 'blue',
    borderStyle: "solid",
    borderColor: Color.borderColor,
    borderWidth: 1,
    left: "0%",
    bottom: "0%",
    right: "0%",
    height: "100%",
    top: "0%",
    width: "100%",
  },
  labelBg: {
    position: "absolute",
  },
  iconlylightmessage: {
    left: 0,
    top: 0,
  },
  email: {
    left: "15%",
    lineHeight: 18,
    fontSize: FontSize.textSmallTextRegular_size,
    top: "0%",
    fontFamily: FontFamily.textSmallTextRegular,
  },
  placeholder: {
    width: 240,
  },
  label: {
    top: 0,
  },
  password: {
    left: "15%",
    lineHeight: 18,
    fontSize: FontSize.textSmallTextRegular_size,
    top: "0%",
    fontFamily: FontFamily.textSmallTextRegular,
  },
  placeholder1: {
    width: 220,
  },
  label1: {
    top: 63,
  },
  labelSection: {
    top: 129,
    height: 149,
  },
  loginPage: {
    borderRadius: Border.br_11xl,
    backgroundColor: Color.whiteColor,
    flex: 1,
    height: 812,
    overflow: "hidden",
    width: "100%",
  },
});

export default LoginPage;
