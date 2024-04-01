import * as React from "react";
import { Text, StyleSheet, View, Pressable, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";

const Onboarding2 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.onboarding2}>
      <View style={styles.textSection}>
        <Text style={[styles.text, styles.textPosition]}>
          เฉพาะผู้ป่วยที่มีภาวะปลายเท้าตก
        </Text>
        <Text
          style={[styles.text1, styles.textPosition]}
        >{`อุปกรณ์จะช่วยผู้ป่วยอัมพฤกษ์อัมพาตที่มีสาเหตุมาจาก
โรคหลอดเลือดในสมองที่ไม่สามารถขยับกล้ามเนื้อบริเวณขาและเท้าที่อ่อนแรง`}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Onboarding1")}
      >
        <Image
          style={styles.icon}
          contentFit="cover"
          source={require("../assets/typeonboarding--2.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => navigation.navigate("LoginPage")} // หรือตามที่คุณต้องการ
      >
        <Text style={styles.skipButtonText}>ข้าม</Text>
      </TouchableOpacity>
      <Image
        style={styles.frameIcon}
        contentFit="cover"
        source={require("../assets/frame1.png")}
      />
      <Image
        style={styles.fndqhsnauamoPv1Icon}
        contentFit="cover"
        source={require("../assets/fndqhsnauamopv-1.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textPosition: {
    textAlign: "left",
    left: 0,
    position: "absolute",
  },
  text: {
    fontSize: FontSize.size_4xl,
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
  frameIcon: {
    width: 400,
    height: 431,
    left: 0,
    top: 0,
    position: "absolute",
    overflow: "hidden",
  },
  fndqhsnauamoPv1Icon: {
    height: "49.38%",
    width: "95.47%",
    top: "6.77%",
    right: "4.53%",
    bottom: "43.84%",
    left: "0%",
    maxWidth: "100%",
    maxHeight: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  onboarding2: {
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

export default Onboarding2;
