import * as React from "react";
import { Text, StyleSheet, View, Pressable, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";
import { LinearGradient } from "expo-linear-gradient";

const Onboarding3 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.onboarding1}>
      <View style={styles.textSection}>
        <Text style={[styles.text, styles.textPosition]}>
          เครื่องกระตุ้นเส้นประสาท
        </Text>
        <Text style={[styles.text1, styles.textPosition]}>
          เป็นอุปกรณ์ที่สามารถส่งกระแสไฟฟ้าไปกระตุ้นเส้นประสาทที่สั่งการให้กล้ามเนื้อหดตัวโดยเฉพาะเส้นประสาทที่สั่งการมาที่ปลายเท้า
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Onboarding2")}
      >
        <Image
          style={styles.icon}
          contentFit="cover"
          source={require("../assets/typeonboarding--1.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => navigation.navigate("LoginPage")} // หรือตามที่คุณต้องการ
      >
        <Text style={styles.skipButtonText}>ข้าม</Text>
      </TouchableOpacity>

      <View style={styles.frame}>
        <Image
          style={[styles.groupIcon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/group6.png")}
        />
        <Image
          style={[styles.fesLegIcon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/fes-leg.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textPosition: {
    textAlign: "left",
    left: 0,
    position: "absolute",
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  text: {
    fontSize: FontSize.titleH2Bold_size,
    lineHeight: 36,
    fontWeight: "700",
    fontFamily: FontFamily.titleH4Bold,
    color: Color.blackColor,
    top: 0,
    textAlign: "left",
  },
  text1: {
    top: 51,
    fontSize: FontSize.linkBig_size,
    lineHeight: 21,
    fontFamily: FontFamily.textSmallTextRegular,
    color: Color.gray1,
    width: 315,
  },
  textSection: {
    top: 470,
    left: 30,
    height: 114,
    width: 315,
    position: "absolute",
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  button: {
    left: 285,
    top: 712,
    width: 60,
    height: 60,
    position: "absolute",
  },
  groupIcon: {
    height: "109.09%",
    top: "-9.11%",
    right: "0%",
    bottom: "0.02%",
    left: "0%",
    width: "100%",
  },
  fesLegIcon: {
    height: "63.79%",
    width: "63.2%",
    top: "26.85%",
    right: "13.33%",
    bottom: "9.36%",
    left: "23.47%",
  },
  frame: {
    width: 392,
    height: 431,
    left: 0,
    top: 0,
    position: "absolute",
    overflow: "hidden",
    // backgroundColor:'red'
  },
  onboarding1: {
    borderRadius: Border.br_21xl,
    backgroundColor: Color.whiteColor,
    flex: 1,
    height: 812,
    overflow: "hidden",
    width: "100%",
  },

  skipButton: {
    position: "absolute",
    bottom: 70,
    left: 30,
    padding: 10,
  },
  skipButtonText: {
    fontSize: FontSize.textLargeTextRegular_size,
    color: Color.gray1,
    fontFamily: FontFamily.titleH4Bold,
  },

});

export default Onboarding3;
