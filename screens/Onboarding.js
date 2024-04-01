import * as React from "react";
import { Text, StyleSheet, View, Pressable, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";

const Onboarding = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.onboarding4}>
      <View style={styles.textSection}>
        <Text style={[styles.text, styles.textFlexBox]}>
          กลับมาเดินได้อีกครั้ง
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("LoginPage")}
      >
        <Image
          style={styles.icon}
          contentFit="cover"
          source={require("../assets/typeonboarding--4.png")}
        />
      </TouchableOpacity>
      <Image
        style={[styles.frameIcon, styles.textPosition]}
        contentFit="cover"
        source={require("../assets/frame.png")}
      />
      <Text
        style={[styles.text1, styles.textFlexBox]}
      >{`ผู้ป่วยที่มีอาการปลายเท้าตกจะได้รับการรักษาด้วยเครื่องกระตุ้นกระแสไฟฟ้า การรักษานี้จะช่วยให้ผู้ป่วยสามารถเดินได้อีกครั้ง`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textFlexBox: {
    textAlign: "left",
    position: "absolute",
  },
  textPosition: {
    left: 0,
    top: 0,
  },
  text: {
    fontSize: FontSize.titleH2Bold_size,
    lineHeight: 36,
    fontWeight: "700",
    fontFamily: FontFamily.titleH4Bold,
    color: Color.blackColor,
    left: 0,
    top: 0,
    width: 238,
  },
  textSection: {
    top: 470,
    height: 36,
    width: 238,
    left: 30,
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
    width: 392,
    height: 447,
    position: "absolute",
    overflow: "hidden",
  },
  text1: {
    top: 519,
    fontSize: FontSize.linkBig_size,
    lineHeight: 21,
    fontFamily: FontFamily.textSmallTextRegular,
    color: Color.gray1,
    width: 315,
    left: 30,
  },
  onboarding4: {
    borderRadius: Border.br_21xl,
    backgroundColor: Color.whiteColor,
    flex: 1,
    height: 812,
    overflow: "hidden",
    width: "100%",
  },
});

export default Onboarding;
