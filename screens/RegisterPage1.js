import { Text, StyleSheet, View, Pressable, TextInput, Keyboard, Alert, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, FontSize, Border } from "../GlobalStyles";
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect, useRef } from "react";
// import { auth, db } from '../firebase';
import { firebase } from '../config';
import { CheckBox } from 'react-native-elements';



const RegisterPage1 = () => {
  const navigation = useNavigation();
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const nameInputRef = useRef(null);
  const lastnameInputRef = useRef(null);

  // เพิ่ม state สำหรับเก็บข้อมูลผู้ใช้
  const db = firebase.firestore();
  const auth = firebase.auth();
  // const realtimeDB = firebase.database(); // Add this line

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const [isChecked, setChecked] = useState(false);

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(user => {
  //     if (user) {
  //       navigation.replace("RegisterPage")
  //       console.log('Register สำเร็จ');

  //     }
  //   })
  //   return unsubscribe
  // }, [])

  // const handleSignUp = () => {
  //   firebase.auth()
  //     .createUserWithEmailAndPassword(email, password)
  //     .then(userCredentials => {
  //       const user = userCredentials.user;
  //       console.log('Registered with:', user.email);
  //     })
  //     .catch(error => alert(error.message))
  // }

  const handleSignUp = () => {
    // ตรวจสอบว่า checkbox ถูกติ๊กหรือไม่
    if (!isChecked) {
      // ถ้าไม่ติ๊กให้แสดง Alert และหยุดการลงทะเบียน
      Alert.alert('กรุณายอมรับนโยบายความเป็นส่วนตัวและข้อกำหนดการใช้งานของเรา');
      return;
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        // console.log('Registered with:', user.email);

        // Add email to Realtime Database
        // database.ref('emails').push({
        //   email: email,
        // });

        // เพิ่มข้อมูลลง Firestore
        db.collection("users").doc(user.uid).set({
          firstName: firstName,
          lastName: lastName,
          email: email,
          gender: gender,
          dateOfBirth: dateOfBirth,
          weight: weight,
          height: height,

        })
          .then(() => {
            console.log('User data added to Firestore');
          })
          .catch(error => {
            console.error('Error adding user data to Firestore:', error);
          });

        console.log('Registered with:', user.email);
        navigation.replace("RegisterPage")
      })
      .catch(error => alert(error.message));
  }

  // const handleSignUp = () => {
  //   if (!isChecked) {
  //     Alert.alert('กรุณายอมรับนโยบายความเป็นส่วนตัวและข้อกำหนดการใช้งานของเรา');
  //     return;
  //   }

  //   auth.createUserWithEmailAndPassword(email, password)
  //     .then(userCredentials => {
  //       const user = userCredentials.user;

  //       // Add email to Realtime Database
  //       realtimeDB.ref('emails').push({
  //         email: email,
  //       });

  //       // Add user data to Firestore
  //       db.collection("users").doc(user.uid).set({
  //         firstName: firstName,
  //         lastName: lastName,
  //         email: email,
  //         gender: gender,
  //         dateOfBirth: dateOfBirth,
  //         weight: weight,
  //         height: height,
  //       })
  //       .then(() => {
  //         console.log('User data added to Firestore');
  //       })
  //       .catch(error => {
  //         console.error('Error adding user data to Firestore:', error);
  //       });

  //       console.log('Registered with:', user.email);
  //       navigation.replace("RegisterPage");
  //     })
  //     .catch(error => alert(error.message));
  // }



  // const handleSignUp = () => {
  //   if (email && email.length > 0){
  //     const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  //     const data = {
  //       heading: email,
  //       createAt: timestamp

  //     };
  //     todoRef
  //       .add(data)
  //       .then(()=>{
  //         setEmail('');
  //         Keyboard.dismiss();
  //       })
  //       .catch((error)=>{
  //         Alert(error);
  //       })
  //   }
  // }

  return (
    <View style={styles.registerPage1}>
      <View style={styles.titleSection}>
        <Text style={[styles.text, styles.textLayout]}>ยินดีต้อนรับ</Text>
      </View>
      <Text style={[styles.text10, styles.textTypo]}>สร้างบัญชีผู้ใช้งาน</Text>
      <View style={[styles.labelSection, styles.labelSectionPosition]}>
        <View style={[styles.label, styles.labelLayout]}>
          <View style={[styles.labelBg, styles.labelChildPosition]}>
            <TouchableOpacity
              style={[styles.labelBgChild]}
              onPress={() => {
                nameInputRef.current.focus();
              }}
            >
              {/* ... ข้อมูลที่อยู่ใน TouchableOpacity ... */}
            </TouchableOpacity>
          </View>
          {/* <View style={[styles.placeholder, styles.placeholderPosition1]}> */}
          <TouchableOpacity
            style={[styles.placeholder, styles.placeholderPosition1]}
            onPress={() => {
              nameInputRef.current.focus();
            }}
          >
            <Image
              style={[
                styles.iconlylightOutlineprofile,
                styles.iconlylightPosition,
              ]}
              contentFit="cover"
              source={require("../assets/iconlylightoutlineprofile.png")}
            />
            <TextInput
              ref={nameInputRef}
              style={[styles.firstName, styles.nameTypo]}
              placeholder="ชื่อ"
              placeholderTextColor={Color.gray2} // กำหนดสีของ placeholder เป็นเทา
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.label2, styles.labelLayout]}>
          <View style={[styles.labelBg, styles.labelChildPosition]}>
            <TouchableOpacity
              style={[styles.labelBgChild, styles.childLayout]}
              onPress={() => {
                lastnameInputRef.current.focus();
              }}
            >
              {/* ... ข้อมูลที่อยู่ใน TouchableOpacity ... */}
            </TouchableOpacity>
          </View>
          {/* <View style={[styles.placeholder2, styles.placeholderPosition1]}> */}
          <TouchableOpacity
            style={[styles.placeholder2, styles.placeholderPosition1]}
            onPress={() => {
              lastnameInputRef.current.focus();
            }}
          >
            <Image
              style={[
                styles.iconlylightOutlineprofile1,
                styles.iconlylightPosition,
              ]}
              contentFit="cover"
              source={require("../assets/iconlylightoutlineprofile.png")}
            />
            <TextInput
              ref={lastnameInputRef}
              style={[styles.lastName, styles.nameTypo]}
              placeholder="นามสกุล"
              value={lastName}
              onChangeText={(text) => setLastName(text)}
            />
          </TouchableOpacity>
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
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.label3, styles.labelLayout]}>
          <View style={[styles.labelBg, styles.labelChildPosition]}>
            <TouchableOpacity
              style={[styles.labelBgChild, styles.childLayout]}
              onPress={() => {
                passwordInputRef.current.focus();
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
          {/* <View style={[styles.placeholder3, styles.placeholderPosition]}> */}
          <TouchableOpacity
            style={[styles.placeholder3, styles.placeholderPosition]}
            onPress={() => {
              passwordInputRef.current.focus();
            }}
          >
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
          </TouchableOpacity>
        </View>
        <View style={styles.privacyPolicy}>
          {/* <View style={[styles.privacyPolicyChild, styles.childBorder]} /> */}
          <CheckBox
            checked={isChecked}
            onPress={() => setChecked(!isChecked)}
            checkedColor={Color.blackColor}
            containerStyle={styles.privacyPolicyChild}
          />
          <Text style={[styles.text7, styles.nameTypo1]}>
            {`การดำเนินการต่อแสดงว่าคุณยอมรับ `}
            <TouchableOpacity style={styles.privacy} onPress={() => navigation.navigate("PrivacyPolicyScreen")}>
              <Text style={styles.text8}>
                นโยบายความเป็นส่วนตัว
              </Text>
            </TouchableOpacity>

            {` และ `}

            <TouchableOpacity style={styles.privacy} onPress={() => navigation.navigate("TermsOfUseScreen")}>
              <Text style={styles.text8}>
                ข้อกำหนดการใช้งานของเรา
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.buttonLargeRegister, styles.labelSectionPosition]}
        // onPress={() => navigation.navigate("RegisterPage")}
        onPress={handleSignUp}
      >
        <LinearGradient
          style={[styles.buttonLargeRegisterChild, styles.labelChildPosition]}
          locations={[0, 1]}
          colors={["#92a3fd", "#9dceff"]}
        />
        <Text style={[styles.register, styles.textTypo]}>{loading ? "กำลังลงทะเบียน.." : "ลงทะเบียน"}</Text>

      </TouchableOpacity>
      <View style={styles.or}>
        <Text style={styles.text1}>หรือ</Text>
        <Image
          style={[styles.orChild, styles.orItemPosition]}
          contentFit="cover"
          source={require("../assets/vector-67.png")}
        />
        <Image
          style={[styles.orItem, styles.orItemPosition]}
          contentFit="cover"
          source={require("../assets/vector-68.png")}
        />
      </View>
      <View style={[styles.loginSocialMedia, styles.groupChildLayout]}>
        <View style={[styles.rectangleParent, styles.groupChildLayout]}>
          <View style={[styles.groupChild, styles.groupChildLayout]} />
          <Image
            style={styles.googleLogoPngSuiteEverythiIcon}
            contentFit="cover"
            source={require("../assets/googlelogopngsuiteeverythingyouneedknowaboutgooglenewest0-2.png")}
          />
          <Text style={[styles.google, styles.textLayout]}>
            ดำเนินการต่อด้วย google
          </Text>
        </View>
      </View>
      <View style={styles.login}>
        <TouchableOpacity
          style={styles.pressable}
          onPress={() => navigation.navigate("LoginPage")}
        >
          <Text style={styles.text2}>
            <Text style={styles.text3}>
              <Text style={styles.text4}>มีบัญชีอยู่แล้ว?</Text>
              <Text style={styles.text5}>{` `}</Text>
            </Text>
            <Text style={[styles.text6, styles.textTypo]}>เข้าสู่ระบบ</Text>
          </Text>
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity
        style={styles.arrowLeft}
      // onPress={() => navigation.navigate("LoginPage")}
      >
        <Image
          style={[styles.icon, styles.iconlylightLayout]}
          contentFit="cover"
          source={require("../assets/arrowleft.png")}
        />
      </TouchableOpacity> */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  privacy: {
    paddingTop: 12, // หรือค่าที่คุณต้องการ
    // คุณอาจเพิ่ม styles อื่น ๆ ตามต้องการ
  },
  goBackButton: {
    position: 'absolute',
    top: 40,
    left: 20,
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
  icon: {
    width: "100%",
    maxWidth: "100%",
  },
  iconlylightLayout: {
    maxWidth: "100%",
    height: "100%",
    maxHeight: "100%",
    overflow: "hidden",
  },
  text6: {
    top: 33,
    fontSize: FontSize.titleH4Bold_size - 5,
    lineHeight: 30,
    left: 0,
    textAlign: "left",
    position: "absolute",
    color: "#C58BF2",
  },
  textLayout: {
    lineHeight: 24,
    position: "absolute",
  },
  orItemPosition: {
    maxHeight: "100%",
    top: 9,
    position: "absolute",
  },
  labelSectionPosition: {
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
  textTypo: {
    fontFamily: FontFamily.titleH4Bold,
    fontWeight: "700",
  },
  childBorder: {
    borderStyle: "solid",
    position: "absolute",
  },
  nameTypo: {
    color: Color.black,
    textAlign: "left",
    fontFamily: FontFamily.textSmallTextRegular,
    position: "absolute",
  },
  nameTypo1: {
    color: Color.gray2,
    textAlign: "left",
    fontFamily: FontFamily.textSmallTextRegular,
    position: "absolute",
  },

  labelLayout: {
    height: 48,
    width: 315,
    left: 0,
    position: "absolute",
  },

  iconlylightPosition: {
    maxWidth: "100%",
    left: "0%",
    bottom: "0%",
    top: "0%",
    height: "100%",
    maxHeight: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  placeholderPosition: {
    left: 15,
    top: 15,
    height: 18,
    position: "absolute",
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
  groupChildLayout: {
    height: 50,
    width: 213,
    position: "absolute",
  },
  text: {
    textAlign: "left",
    color: Color.blackColor,
    fontFamily: FontFamily.textSmallTextRegular,
    fontSize: FontSize.textLargeTextRegular_size - 0.6,
    lineHeight: 24,
    left: 0,
    top: 0,
  },
  titleSection: {
    top: 40,
    left: 147,
    width: 76,
    height: 24,
    position: "absolute",
  },
  text1: {
    left: 151,
    fontFamily: FontFamily.interRegular,
    lineHeight: 18,
    fontSize: FontSize.textSmallTextRegular_size,
    textAlign: "left",
    color: Color.blackColor,
    top: 0,
    position: "absolute",
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
    fontFamily: FontFamily.textSmallTextRegular,
  },
  text5: {
    fontWeight: "500",
    fontFamily: FontFamily.textSmallTextMedium,
  },
  text3: {
    color: Color.blackColor,
  },
  text2: {
    fontSize: FontSize.linkBig_size,
    lineHeight: 21,
    textAlign: "left",
  },
  pressable: {
    left: 0,
    top: 0,
    position: "absolute",
  },
  login: {
    top: 751,
    left: 119,
    width: 158,
    height: 21,
    position: "absolute",
  },
  buttonLargeRegisterChild: {
    borderRadius: Border.br_80xl,
    backgroundColor: Color.blueLinear,
    position: "absolute",
  },
  register: {
    top: "30%",
    left: "39.05%",
    color: Color.whiteColor,
    textAlign: "center",
    lineHeight: 24,
    position: "absolute",
    fontSize: FontSize.textLargeTextRegular_size,
  },
  buttonLargeRegister: {
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
  privacyPolicyChild: {
    borderRadius: 3,
    borderColor: Color.gray2,
    width: 25,
    height: 25,
    left: -4,
    top: -4,
    // backgroundColor:"red",
    borderStyle: "solid",
    padding: 0,
  },
  text8: {
    color: Color.black,
    textDecorationLine: "underline", // This applies underline
    fontSize:10
  },
  text7: {
    left: 35,
    fontSize: 10,
    lineHeight: 15,
    width: 270,
    top: 0,
    // backgroundColor:"red"
  },
  privacyPolicy: {
    top: 247,
    width: 270,
    height: 30,
    left: 0,
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
  iconlylightOutlineprofile: {
    width: "8%",
    right: "57.14%",
  },
  firstName: {
    left: "16%",
    top: "0%",
    color: Color.gray2,
    lineHeight: 18,
    fontSize: FontSize.textSmallTextRegular_size,
  },
  placeholder: {
    width: "75%",
    right: "81.9%",
    // backgroundColor:"red"
  },
  label: {
    top: 0,
  },
  iconlylightmessage: {
    left: 0,
    top: 0,
  },
  email: {
    left: "15%",
    top: "0%",
    color: Color.gray2,
    lineHeight: 18,
    fontSize: FontSize.textSmallTextRegular_size,
  },
  placeholder1: {
    width: 240,
    // backgroundColor:"red"
  },
  label1: {
    top: 126,
  },
  iconlylightOutlineprofile1: {
    width: "8%",
    right: "73.91%",
  },
  lastName: {
    left: "16%",
    top: "0%",
    color: Color.gray2,
    lineHeight: 18,
    fontSize: FontSize.textSmallTextRegular_size,
  },

  placeholder2: {
    width: "75%",
    right: "73.33%",
    // backgroundColor:"red"
  },

  placeholderPosition1: {
    left: "4.76%",
    bottom: "31.25%",
    top: "31.25%",
    height: "37.5%",
    position: "absolute",
  },
  label2: {
    top: 63,
  },
  hidePasswordIcon: {
    left: 50,
    top: -10,
  },
  password: {
    left: "15%",
    top: "0%",
    color: Color.gray2,
    lineHeight: 18,
    fontSize: FontSize.textSmallTextRegular_size,
  },
  placeholder3: {
    width: 220,
    // backgroundColor:"red"
  },
  label3: {
    top: 189,
  },
  labelSection: {
    top: 129,
    height: 277,
  },
  groupChild: {
    backgroundColor: Color.colorGainsboro,
    borderRadius: Border.br_sm,
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
    textAlign: "left",
    color: Color.blackColor,
    fontFamily: FontFamily.textSmallTextRegular,
  },
  rectangleParent: {
    left: 0,
    top: 0,
  },
  loginSocialMedia: {
    top: 671,
    left: 82,
  },
  text10: {
    top: 73,
    left: 113,
    fontSize: FontSize.titleH4Bold_size,
    lineHeight: 30,
    textAlign: "left",
    color: Color.blackColor,
    position: "absolute",
  },
  registerPage1: {
    borderRadius: Border.br_21xl,
    flex: 1,
    height: 812,
    overflow: "hidden",
    width: "100%",
    backgroundColor: Color.whiteColor,
  },
});

export default RegisterPage1;
