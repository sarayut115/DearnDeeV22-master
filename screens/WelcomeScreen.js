import * as React from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Border, Padding } from "../GlobalStyles";

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      style={styles.welcomeScreen2}
      locations={[0, 1]}
      colors={["#92a3fd", "#9dceff"]}
    >
      <View
        style={[
          styles.functionalElectricalStimulatParent,
          styles.functionalLayout,
        ]}
      >
        <Text
          style={[styles.functionalElectricalStimulat, styles.functionalLayout]}
        >{`Functional 
Electrical Stimulation`}</Text>
        <View style={[styles.dearndeev2Wrapper, styles.dearndeev2Layout]}>
          <Text style={[styles.dearndeev2, styles.button1Typo]}>
            <Text style={[styles.dearndee, styles.textCenter]}>DearnDee</Text>
            <Text style={[styles.v2, styles.textCenter]}>V2</Text>
          </Text>
        </View>
      </View>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Onboarding3")}
      >
        <Text style={[styles.button1, styles.button1Typo]}>ไปเริ่มกันเลย</Text>
      </Pressable>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  functionalLayout: {
    width: 326,
    position: "absolute",
  },
  dearndeev2Layout: {
    height: 35,
    width: 249,
    top: 0,
    position: "absolute",
  },
  button1Typo: {
    textAlign: "left",
    fontFamily: FontFamily.titleH4Bold,
    fontWeight: "700",
  },
  functionalElectricalStimulat: {
    top: 49,
    fontSize: FontSize.size_lg,
    fontFamily: FontFamily.textSmallTextRegular,
    color: Color.gray1,
    textAlign: "center",
    height: 61,
    left: 0,
  },
  dearndee: {
    fontSize: 36,
    color: Color.blackColor,
    height: 50, // ปรับความสูงตามที่คุณต้องการ
    width: "auto", // ให้กว้างตามข้อความ
  },
  v2: {
    fontSize: 50,
    color: Color.whiteColor,
    height: 50, // ปรับความสูงตามที่คุณต้องการ
    width: "auto", // ให้กว้างตามข้อความ
  },
  textCenter: {
    textAlign: "center",
  },
  dearndeev2Txt: {
    width: "100%",
    flexDirection: "row", // เพิ่ม flexDirection เพื่อให้มีการจัดตำแหน่งแนวนอน
  },
  dearndeev2: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row", // เพิ่ม flexDirection เพื่อให้มีการจัดตำแหน่งแนวนอน
    height: 110,
    width: "auto", // ให้กว้างตามข้อความ
    top: -10,
    position: "absolute",
    left: 0,
  },
  dearndeev2Wrapper: {
    left: 39,
    flexDirection: "row", // เพิ่ม flexDirection เพื่อให้มีการจัดตำแหน่งแนวนอน
  },
  functionalElectricalStimulatParent: {
    top: 371,
    left: 24,
    height: 110,
  },
  button1: {
    fontSize: FontSize.textLargeTextRegular_size,
  },
  button: {
    top: 712,
    left: 30,
    borderRadius: Border.br_80xl,
    backgroundColor: Color.whiteColor,
    shadowColor: "rgba(149, 173, 254, 0.3)",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 22,
    elevation: 22,
    shadowOpacity: 1,
    width: 315,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Padding.p_110xl,
    paddingVertical: Padding.p_lg,
    position: "absolute",
  },
  welcomeScreen2: {
    borderRadius: Border.br_21xl,
    flex: 1,
    height: 812,
    overflow: "hidden",
    backgroundColor: Color.blueLinear,
    width: "100%",
  },
});

export default WelcomeScreen;
