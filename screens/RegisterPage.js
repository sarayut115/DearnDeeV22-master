import * as React from "react";
import { Text, StyleSheet, View, Pressable, TextInput, TouchableWithoutFeedback, TouchableOpacity, Keyboard  } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Border, Color, FontSize, FontFamily } from "../GlobalStyles";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState, useRef } from "react";
import { Moment } from "moment/moment";
import { Picker } from "@react-native-picker/picker";
import RNPickerSelect from 'react-native-picker-select';  // Import the PickerSelect component
import moment from "moment";
import 'moment/locale/th'; // เพิ่มบรรทัดนี้เพื่อตั้งค่า locale เป็นภาษาไทย
moment.locale('th'); // เพิ่มบรรทัดนี้เพื่อตั้งค่า locale เป็นภาษาไทย
import { firebase } from '../config';

// other imports...


const RegisterPage = () => {
  const navigation = useNavigation();
  const genderInputRef = useRef(null);

  const weightInputRef = useRef(null);
  const heightInputRef = useRef(null);

  const db = firebase.firestore();
  const auth = firebase.auth();

  const [gender, setGender] = useState("");
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);

  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  

  // const onDateChange = (event, selectedDate) => {
  //   const currentDate = selectedDate || dateOfBirth;
  //   setShowDatePicker(false);
  //   setDateOfBirth(currentDate);
  // };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    const dayChanged = currentDate.getDate() !== dateOfBirth?.getDate();

    if (dayChanged) {
      setShowDatePicker(false);
      console.log(dateOfBirth)
    }

    setDateOfBirth(currentDate);
  };




  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const genderOptions = [
    { label: "ชาย", value: "ชาย" },
    { label: "หญิง", value: "หญิง" },
    // { label: "อื่นๆ", value: "อื่นๆ" },
    // { label: "ไม่ระบุ", value: "ไม่ระบุ" },
  ];

  // const handleGenderChange = (itemValue) => {
  //   setGender(itemValue);
  //   console.log(`Selected Gender: ${itemValue}`);
  // };

  const updateDBfirebase = async () => {
    try {
      const user = auth.currentUser;

      if (user) {
        // Update user profile in Firestore
        await db.collection("users").doc(user.uid).update({
          gender: gender,
          dateOfBirth: dateOfBirth,
          weight: weight,
          height: height,
        });

        console.log("User profile updated successfully!");
        navigation.navigate("MainContainer")
      } else {
        console.error("User not found");
      }
    } catch (error) {
      console.error("Error updating user profile:", error.message);
    }
  };


  return (
    <View style={styles.registerPage2}>
      <View style={styles.profileText}>
        <Text style={styles.text}>ป้อนข้อมูลส่วนตัวของคุณ</Text>
        <Text style={styles.text1}>สำหรับการวิเคราะห์โหมดออโต้ เพื่อให้แม่นยำมากขึ้น!</Text>

      </View>
      <Pressable
        style={[styles.button, styles.buttonLayout]}
        // onPress={() => navigation.navigate("SuccessRegistration")}
        onPress={updateDBfirebase}
      >
        <LinearGradient
          style={[styles.btn, styles.labelGroupPosition]}
          locations={[0, 1]}
          colors={["#92a3fd", "#9dceff"]}
        />
        <View style={styles.next}>
          <TouchableOpacity style={styles.next1} onPress={updateDBfirebase}>
            <Text style={styles.next1}>ยืนยัน</Text>
          </TouchableOpacity>
          <Image
            style={[styles.iconlylightarrowRight2, styles.iconGroupLayout]}
            contentFit="cover"
            source={require("../assets/iconlylightarrow--right-2.png")}
          />
        </View>
      </Pressable>
      <Image
        style={styles.vectorSectionIcon}
        contentFit="cover"
        source={require("../assets/vectorsection.png")}
      />
      <View style={[styles.labelSection, styles.buttonLayout]}>
        <Pressable
          style={[styles.label, styles.labelLayout]}
          onPress={() => setShowGenderDropdown(!showGenderDropdown)}
        >
          <View style={[styles.labelBg, styles.labelGroupPosition]}>
            {/* <TouchableOpacity style={[styles.labelBgChild, styles.childPosition]} /> */}
            <TouchableOpacity
              style={[styles.labelBgChild, styles.childPosition]}
              onPress={() => genderInputRef.current.togglePicker()}
            />

          </View>
          {/* <Image
            style={styles.dropdownIcon}
            contentFit="cover"
            source={require("../assets/dropdown.png")}
          /> */}

          <TouchableOpacity
            style={styles.dropdownIconWrapper}
            onPress={() => genderInputRef.current.togglePicker()}
          >
            <Image
              style={styles.dropdownIcon}
              contentFit="cover"
              source={require("../assets/dropdown.png")}
            />
          </TouchableOpacity>


          <View style={[styles.placeholder, styles.placeholderPosition]}>
            {/* <Text style={[styles.chooseGender, styles.yourPosition]}>
              {gender || "เลือกเพศ"}
            </Text> */}
            {/* {showGenderDropdown && (
              // <Picker
              //   selectedValue={gender}
              //   onValueChange={(itemValue) => {
              //     setGender(itemValue);
              //     setShowGenderDropdown(false);
              //   }}
              //   style={{ position: 'absolute', top: -100, left: -22, right: 0, bottom: 0, zIndex: 0 ,width:"104.5%" ,height:"100%" }}
              // >
              //   <Picker.Item label="เลือกเพศ" value="" />
              //   <Picker.Item label="ชาย" value="ชาย" />
              //   <Picker.Item label="หญิง" value="หญิง" />
              //   <Picker.Item label="อื่นๆ" value="อื่นๆ" />
              // </Picker>
              
            )} */}
            {/* <RNPickerSelect
              onValueChange={(itemValue) => setGender(itemValue)}
              items={genderOptions}
              placeholder={{ label: "เลือกเพศ", value: null }}
              style={{
                inputIOS: [styles.pickerInput, gender ? { color: 'black' } : { color: 'gray' }],
                inputAndroid: [styles.pickerInput, gender ? { color: 'black' } : { color: 'gray' }],
              }}
            /> */}
            <RNPickerSelect
              ref={genderInputRef}
              onValueChange={(itemValue) => setGender(itemValue)}
              items={genderOptions}
              placeholder={{ label: "เลือกเพศ", value: null }}
              style={{
                inputIOS: [styles.pickerInput, gender ? { color: 'black' } : { color: 'gray' }],
                inputAndroid: [styles.pickerInput, gender ? { color: 'black' } : { color: 'gray' }],
              }}
            />

            {/* <RNPickerSelect
              onValueChange={handleGenderChange} // Update the gender state when value changes
              items={genderOptions}
              placeholder={{ label: "เลือกเพศ", value: null }}
              style={{ inputIOS: styles.pickerInput, inputAndroid: styles.pickerInput }}
            /> */}

            <Image
              style={[styles.iconlylight2User, styles.iconGroupLayout]}
              contentFit="cover"
              source={require("../assets/iconlylight2-user1.png")}
            />
          </View>
        </Pressable>
        <View style={[styles.label1, styles.labelLayout]}>
          <View style={[styles.labelBg, styles.labelGroupPosition]}>
            {/* <TouchableOpacity style={[styles.labelBgChild, styles.childPosition]} /> */}
            <TouchableOpacity
              style={[styles.labelBgChild, styles.childPosition]}
              onPress={showDatepicker}
            ></TouchableOpacity>
          </View>
          <TouchableOpacity style={[styles.placeholder1, styles.placeholderPosition]} onPress={showDatepicker}>
            {/* <Text style={[styles.dateOfBirth, styles.yourPosition]}>
              วันเดือนปีเกิด
            </Text> */}
            {/* Date of Birth */}
            <View>
              <Text style={[styles.dateOfBirth, styles.yourPosition, dateOfBirth ? { color: 'black' } : { color: '#adb5bd' }]}>
                {dateOfBirth
                  ? moment(dateOfBirth).format("DD/MM/YYYY")
                  // ? moment(dateOfBirth).locale('th').format("DD MMM YYYY") // กำหนด locale เป็น 'th'
                  : "วันเดือนปีเกิด"}
              </Text>
            </View>

            {showDatePicker && (
              <DateTimePicker
                testID="datePicker"
                value={dateOfBirth || new Date()}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onDateChange}
                locale={'th'}
                style={{ position: 'absolute', top: -10, paddingRight: 130 }} // Adjust this value based on your design
              />
            )}

            <Image
              style={[styles.iconlylightcalendar, styles.iconGroupLayout]}
              contentFit="cover"
              source={require("../assets/iconlylightcalendar1.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.label2, styles.labelLayout]}>
          <View style={[styles.labelBg2, styles.labelGroupPosition]}>
            {/* <TouchableOpacity style={[styles.labelBgChild, styles.childPosition]} /> */}
            <TouchableOpacity
              style={[styles.labelBgChild, styles.childPosition]}
              onPress={() => weightInputRef.current.focus()}
            />

          </View>
          <View style={[styles.buttonKg, styles.labelGroupPosition]}>
            <LinearGradient
              style={[styles.buttonKgChild, styles.childPosition]}
              locations={[0, 1]}
              colors={["#c58bf2", "#eea4ce"]}
            />
            <Text style={[styles.kg, styles.kgTypo]}>KG</Text>
          </View>
          <TouchableOpacity
            style={[styles.placeholder2, styles.placeholderPosition]}
            onPress={() => weightInputRef.current.focus()}
          >
            {/* <Text style={[styles.yourWeight, styles.yourPosition]}>
              น้ำหนักของคุณ
            </Text> */}
            <TextInput
              ref={weightInputRef}
              style={[styles.yourWeight, styles.yourPosition, weight ? { color: 'black' } : { color: 'gray' }]}
              placeholder="น้ำหนักของคุณ"
              value={weight}
              onChangeText={(text) => setWeight(text)}
            />
            <Image
              style={[styles.weightScale1Icon, styles.iconGroupLayout]}
              contentFit="cover"
              source={require("../assets/weightscale-11.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.label3, styles.labelLayout]}>
          <View style={[styles.labelBg2, styles.labelGroupPosition]}>
            {/* <TouchableOpacity style={[styles.labelBgChild, styles.childPosition]} /> */}
            <TouchableOpacity
              style={[styles.labelBgChild, styles.childPosition]}
              onPress={() => heightInputRef.current.focus()}
            />
          </View>
          <View style={[styles.buttonKg, styles.labelGroupPosition]}>
            <LinearGradient
              style={[styles.buttonKgChild, styles.childPosition]}
              locations={[0, 1]}
              colors={["#c58bf2", "#eea4ce"]}
            />
            <Text style={[styles.cm, styles.kgTypo]}>CM</Text>
          </View>
          <TouchableOpacity
            style={[styles.placeholder3, styles.placeholderPosition]}
            onPress={() => heightInputRef.current.focus()}
          >
            {/* <Text style={[styles.yourHeight, styles.yourPosition]}>
              <Text style={styles.text2}>ส่วนสูงของคุณ</Text>
            </Text> */}
            <TextInput
              ref={heightInputRef}
              style={[styles.yourHeight, styles.yourPosition, height ? { color: 'black' } : { color: 'gray' }]}
              placeholder="ส่วนสูงของคุณ"
              value={height}
              onChangeText={(text) => setHeight(text)}
            />

            <Image
              style={[styles.iconlylightswap, styles.iconGroupLayout]}
              contentFit="cover"
              source={require("../assets/iconlylightswap.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.man2}>
        <Image
          style={[styles.head1Icon, styles.iconGroupLayout]}
          contentFit="cover"
          source={require("../assets/head-1.png")}
        />
        <Image
          style={[styles.rArm1Icon, styles.iconGroupLayout]}
          contentFit="cover"
          source={require("../assets/r-arm-1.png")}
        />
        <View style={styles.legs1}>
          <Image
            style={[styles.groupIcon, styles.iconGroupLayout]}
            contentFit="cover"
            source={require("../assets/group1.png")}
          />
          <Image
            style={[styles.groupIcon1, styles.iconGroupLayout]}
            contentFit="cover"
            source={require("../assets/group2.png")}
          />
        </View>
        <Image
          style={[styles.short2Icon, styles.iconGroupLayout]}
          contentFit="cover"
          source={require("../assets/short-2.png")}
        />
        <Image
          style={[styles.body1Icon, styles.iconPosition]}
          contentFit="cover"
          source={require("../assets/body-1.png")}
        />
        <Image
          style={[styles.lArm1Icon, styles.iconPosition]}
          contentFit="cover"
          source={require("../assets/l-arm-1.png")}
        />
      </View>
      <View style={styles.lady2}>
        <Image
          style={[styles.head3Icon, styles.iconGroupLayout]}
          contentFit="cover"
          source={require("../assets/head-3.png")}
        />
        <View style={styles.shoes2}>
          <Image
            style={[styles.groupIcon2, styles.iconGroupLayout]}
            contentFit="cover"
            source={require("../assets/group3.png")}
          />
          <Image
            style={[styles.groupIcon3, styles.iconGroupLayout]}
            contentFit="cover"
            source={require("../assets/group4.png")}
          />
        </View>
        <Image
          style={[styles.legs2Icon, styles.iconGroupLayout]}
          contentFit="cover"
          source={require("../assets/legs-2.png")}
        />
        <Image
          style={[styles.lArm3Icon, styles.iconGroupLayout]}
          contentFit="cover"
          source={require("../assets/l-arm-3.png")}
        />
        <Image
          style={[styles.body3Icon, styles.iconGroupLayout]}
          contentFit="cover"
          source={require("../assets/body-3.png")}
        />
        <Image
          style={[styles.rArm3Icon, styles.iconGroupLayout]}
          contentFit="cover"
          source={require("../assets/r-arm-3.png")}
        />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  dropdownIconWrapper: {
    position: 'absolute',
    right: 0, // Adjust the position based on your design
    top: 0,   // Adjust the position based on your design
    width: "100%", // Adjust the width based on your design
    height: "100%", // Adjust the height based on your design
  },

  pickerInput: {
    left: "12%",
    fontFamily: FontFamily.textSmallTextRegular,
    color: Color.gray2,
    top: "0%",
    lineHeight: 18,
    textAlign: "left",
    fontSize: 13,

  },
  buttonLayout: {
    width: 315,
    position: "absolute",
  },
  labelGroupPosition: {
    height: "100%",
    bottom: "0%",
    top: "0%",
  },
  iconGroupLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  labelLayout: {
    height: 48,
    width: 315,
    left: 0,
    position: "absolute",
  },
  childPosition: {
    borderRadius: Border.br_sm,
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    height: "100%",
    position: "absolute",
    width: "100%",
  },
  placeholderPosition: {
    left: "4.76%",
    bottom: "31.25%",
    top: "31.25%",
    height: "37.5%",
    position: "absolute",
  },
  yourPosition: {
    color: Color.gray2,
    top: "0%",
    lineHeight: 18,
    fontSize: FontSize.textSmallTextRegular_size,
    textAlign: "left",
    position: "absolute",
  },
  kgTypo: {
    fontFamily: FontFamily.textSmallTextMedium,
    fontWeight: "500",
    top: "31.25%",
    color: Color.whiteColor,
    lineHeight: 18,
    fontSize: FontSize.textSmallTextRegular_size,
    textAlign: "left",
    position: "absolute",
  },
  iconPosition: {
    bottom: "51.51%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  text: {
    fontSize: FontSize.size_lg,
    lineHeight: 30,
    color: Color.blackColor,
    textAlign: "left",
    fontFamily: FontFamily.titleH4Bold,
    fontWeight: "700",
    left: 60,
    top: 0,
    position: "absolute",
  },
  text1: {
    top: 36,
    left: 20,
    color: Color.gray1,
    textAlign: "center",
    lineHeight: 18,
    fontSize: FontSize.textSmallTextRegular_size,
    fontFamily: FontFamily.textSmallTextRegular,
    position: "absolute",
  },
  profileText: {
    top: 379,
    left: 43,
    width: 309,
    height: 54,
    position: "absolute",
  },
  btn: {
    borderRadius: Border.br_80xl,
    backgroundColor: Color.blueLinear,
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    shadowOpacity: 1,
    elevation: 22,
    shadowRadius: 22,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowColor: "rgba(149, 173, 254, 0.3)",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  next1: {
    fontSize: FontSize.textLargeTextRegular_size,
    lineHeight: 24,
    color: Color.whiteColor,
    left: "0%",
    top: "0%",
    textAlign: "center",
    fontFamily: FontFamily.titleH4Bold,
    fontWeight: "700",
    position: "absolute",
  },
  iconlylightarrowRight2: {
    height: "83.33%",
    width: "32.26%",
    top: "8.33%",
    bottom: "8.33%",
    left: "67.74%",
    right: "0%",
  },
  next: {
    height: "40%",
    top: "30%",
    right: "40.32%",
    bottom: "30%",
    left: "40%",
    width: "19.68%",
    position: "absolute",
  },
  button: {
    top: 730,
    left: 40,
    height: 60,
    shadowOpacity: 1,
    elevation: 22,
    shadowRadius: 22,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowColor: "rgba(149, 173, 254, 0.3)",
  },
  vectorSectionIcon: {
    left: 10,
    width: 375,
    height: 350,
    top: 0,
    position: "absolute",
  },
  labelBgChild: {
    backgroundColor: Color.borderColor,
    // backgroundColor: 'yellow'
  },
  labelBg: {
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  dropdownIcon: {
    width: "5.71%",
    right: "4.76%",
    left: "89.52%",
    bottom: "31.25%",
    top: "31.25%",
    height: "37.5%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
    // backgroundColor: 'green'
  },
  chooseGender: {
    left: "38.89%",
    fontFamily: FontFamily.textSmallTextRegular,
  },
  iconlylight2User: {
    width: "7%",
    right: "75%",
    left: "0%",
    bottom: "0%",
    top: "0%",
    height: "100%",

  },
  placeholder: {
    width: "80%",
    right: "72.38%",
    // backgroundColor: 'red'
  },
  label: {
    top: 0,
  },
  dateOfBirth: {
    left: "12%",
    fontFamily: FontFamily.textSmallTextRegular,
  },
  iconlylightcalendar: {
    width: "7.2%",
    right: "80.43%",
    left: "0%",
    bottom: "0%",
    top: "0%",
    height: "100%",
  },
  placeholder1: {
    width: "90%",
    right: "66.03%",
  },
  label1: {
    top: 63,
  },
  labelBg2: {
    width: "80%",
    right: "20%",
    left: "0%",
    bottom: "0%",
    top: "0%",
    position: "absolute",
  },
  buttonKgChild: {
    backgroundColor: Color.blueLinear,
  },
  kg: {
    left: "33.33%",
  },
  buttonKg: {
    width: "15.24%",
    left: "84.76%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    position: "absolute",
  },
  yourWeight: {
    left: "15%",
    fontFamily: FontFamily.textSmallTextRegular,
  },
  weightScale1Icon: {
    width: "7.6%",
    right: "82.18%",
    left: "0%",
    bottom: "0%",
    top: "0%",
    height: "100%",
  },
  placeholder2: {
    width: "75%",
    right: "63.17%",
    // backgroundColor: 'red'

  },
  label2: {
    top: 126,
  },
  cm: {
    left: "29.17%",
  },
  text2: {
    fontFamily: FontFamily.textSmallTextRegular,
  },
  yourHeight: {
    left: "15%",
  },
  iconlylightswap: {
    width: "7.6%",
    right: "82%",
    left: "0%",
    bottom: "0%",
    top: "0%",
    height: "100%",
  },
  placeholder3: {
    width: "75%",
    right: "63.49%",
  },
  label3: {
    top: 189,
  },
  labelSection: {
    top: 463,
    left: 30,
    height: 237,
  },
  head1Icon: {
    height: "20.2%",
    width: "30.36%",
    right: "30.04%",
    bottom: "79.8%",
    left: "39.6%",
    top: "0%",
  },
  rArm1Icon: {
    height: "18.96%",
    width: "37.83%",
    top: "18.96%",
    right: "62.17%",
    bottom: "62.08%",
    left: "0%",
  },
  groupIcon: {
    height: "97.1%",
    width: "38.18%",
    top: "2.53%",
    bottom: "0.37%",
    left: "61.82%",
    right: "0%",
  },
  groupIcon1: {
    width: "43.13%",
    right: "56.87%",
    left: "0%",
    bottom: "0%",
    top: "0%",
    height: "100%",
  },
  legs1: {
    height: "36.75%",
    width: "71.33%",
    top: "63.25%",
    right: "12.37%",
    left: "16.31%",
    bottom: "0%",
    position: "absolute",
  },
  short2Icon: {
    height: "23.02%",
    width: "53.57%",
    top: "42.53%",
    right: "19.2%",
    bottom: "34.45%",
    left: "27.23%",
  },
  body1Icon: {
    height: "32.48%",
    width: "50.6%",
    top: "16%",
    right: "16.95%",
    left: "32.45%",
  },
  lArm1Icon: {
    height: "30.49%",
    width: "31.16%",
    top: "18%",
    right: "-0.08%",
    left: "68.92%",
  },
  man2: {
    height: "35.01%",
    width: "31.52%",
    top: "7.83%",
    right: "50%",
    bottom: "57.16%",
    left: "18.48%",
    position: "absolute",
  },
  head3Icon: {
    height: "18.12%",
    width: "50.54%",
    right: "23.84%",
    bottom: "81.88%",
    left: "25.63%",
    top: "0%",
  },
  groupIcon2: {
    width: "21.04%",
    left: "78.96%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    height: "100%",
  },
  groupIcon3: {
    height: "96.52%",
    right: "80.32%",
    bottom: "3.48%",
    width: "19.68%",
    left: "0%",
    top: "0%",
  },
  shoes2: {
    height: "7.65%",
    width: "96.31%",
    top: "92.35%",
    left: "3.69%",
    bottom: "0%",
    right: "0%",
    position: "absolute",
  },
  legs2Icon: {
    height: "55.27%",
    width: "88.56%",
    top: "37.61%",
    right: "4.41%",
    bottom: "7.12%",
    left: "7.03%",
  },
  lArm3Icon: {
    height: "25.85%",
    width: "41.95%",
    top: "17.17%",
    right: "58.05%",
    bottom: "56.99%",
    left: "0%",
  },
  body3Icon: {
    height: "23.3%",
    width: "56.26%",
    top: "15.8%",
    right: "18.83%",
    bottom: "60.91%",
    left: "24.91%",
  },
  rArm3Icon: {
    height: "41.07%",
    width: "40.76%",
    top: "15.99%",
    right: "6.32%",
    bottom: "42.94%",
    left: "52.92%",
  },
  lady2: {
    height: "31.65%",
    width: "21.24%",
    top: "11.2%",
    right: "24.84%",
    bottom: "57.14%",
    left: "53.92%",
    position: "absolute",
  },
  registerPage2: {
    borderRadius: Border.br_21xl,
    backgroundColor: Color.whiteColor,
    flex: 1,
    height: 830,
    overflow: "hidden",
    width: "100%",
  },
});

export default RegisterPage;
