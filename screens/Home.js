import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { FontFamily, FontSize, Border, Color, Padding } from "../GlobalStyles";

const Home = () => {
  return (
    <View style={styles.home}>
      <View style={[styles.latestWorkoutSection, styles.headerLayout1]}>
        <View style={[styles.workoutCard1, styles.workoutCardLayout]}>
          <View style={[styles.workoutCardBg, styles.textCardPosition]}>
            <View style={[styles.workoutCardBg1, styles.textCardPosition]} />
          </View>
          <View style={[styles.workoutText, styles.workoutPosition1]}>
            <Text style={[styles.text, styles.textCardPosition]}>
              <Text
                style={[styles.text1, styles.textTypo1]}
              >{`ใช้งานเครื่องไปทั้งหมด `}</Text>
              <Text style={[styles.text2, styles.textLayout]}>20 นาที</Text>
              <Text style={[styles.text1, styles.textTypo1]}>{` `}</Text>
            </Text>
            <Text style={[styles.text4, styles.textLayout]}>
              สถานะแบตเตอรี่หลังใช้งาน 20%
            </Text>
          </View>
          <View style={[styles.workoutProgressBar, styles.workoutLayout1]}>
            <View
              style={[styles.workoutProgressBarChild, styles.workoutLayout1]}
            />
            <LinearGradient
              style={[styles.workoutProgressBarItem, styles.workoutPosition]}
              locations={[0, 1]}
              colors={["#c58bf2", "#92a3fd"]}
            />
          </View>
          <Image
            style={styles.workoutPicIcon}
            contentFit="cover"
            source={require("../assets/workoutpic.png")}
          />
          <Image
            style={styles.workoutBtnIcon}
            contentFit="cover"
            source={require("../assets/workoutbtn.png")}
          />
        </View>
        <View style={[styles.workoutCard11, styles.workoutCardLayout]}>
          <View style={[styles.workoutCardBg, styles.textCardPosition]}>
            <View style={[styles.workoutCardBg1, styles.textCardPosition]} />
          </View>
          <View style={[styles.workoutText1, styles.workoutLayout]}>
            <Text style={[styles.text5, styles.textTypo2]}>
              <Text style={styles.text6}>ใช้งานเครื่องไปทั้งหมด 50 นาที</Text>
              <Text style={styles.textTypo1}>{` `}</Text>
            </Text>
            <Text style={[styles.text4, styles.textLayout]}>
              สถานะแบตเตอรี่หลังใช้งาน 50%
            </Text>
          </View>
          <View style={[styles.workoutProgressBar, styles.workoutLayout1]}>
            <View
              style={[styles.workoutProgressBarChild, styles.workoutLayout1]}
            />
            <LinearGradient
              style={[styles.workoutProgressBarItem, styles.workoutPosition]}
              locations={[0, 1]}
              colors={["#c58bf2", "#92a3fd"]}
            />
          </View>
          <Image
            style={styles.workoutPicIcon}
            contentFit="cover"
            source={require("../assets/workoutpic1.png")}
          />
          <Image
            style={styles.workoutBtnIcon}
            contentFit="cover"
            source={require("../assets/workoutbtn.png")}
          />
        </View>
        <View style={[styles.latestWorkout, styles.workoutLayout]}>
          <Text style={[styles.text9, styles.textTypo]}>
            ประวัติการใช้งานล่าสุด
          </Text>
        </View>
        <View style={styles.seemore}>
          <Text style={[styles.text10, styles.textPosition1]}>ดูเพิ่มเติม</Text>
        </View>
        <View style={[styles.workoutCard2, styles.workoutCardLayout]}>
          <View style={[styles.workoutCardBg, styles.textCardPosition]}>
            <View style={[styles.workoutCardBg5, styles.baShadowBox]} />
          </View>
          <View style={[styles.workoutText1, styles.workoutLayout]}>
            <Text style={[styles.text11, styles.textTypo1]}>
              ใช้งานเครื่องไปทั้งหมด 30 นาที
            </Text>
            <Text style={[styles.text4, styles.textLayout]}>
              สถานะแบตเตอรี่หลังใช้งาน 30%
            </Text>
          </View>
          <View style={[styles.workoutProgressBar, styles.workoutLayout1]}>
            <View
              style={[styles.workoutProgressBarChild, styles.workoutLayout1]}
            />
            <LinearGradient
              style={[styles.workoutProgressBarChild1, styles.workoutPosition]}
              locations={[0, 1]}
              colors={["#c58bf2", "#92a3fd"]}
            />
          </View>
          <Image
            style={styles.workoutBtnIcon}
            contentFit="cover"
            source={require("../assets/workoutbtn.png")}
          />
          <Image
            style={styles.workoutPicIcon}
            contentFit="cover"
            source={require("../assets/workoutpic2.png")}
          />
        </View>
      </View>
      <View style={[styles.header, styles.headerLayout]}>
        <View style={[styles.titleHome, styles.headerLayout]}>
          <Text style={[styles.text13, styles.textPosition1]}>
            ยินดีต้อนรับ
          </Text>
          <Text style={styles.maximus}>maximus</Text>
        </View>
        <Image
          style={styles.notificationIcon}
          contentFit="cover"
          source={require("../assets/notification.png")}
        />
      </View>
      <View style={[styles.banner, styles.headerLayout1]}>
        <View style={[styles.bannerBackground, styles.childPosition]}>
          <LinearGradient
            style={[styles.ba, styles.childPosition]}
            locations={[0, 1]}
            colors={["#92a3fd", "#9dceff"]}
          />
        </View>
        <Image
          style={[styles.bannerDotsIcon, styles.childPosition]}
          contentFit="cover"
          source={require("../assets/bannerdots.png")}
        />
        <View style={[styles.bannerText, styles.textPosition]}>
          <Text style={[styles.bmiBodyMass, styles.checkClr]}>
            อุปกรณ์ที่คุณเชื่อมต่อ
          </Text>
          <Text style={[styles.youHaveA, styles.checkClr]}>
            การทำงาน การกระตุ้นด้วยไฟฟ้า
          </Text>
        </View>
        <LinearGradient
          style={[styles.button, styles.textPosition]}
          locations={[0, 1]}
          colors={["#c58bf2", "#eea4ce"]}
        >
          <Text style={[styles.button1, styles.checkClr]}>ดูเพิ่มเติม</Text>
        </LinearGradient>
        <View style={[styles.bannerPie, styles.bannerPiePosition]}>
          <Image
            style={[styles.bannerDotsIcon, styles.childPosition]}
            contentFit="cover"
            source={require("../assets/bannerpieellipse1.png")}
          />
          <View style={styles.bannerPieText}>
            <Text style={[styles.text14, styles.checkClr]}>20,1</Text>
          </View>
        </View>
      </View>
      <View style={styles.logoApp1} />
      <View style={[styles.action, styles.headerLayout1]}>
        <View style={[styles.bannerBackground, styles.childPosition]}>
          <LinearGradient
            style={[styles.scheduleBgChild, styles.childPosition]}
            locations={[0, 1]}
            colors={["#92a3fd", "#9dceff"]}
          />
        </View>
        <View style={[styles.workoutScheduleText, styles.textPosition]}>
          <Text style={[styles.todayTarget, styles.bmiBodyMassPosition]}>
            สถานะแบตเตอรี่
          </Text>
        </View>
        <View style={[styles.buttonCheck, styles.bannerPiePosition]}>
          <View style={[styles.bannerBackground, styles.childPosition]}>
            <LinearGradient
              style={[styles.buttonBgChild, styles.childPosition]}
              locations={[0, 1]}
              colors={["#92a3fd", "#9dceff"]}
            />
          </View>
          <View style={styles.buttonText}>
            <Text style={[styles.check, styles.checkClr]}> 88 %</Text>
          </View>
        </View>
      </View>
      <Image
        style={styles.navbarIcon}
        contentFit="cover"
        source={require("../assets/navbar.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerLayout1: {
    width: 315,
    left: 30,
  },
  workoutCardLayout: {
    height: 80,
    width: 315,
    position: "absolute",
  },
  textCardPosition: {
    top: 0,
    left: 0,
  },
  workoutPosition1: {
    height: 36,
    left: 75,
    top: 15,
  },
  textTypo1: {
    fontFamily: FontFamily.textSmallTextMedium,
    fontWeight: "500",
  },
  textLayout: {
    lineHeight: 15,
    fontSize: FontSize.textCaptionSemiBold_size,
  },
  workoutLayout1: {
    height: 10,
    width: 191,
    position: "absolute",
  },
  workoutPosition: {
    borderBottomLeftRadius: Border.br_31xl,
    borderTopLeftRadius: Border.br_31xl,
    backgroundColor: Color.blueLinear,
    height: 10,
    top: 0,
    left: 0,
    position: "absolute",
  },
  workoutLayout: {
    width: 146,
    position: "absolute",
  },
  textTypo2: {
    fontSize: FontSize.textSmallTextSemiBold_size,
    lineHeight: 18,
  },
  textTypo: {
    fontFamily: FontFamily.textCaptionSemiBold,
    fontWeight: "600",
  },
  textPosition1: {
    color: Color.gray2,
    lineHeight: 18,
    fontSize: FontSize.textSmallTextSemiBold_size,
    textAlign: "left",
    top: 0,
    left: 0,
    position: "absolute",
  },
  baShadowBox: {
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 10,
    },
  },
  headerLayout: {
    height: 53,
    position: "absolute",
  },
  childPosition: {
    left: "0%",
    position: "absolute",
  },
  textPosition: {
    left: "6.35%",
    position: "absolute",
  },
  checkClr: {
    color: Color.whiteColor,
    textAlign: "left",
  },
  bannerPiePosition: {
    right: "6.35%",
    position: "absolute",
  },
  bmiBodyMassPosition: {
    fontSize: FontSize.textMediumTextSemiBold_size,
    left: "0%",
    top: "0%",
    position: "absolute",
  },
  workoutCardBg1: {
    borderRadius: Border.br_base,
    height: 80,
    width: 315,
    position: "absolute",
    backgroundColor: Color.whiteColor,
    top: 0,
  },
  workoutCardBg: {
    height: 80,
    width: 315,
    position: "absolute",
  },
  text1: {
    color: Color.blackColor,
    lineHeight: 18,
    fontSize: FontSize.textSmallTextSemiBold_size,
  },
  text2: {
    color: "#130f26",
    fontFamily: FontFamily.textSmallTextRegular,
  },
  text: {
    textAlign: "left",
    position: "absolute",
  },
  text4: {
    top: 21,
    color: Color.gray21,
    fontFamily: FontFamily.textSmallTextRegular,
    textAlign: "left",
    left: 0,
    position: "absolute",
  },
  workoutText: {
    width: 140,
    position: "absolute",
  },
  workoutProgressBarChild: {
    backgroundColor: Color.borderColor,
    borderRadius: Border.br_31xl,
    top: 0,
    left: 0,
  },
  workoutProgressBarItem: {
    width: 63,
    backgroundColor: Color.blueLinear,
  },
  workoutProgressBar: {
    top: 60,
    left: 75,
    height: 10,
    width: 191,
  },
  workoutPicIcon: {
    left: 15,
    width: 50,
    height: 50,
    top: 15,
    position: "absolute",
  },
  workoutBtnIcon: {
    top: 28,
    left: 276,
    width: 24,
    height: 24,
    position: "absolute",
  },
  workoutCard1: {
    top: 39,
    left: 0,
  },
  text6: {
    fontFamily: FontFamily.textSmallTextRegular,
  },
  text5: {
    color: Color.blackColor,
    lineHeight: 18,
    textAlign: "left",
    top: 0,
    left: 0,
    position: "absolute",
  },
  workoutText1: {
    height: 36,
    left: 75,
    top: 15,
  },
  workoutCard11: {
    top: 229,
    left: 0,
  },
  text9: {
    fontSize: FontSize.textLargeTextSemiBold_size,
    lineHeight: 24,
    color: Color.blackColor,
    textAlign: "left",
    top: 0,
    left: 0,
    position: "absolute",
  },
  latestWorkout: {
    height: 24,
    top: 0,
    left: 0,
  },
  text10: {
    fontFamily: FontFamily.textSmallTextMedium,
    fontWeight: "500",
  },
  seemore: {
    top: 3,
    left: 257,
    width: 45,
    height: 18,
    position: "absolute",
  },
  workoutCardBg5: {
    shadowColor: "rgba(29, 36, 42, 0.05)",
    shadowRadius: 40,
    elevation: 40,
    borderRadius: Border.br_base,
    top: 0,
    left: 0,
    height: 80,
    width: 315,
    position: "absolute",
    backgroundColor: Color.whiteColor,
  },
  text11: {
    color: Color.blackColor,
    lineHeight: 18,
    fontSize: FontSize.textSmallTextSemiBold_size,
    textAlign: "left",
    top: 0,
    left: 0,
    position: "absolute",
  },
  workoutProgressBarChild1: {
    width: 105,
    backgroundColor: Color.blueLinear,
  },
  workoutCard2: {
    top: 134,
    left: 0,
  },
  latestWorkoutSection: {
    top: 386,
    height: 309,
    position: "absolute",
  },
  text13: {
    fontFamily: FontFamily.textSmallTextRegular,
  },
  maximus: {
    top: 23,
    fontSize: FontSize.titleH4Bold_size,
    lineHeight: 30,
    fontWeight: "700",
    fontFamily: FontFamily.titleH4Bold,
    color: Color.blackColor,
    textAlign: "left",
    left: 0,
    position: "absolute",
  },
  titleHome: {
    width: 99,
    top: 0,
    left: 0,
  },
  notificationIcon: {
    top: 5,
    left: 275,
    width: 40,
    height: 40,
    position: "absolute",
  },
  header: {
    top: 40,
    width: 315,
    left: 30,
  },
  ba: {
    borderRadius: Border.br_3xl,
    shadowColor: "rgba(149, 173, 254, 0.3)",
    shadowRadius: 22,
    elevation: 22,
    bottom: "0%",
    right: "0%",
    height: "100%",
    left: "0%",
    top: "0%",
    width: "100%",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    backgroundColor: Color.blueLinear,
  },
  bannerBackground: {
    bottom: "0%",
    right: "0%",
    height: "100%",
    left: "0%",
    top: "0%",
    width: "100%",
  },
  bannerDotsIcon: {
    maxWidth: "100%",
    maxHeight: "100%",
    bottom: "0%",
    right: "0%",
    height: "100%",
    left: "0%",
    top: "0%",
    width: "100%",
    overflow: "hidden",
  },
  bmiBodyMass: {
    lineHeight: 21,
    fontSize: FontSize.textMediumTextSemiBold_size,
    left: "0%",
    top: "0%",
    position: "absolute",
    fontFamily: FontFamily.textCaptionSemiBold,
    fontWeight: "600",
  },
  youHaveA: {
    top: "59.09%",
    left: "0%",
    position: "absolute",
    fontFamily: FontFamily.textSmallTextRegular,
    lineHeight: 18,
    fontSize: FontSize.textSmallTextSemiBold_size,
  },
  bannerText: {
    height: "30.14%",
    width: "46.98%",
    top: "17.81%",
    right: "46.67%",
    bottom: "52.05%",
  },
  button1: {
    fontFamily: FontFamily.textCaptionSemiBold,
    fontWeight: "600",
    lineHeight: 15,
    fontSize: FontSize.textCaptionSemiBold_size,
  },
  button: {
    height: "23.97%",
    width: "30.16%",
    top: "58.22%",
    right: "63.49%",
    bottom: "17.81%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Padding.p_11xl,
    paddingVertical: Padding.p_3xs,
    backgroundColor: Color.blueLinear,
    borderRadius: Border.br_31xl,
  },
  text14: {
    left: "0%",
    position: "absolute",
    top: "0%",
    color: Color.whiteColor,
    fontSize: FontSize.textSmallTextSemiBold_size,
    fontFamily: FontFamily.textCaptionSemiBold,
    fontWeight: "600",
    lineHeight: 18,
  },
  bannerPieText: {
    height: "16.98%",
    width: "21.7%",
    top: "18.87%",
    right: "18.87%",
    bottom: "64.15%",
    left: "59.43%",
    display: "none",
    position: "absolute",
  },
  bannerPie: {
    height: "72.6%",
    width: "33.65%",
    top: "13.7%",
    bottom: "13.7%",
    left: "60%",
  },
  banner: {
    top: 123,
    height: 146,
    position: "absolute",
  },
  logoApp1: {
    top: 152,
    left: 209,
    width: 121,
    height: 91,
    position: "absolute",
  },
  scheduleBgChild: {
    opacity: 0.2,
    bottom: "0%",
    right: "0%",
    height: "100%",
    left: "0%",
    top: "0%",
    width: "100%",
    backgroundColor: Color.blueLinear,
    borderRadius: Border.br_base,
  },
  todayTarget: {
    color: Color.blackColor,
    fontFamily: FontFamily.textSmallTextMedium,
    fontWeight: "500",
    textAlign: "left",
  },
  workoutScheduleText: {
    height: "36.84%",
    width: "28.25%",
    top: "31.58%",
    right: "65.4%",
    bottom: "31.58%",
  },
  buttonBgChild: {
    bottom: "0%",
    right: "0%",
    height: "100%",
    left: "0%",
    top: "0%",
    width: "100%",
    backgroundColor: Color.blueLinear,
    borderRadius: Border.br_31xl,
  },
  check: {
    left: "0%",
    position: "absolute",
    top: "0%",
    color: Color.whiteColor,
    fontSize: FontSize.textSmallTextSemiBold_size,
    fontFamily: FontFamily.textSmallTextRegular,
  },
  buttonText: {
    height: "64.29%",
    width: "50%",
    top: "17.86%",
    right: "27.94%",
    bottom: "17.86%",
    left: "22.06%",
    position: "absolute",
  },
  buttonCheck: {
    height: "49.12%",
    width: "21.59%",
    top: "26.32%",
    bottom: "24.56%",
    left: "72.06%",
  },
  action: {
    top: 299,
    height: 57,
    position: "absolute",
  },
  navbarIcon: {
    top: 722,
    width: 375,
    height: 90,
    left: 0,
    position: "absolute",
  },
  home: {
    borderRadius: Border.br_21xl,
    flex: 1,
    height: 812,
    overflow: "hidden",
    width: "100%",
    backgroundColor: Color.whiteColor,
  },
});

export default Home;
