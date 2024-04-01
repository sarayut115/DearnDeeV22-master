import * as React from "react";
import { Text, StyleSheet, View, Pressable, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";

const Onboarding1 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.onboarding3}>
      <View style={styles.textSection}>
        <Text style={[styles.text, styles.textPosition]}>
          อุปกรณ์สั่งการด้วยเซ็นเซอร์ไร้สาย
        </Text>
        <Text
          style={[styles.text1, styles.textPosition]}
        >{`ผู้ใช้สามารถควบคุมการทำงานของเครื่องกระตุ้นกระแส
ไฟฟ้าด้วยเซ็นเซอร์ไร้สาย เพื่อปรับเปลี่ยนค่าต่างๆ ได้
ตามความต้องการ`}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Onboarding")}
      >
        <Image
          style={styles.iconLayout1}
          contentFit="cover"
          source={require("../assets/typeonboarding--3.png")}
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
          source={require("../assets/group5.png")}
        />
        <Image
          style={[styles.pngTransparentWirelessSensoIcon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/pngtransparentwirelesssensornetworkfreecontentsensorspassiveinfraredsensorwirelesstechnology-1.png")}
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
    top: 0,
    fontSize: FontSize.size_4xl,
    lineHeight: 36,
    fontWeight: "700",
    fontFamily: FontFamily.titleH4Bold,
    color: Color.blackColor,
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
    width: 321,
    height: 114,
    position: "absolute",
  },
  iconLayout1: {
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
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    height: "100%",
    width: "100%",
  },
  pngTransparentWirelessSensoIcon: {
    height: "75.63%",
    width: "84.27%",
    top: "15.03%",
    right: "3.2%",
    bottom: "9.34%",
    left: "12.53%",
  },
  frame: {
    top: -35,
    width: 395,
    height: 465,
    left: 0,
    position: "absolute",
    overflow: "hidden",
  },
  onboarding3: {
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

export default Onboarding1;
