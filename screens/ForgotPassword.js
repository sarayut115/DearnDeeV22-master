import React, { useState, useEffect, useRef } from "react";
import { Text, StyleSheet, View, Pressable, TouchableOpacity, TextInput } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import { firebase } from '../config';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const auth = firebase.auth();
  const [email, setEmail] = useState(''); // รับอีเมลผ่านพารามิเตอร์
  const emailInputRef = useRef(null);
  const handleResetPassword = () => {
    if (!email) {
      alert('กรุณากรอกอีเมล');
      return;
    }

    auth.sendPasswordResetEmail(email)
      .then(() => {
        alert('อีเมลสำหรับรีเซ็ตรหัสผ่านถูกส่งไปยังอีเมลของคุณแล้ว');
        navigation.goBack(); // หรือใช้ navigation.navigate('LoginPage') หากต้องการนำกลับไปที่หน้าเข้าสู่ระบบ
      })
      .catch(error => alert(error.message));
  };


  return (
    <View style={styles.forgotpassword}>
      <View style={styles.titleSection}>
        <Text style={styles.text}>ยินดีต้อนรับ</Text>
        <Text style={[styles.text1, styles.textTypo]}>
          ลืมรหัสผ่านใช่หรือไม่
        </Text>
      </View>


      <View style={[styles.label1, styles.labelLayout]}>
        <View style={[styles.labelBg, styles.labelChildPosition]}>
          <TouchableOpacity
            style={[styles.labelBgChild, styles.childLayout]}
            onPress={() => {
              emailInputRef.current.focus();
            }}
          >
            {/* ... ข้อมูลที่อยู่ใน TouchableOpacity ... */}
          </TouchableOpacity>
        </View>
        {/* <View style={[styles.placeholder1, styles.placeholderPosition]}> */}
        <TouchableOpacity
          style={[styles.placeholder1, styles.placeholderPosition]}
          onPress={() => {
            emailInputRef.current.focus();
          }}
        >
          <Image
            style={[styles.iconlylightmessage, styles.IconLayoutemail]}
            contentFit="cover"
            source={require("../assets/iconlylightmessage.png")}
          />
          <TextInput
            ref={emailInputRef}
            style={[styles.email, styles.nameTypo]}
            placeholder="อีเมล"
            placeholderTextColor={Color.gray2} // กำหนดสีของ placeholder เป็นเทา
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </TouchableOpacity>
      </View>


      <Image
        style={[styles.pictureIcon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/picture.png")}
      />
      <View style={styles.profileText}>
        <Text style={[styles.text2, styles.textTypo]}>
          หากต้องการรีเซ็ตรหัสผ่านกรุณากรอกอีเมลของคุณ
        </Text>
        <Text style={[styles.text3, styles.text3FlexBox]}>
          ตรวจสอบอีเมลของคุณ จะส่งลิงค์รีเซ็ตรหัสผ่านไปให้คุณ
        </Text>
      </View>
      <TouchableOpacity style={styles.buttonLargeRegister} onPress={handleResetPassword}>
        <LinearGradient
          style={[styles.buttonLargeRegisterChild, styles.labelChildPosition1]}
          locations={[0, 1]}
          colors={["#92a3fd", "#9dceff"]}
        />
        <Text style={[styles.register, styles.text3FlexBox]}>
          ส่งลิ้งรีเซ็ตรหัสผ่าน
        </Text>
      </TouchableOpacity>
      <Pressable
        style={styles.arrowLeft}
        onPress={() => navigation.navigate("LoginPage")}
      >
        <Image
          style={[styles.icon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/arrowleft.png")}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  textTypo: {
    fontFamily: FontFamily.titleH4Bold,
    fontWeight: "700",
  },
  labelChildPosition1: {
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    height: "100%",
    position: "absolute",
    width: "100%",
    // backgroundColor:'blue'
  },

  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  text3FlexBox: {
    textAlign: "center",
    position: "absolute",
  },
  text: {
    left: 44,
    textAlign: "left",
    color: Color.blackColor,
    fontFamily: FontFamily.textSmallTextRegular,
    lineHeight: 24,
    fontSize: FontSize.textLargeTextRegular_size,
    top: 0,
    position: "absolute",
  },
  text1: {
    top: 32,
    fontSize: FontSize.titleH4Bold_size,
    lineHeight: 30,
    fontFamily: FontFamily.titleH4Bold,
    fontWeight: "700",
    left: 0,
    textAlign: "left",
    color: Color.blackColor,
    position: "absolute",
  },
  titleSection: {
    top: 40,
    left: 108,
    width: 180,
    height: 62,
    position: "absolute",
    // backgroundColor:'red'
  },

  pictureIcon: {
    height: "29.68%",
    width: "57.87%",
    top: "17.73%",
    right: "17.6%",
    bottom: "52.59%",
    left: "24.53%",
    position: "absolute",
    // backgroundColor:'red'
  },
  text2: {
    fontSize: FontSize.size_smi,
    lineHeight: 30,
    fontFamily: FontFamily.titleH4Bold,
    fontWeight: "700",
    left: 0,
    textAlign: "left",
    color: Color.blackColor,
    position: "absolute",
    top: 0,
  },
  text3: {
    top: 120,
    left: 14,
    color: Color.gray1,
    lineHeight: 18,
    fontSize: FontSize.textSmallTextRegular_size,
    fontFamily: FontFamily.textSmallTextRegular,
  },
  profileText: {
    top: 397,
    left: 43,
    width: 275,
    height: 40,
    position: "absolute",
    // backgroundColor:'red'
  },
  buttonLargeRegisterChild: {
    borderRadius: Border.br_80xl,
    backgroundColor: Color.blueLinear,
  },
  register: {
    top: "30%",
    left: "30.16%",
    color: Color.whiteColor,
    fontFamily: FontFamily.titleH4Bold,
    fontWeight: "700",
    lineHeight: 24,
    fontSize: FontSize.textLargeTextRegular_size,
    textAlign: "center",
  },
  buttonLargeRegister: {
    top: 554,
    left: 30,
    shadowColor: "rgba(149, 173, 254, 0.3)",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 22,
    elevation: 22,
    shadowOpacity: 1,
    height: 60,
    width: 315,
    position: "absolute",
  },
  icon: {
    height: "100%",
    maxWidth: "100%",
    width: "100%",
  },
  arrowLeft: {
    left: "9.87%",
    top: "5.42%",
    right: "85.33%",
    bottom: "92.61%",
    width: "4.8%",
    height: "1.97%",
    position: "absolute",
  },
  forgotpassword: {
    borderRadius: Border.br_11xl,
    backgroundColor: Color.whiteColor,
    flex: 1,
    height: 812,
    overflow: "hidden",
    width: "100%",
  },

  label1: {
    top: 450,
    // backgroundColor:'red'
  },
  
  labelLayout: {
    height: 48,
    width: 315,
    left: 30,
    position: "absolute",
  },
  labelBgChild: {
    backgroundColor: Color.borderColor,
    borderColor: Color.borderColor,
    borderWidth: 1,
    borderRadius: Border.br_sm,
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
  labelChildPosition: {
    left: "0%",
    bottom: "0%",
    right: "0%",
    height: "100%",
    top: "0%",
    width: "100%",
  },
  placeholder1: {
    width: 240,
    // backgroundColor:"red"
  },
  placeholderPosition: {
    left: 15,
    top: 15,
    height: 18,
    position: "absolute",
  },
  iconlylightmessage: {
    left: 0,
    top: 0,
  },
  IconLayoutemail: {
    width: 18,
    height: 18,
    position: "absolute",

  },
  nameTypo: {
    color: Color.blackColor, // กำหนดให้ข้อความที่พิมพ์เข้าไปเป็นสีดำgray2
    textAlign: "left",
    fontFamily: FontFamily.textSmallTextRegular,
    position: "absolute",
  },
  email: {
    left: "15%",
    top: "0%",
    lineHeight: 18,
    fontSize: FontSize.textSmallTextRegular_size,
  },
  
});

export default ForgotPassword;
