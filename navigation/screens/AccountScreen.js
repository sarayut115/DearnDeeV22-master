import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView, Switch, Modal, TextInput, Button } from 'react-native';
import { firebase } from '../../config';
import ToggleSwitch from 'toggle-switch-react-native';
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { FontSize, Color, Border, FontFamily } from "../../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from '@react-navigation/native';

export default function AccountScreen({ }) {
    const navigation = useNavigation();
    const db = firebase.firestore();
    const auth = firebase.auth();
    const realtimeDB = firebase.database();

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const [userData, setUserData] = useState(null);
    const [age, setAge] = useState(null); // เพิ่ม state เพื่อเก็บข้อมูลอายุ
    const [gender, setGender] = useState("");

    const [editData, setEditData] = useState({
        height: '',
        weight: '',
        // dateOfBirth: '',
    });
    const [isEditing, setIsEditing] = useState(false);

    // useEffect(() => {
    //     const unsubscribe = db.collection('users')
    //         .doc(auth.currentUser.uid)
    //         .onSnapshot((doc) => {
    //             if (doc.exists) {
    //                 const userData = doc.data();
    //                 setUserData(userData);
    //                 calculateAge(userData.dateOfBirth); // เรียกใช้ฟังก์ชัน calculateAge ด้วยวันเกิดที่ได้มา
    //             } else {
    //                 console.log('No such document!');
    //             }
    //         });

    //     // Cleanup function
    //     return () => {
    //         unsubscribe();
    //     };
    // }, []);

    useFocusEffect(
        React.useCallback(() => {
          const unsubscribe = db.collection('users')
            .doc(auth.currentUser.uid)
            .onSnapshot((doc) => {
              if (doc.exists) {
                const userData = doc.data();
                setUserData(userData);
                setGender(userData.gender);
                if (userData.dateOfBirth) {
                  calculateAge(userData.dateOfBirth);
                }
              } else {
                console.log('No such document!');
              }
            });
      
          // Cleanup function
          return () => {
            unsubscribe();
          };
        }, [])
      );


    const calculateAge = (dateOfBirth) => {
        const birthDate = new Date(dateOfBirth.seconds * 1000);
        const currentDate = new Date();
        // คำนวณอายุโดยลบวันเกิดจากวันปัจจุบัน
        let age = currentDate.getFullYear() - birthDate.getFullYear();
        // ตรวจสอบว่าวันเกิดผ่านไปแล้วหรือยัง
        const currentMonth = currentDate.getMonth() + 1;
        const birthMonth = birthDate.getMonth() + 1;
        if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDate.getDate() < birthDate.getDate())) {
            age--;
        }
        // เซ็ตค่าอายุใน state
        setAge(age);
    };

    const openEditPopup = () => {
        setIsEditing(true);
    };

    const closeEditPopup = () => {
        setIsEditing(false);
    };

    const saveEditedData = () => {
        // ทำการอัปเดตข้อมูลใน Firebase
        db.collection('users').doc(auth.currentUser.uid).update({
            height: editData.height,
            weight: editData.weight,
            dateOfBirth: editData.dateOfBirth,
        })
            .then(() => {
                console.log('ข้อมูลถูกอัพเดทเรียบร้อยแล้ว!');
                closeEditPopup(); // ปิด popup เมื่อบันทึกข้อมูลสำเร็จ
            })
            .catch((error) => {
                console.error('เกิดข้อผิดพลาดในการอัพเดทโปรไฟล์: ', error);
            });
    };


    if (!userData) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }
    return (
        <ScrollView>
            <View style={styles.profile}>
                <View style={[styles.profileSection, styles.sectionPosition]}>
                    <View style={styles.personalData}>
                        <View style={[styles.heightCard, styles.cardLayout]}>
                            <View style={[styles.heightCard, styles.cardLayout]}>
                                <View style={[styles.bgChild, styles.childShadowBox]} />
                            </View>
                            <View style={[styles.heightText, styles.textPosition2]}>
                                <Text style={styles.cm}>{userData.height} cm</Text>
                                <Text style={[styles.text, styles.textTypo]}>ส่วนสูง</Text>
                            </View>
                        </View>
                        <View style={[styles.weightCard, styles.cardLayout]}>
                            <View style={[styles.heightCard, styles.cardLayout]}>
                                <View style={[styles.bgItem, styles.childShadowBox]} />
                            </View>
                            <View style={[styles.weightText, styles.textPosition2]}>
                                <Text style={styles.cm}>{userData.weight} kg</Text>
                                <Text style={[styles.text1, styles.textTypo]}>น้ำหนัก</Text>
                            </View>
                        </View>
                        <View style={[styles.ageCard, styles.cardLayout]}>
                            <View style={[styles.heightCard, styles.cardLayout]}>
                                <View style={[styles.bgInner, styles.childShadowBox]} />
                            </View>
                            <View style={[styles.ageText, styles.textPosition2]}>
                                <Text style={styles.cm}>{age} ปี</Text>
                                <Text style={[styles.text3, styles.textTypo]}>อายุ</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.name, styles.namePosition]}>
                        <Text style={[styles.maximusWalker, styles.text6Position]}>
                            {userData.firstName} {userData.lastName}
                        </Text>
                        <Text style={[styles.loseAFat, styles.textTypo]}>
                            {userData.email}
                        </Text>
                    </View>
                    <Image
                        style={styles.latestPicIcon}
                        contentFit="cover"
                        source={gender === 'ชาย' ? require("../../assets/profilemale.png") : require("../../assets/latestpic.png")}
                    />
                    <TouchableOpacity style={[styles.button, styles.bg3Layout]} onPress={() => navigation.navigate("PersonalInformationScreen")}>
                        <View style={[styles.bg3, styles.bg3Layout]}>
                            <LinearGradient
                                style={[
                                    styles.rectangleLineargradient,
                                    styles.toggleChildPosition,
                                ]}
                                locations={[0, 1]}
                                colors={["#92a3fd", "#9dceff"]}

                            >
                                <Text style={styles.text5}>แก้ไข</Text>
                            </LinearGradient>

                        </View>
                    </TouchableOpacity>
                </View>
                <View style={[styles.dataCardSection, styles.sectionPosition]}>
                    <View style={styles.rectangleViewPosition}>
                        <View style={styles.rectangleViewPosition}>
                            <View
                                style={[styles.rectangleView, styles.rectangleViewPosition]}
                            />
                        </View>
                        <View style={[styles.title, styles.titlePosition]}>
                            <Text style={[styles.text6, styles.text6Position]}>บัญชี</Text>
                        </View>
                        <TouchableOpacity style={[styles.personalData1, styles.iconProfileLayout]} onPress={() => navigation.navigate("PersonalInformationScreen")}>
                            <Image
                                style={[styles.iconProfile, styles.iconProfileLayout]}
                                contentFit="cover"
                                source={require("../../assets/iconprofile.png")}
                            />
                            <View style={[styles.text7, styles.textPosition]}>
                                <Text style={[styles.text8, styles.textTypo]}>
                                    ข้อมูลส่วนบุคคล
                                </Text>
                            </View>
                            <Image
                                style={[styles.iconArrow, styles.iconLayout]}
                                contentFit="cover"
                                source={require("../../assets/iconarrow.png")}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.achievement, styles.iconProfileLayout]} onPress={() => navigation.navigate("Safety")}>
                            <Image
                                style={[styles.iconProfile, styles.iconProfileLayout]}
                                contentFit="cover"
                                source={require("../../assets/iconachievement.png")}
                            />
                            <View style={[styles.text9, styles.textPosition]}>
                                <Text style={[styles.text8, styles.textTypo]}>บัญชีและความปลอดภัย</Text>
                            </View>
                            <Image
                                style={[styles.iconArrow, styles.iconLayout]}
                                contentFit="cover"
                                source={require("../../assets/iconarrow.png")}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.activityHistory, styles.iconProfileLayout]} onPress={() => navigation.navigate("ประวัติ")}>
                            <View style={[styles.text11, styles.textPosition]}>
                                <Text style={[styles.text8, styles.textTypo]}>
                                    ประวัติการใช้งาน
                                </Text>
                            </View>
                            <Image
                                style={[styles.iconArrow, styles.iconLayout]}
                                contentFit="cover"
                                source={require("../../assets/iconarrow.png")}
                            />
                            <Image
                                style={[styles.iconProfile, styles.iconProfileLayout]}
                                contentFit="cover"
                                source={require("../../assets/iconactivity.png")}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.notificationSection, styles.bg5Layout]}>
                        <View style={[styles.bg5, styles.bg5Layout]}>
                            <View style={[styles.bgChild1, styles.bg5Layout]} />
                        </View>
                        <View style={[styles.title1, styles.titlePosition]}>
                            <Text style={[styles.text6, styles.text6Position]}>
                                การแจ้งเตือน
                            </Text>
                        </View>
                        <View style={[styles.personalData1, styles.iconProfileLayout]}>
                            <View style={[styles.text14, styles.textPosition]}>
                                <Text style={[styles.text8, styles.textTypo]}>
                                    การแจ้งเตือนแบบ Pop-up
                                </Text>
                            </View>
                            <View style={[styles.toggle, styles.textPosition]}>
                                {/* <LinearGradient
                                    style={[styles.toggleChild, styles.text4Layout]}
                                    locations={[0, 1]}
                                    colors={["#c58bf2", "#eea4ce"]}
                                /> */}
                                {/* <Image
                                    style={[styles.toggleItem, styles.namePosition]}
                                    contentFit="cover"
                                    source={require("../../assets/ellipse-170.png")}
                                /> */}
                                <TouchableOpacity style={[styles.toggleChild, styles.text4Layout]}>
                                    <ToggleSwitch
                                        isOn={isEnabled}
                                        onColor="#eea4ce"
                                        offColor="#767577"
                                        label=""
                                        size="small" // สามารถเปลี่ยนขนาดได้ที่นี่ (small, medium, large)
                                        onToggle={toggleSwitch}
                                    />
                                </TouchableOpacity>

                            </View>
                            <Image
                                style={[styles.iconProfile, styles.iconProfileLayout]}
                                contentFit="cover"
                                source={require("../../assets/iconnotif.png")}
                            />
                        </View>
                    </View>
                    <View style={[styles.otherSection, styles.bg6Layout]}>
                        <View style={[styles.bg6, styles.bg6Layout]}>
                            <View style={[styles.bgChild2, styles.bg6Layout]} />
                        </View>
                        <View style={[styles.title2, styles.titlePosition]}>
                            <Text style={[styles.text6, styles.text6Position]}>อื่นๆ</Text>
                        </View>
                        <TouchableOpacity style={[styles.personalData1, styles.iconProfileLayout]} onPress={() => navigation.navigate("ContactUsScreen")}>
                            <View style={[styles.text16, styles.textPosition]}>
                                <Text style={[styles.text8, styles.textTypo]}>ติดต่อเรา</Text>
                            </View>
                            <Image
                                style={[styles.iconArrow, styles.iconLayout]}
                                contentFit="cover"
                                source={require("../../assets/iconarrow.png")}
                            />
                            <Image
                                style={[styles.iconProfile, styles.iconProfileLayout]}
                                contentFit="cover"
                                source={require("../../assets/iconmessage.png")}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.activityHistory, styles.iconProfileLayout]} onPress={() => navigation.navigate("SetttingScreen")}>
                            <View style={[styles.text18, styles.textPosition]}>
                                <Text style={[styles.text8, styles.textTypo]}>การตั้งค่า</Text>
                            </View>
                            <Image
                                style={[styles.iconArrow, styles.iconLayout]}
                                contentFit="cover"
                                source={require("../../assets/iconarrow.png")}
                            />
                            <Image
                                style={[styles.iconProfile, styles.iconProfileLayout]}
                                contentFit="cover"
                                source={require("../../assets/iconsetting.png")}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.privacyPolicy, styles.iconProfileLayout]} onPress={() => navigation.navigate("PrivacyPolicyScreen")}>
                            <View style={[styles.text20, styles.text20Position]}>
                                <Text style={[styles.text8, styles.textTypo]}>
                                    นโยบายความเป็นส่วนตัว
                                </Text>
                            </View>
                            <Image
                                style={[styles.iconArrow5, styles.text20Position]}
                                contentFit="cover"
                                source={require("../../assets/iconarrow.png")}
                            />
                            <Image
                                style={[styles.iconProfile, styles.iconProfileLayout]}
                                contentFit="cover"
                                source={require("../../assets/iconprivacy.png")}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Modal for editing data */}
            <Modal visible={isEditing} animationType="slide">
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>แก้ไขข้อมูล</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="ส่วนสูง"
                            placeholderTextColor="gray"
                            value={editData.height}
                            onChangeText={(text) => setEditData({ ...editData, height: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="น้ำหนัก"
                            placeholderTextColor="gray"
                            value={editData.weight}
                            onChangeText={(text) => setEditData({ ...editData, weight: text })}
                        />
                        {/* Add more input fields as needed */}
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.saveButton} onPress={saveEditedData}>
                            <Text style={styles.buttonText}>บันทึก</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={closeEditPopup}>
                            <Text style={styles.buttonText}>ยกเลิก</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        width: '100%',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    saveButton: {
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginRight: 10,
    },
    cancelButton: {
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },



    sectionPosition: {
        width: 332,
        left: 30,
        position: "absolute",
        // backgroundColor:'red'
    },
    cardLayout: {
        width: 95,
        top: 0,
        height: 65,
        position: "absolute",
    },
    childShadowBox: {
        shadowOpacity: 1,
        elevation: 40,
        shadowRadius: 40,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowColor: "rgba(29, 22, 23, 0.07)",
        borderRadius: 12,
        backgroundColor: Color.whiteColor,
    },
    textPosition2: {
        top: 11,
        height: 44,
        position: "absolute",
    },
    textTypo: {
        color: Color.gray1,
        fontFamily: FontFamily.textMediumTextRegular,
        lineHeight: 18,
        fontSize: FontSize.textSmallTextMedium_size,
        textAlign: "left",
        position: "absolute",
    },
    namePosition: {
        top: 3,
        position: "absolute",
    },
    text6Position: {
        color: Color.blackColor,
        textAlign: "left",
        top: 0,
        left: 0,
        position: "absolute",
    },
    bg3Layout: {
        height: 30,
        width: 83,
        position: "absolute",
    },
    toggleChildPosition: {
        backgroundColor: Color.waterIntakeLinear,
        borderRadius: Border.br_80xl,
        top: 0,
        left: 0,
    },
    rectangleViewPosition: {
        height: 189,
        top: 0,
        left: 0,
        width: 333,
        position: "absolute",
        borderRadius: 12,
    },
    titlePosition: {
        height: 24,
        left: 20,
        top: 20,
        position: "absolute",
    },
    iconProfileLayout: {
        height: 20,
        position: "absolute",
    },
    textPosition: {
        top: 1,
        height: 18,
        position: "absolute",
    },
    iconLayout: {
        width: 18,
        left: 285,
        //ลูกศรมากกว่า
    },
    bg5Layout: {
        height: 99,
        left: 0,
        width: 333,
        position: "absolute",
        // backgroundColor:'yellow',
        borderRadius: 12,
    },
    bg6Layout: {
        height: 159,
        left: 0,
        width: 333,
        position: "absolute",
        borderRadius: 12,
    },
    text20Position: {
        top: 2,
        height: 18,
        position: "absolute",
    },
    bgChild: {
        width: 102,
        top: 0,
        height: 65,
        position: "absolute",
        left: 0,
    },
    heightCard: {
        left: 0,
    },
    cm: {
        textAlign: "left",
        fontFamily: FontFamily.textSmallTextMedium,
        fontWeight: "500",
        lineHeight: 21,
        fontSize: FontSize.textMediumTextRegular_size,
        top: 0,
        left: 0,
        position: "absolute",
    },
    text: {
        left: 3,
        top: 26,
        fontFamily: FontFamily.textMediumTextRegular,
    },
    heightText: {
        left: 29,
        width: 50,
        height: 44,
        //backgroundColor:'red',
    },
    bgItem: {
        width: 102,
        top: 0,
        height: 65,
        position: "absolute",
        left: 5,
    },
    text1: {
        left: 1,
        top: 26,
        fontFamily: FontFamily.textMediumTextRegular,
    },
    weightText: {
        left: 37,
        width: 50,
        height: 44,
        // //backgroundColor:'red',,
        justifyContent: 'center',
        alignItems: 'center',

    },
    weightCard: {
        left: 110,
    },
    bgInner: {
        width: 102,
        top: 0,
        height: 65,
        position: "absolute",
        left: 10,
    },
    text3: {
        left: 5,
        top: 26,
        fontFamily: FontFamily.textMediumTextRegular,
    },
    ageText: {
        width: 40,
        height: 44,
        left: 42,
        //backgroundColor:'red'
    },
    ageCard: {
        left: 220,
    },
    personalData: {
        top: 70,
        height: 65,
        left: 0,
        width: 315,
        position: "absolute",
    },
    maximusWalker: {
        fontFamily: FontFamily.textSmallTextMedium,
        fontWeight: "bold",
        lineHeight: 21,
        fontSize: FontSize.textMediumTextRegular_size,
        color: Color.blackColor,
    },
    loseAFat: {
        top: 26,
        fontFamily: FontFamily.textMediumTextRegular,
        left: 0,
    },
    name: {
        left: 70,
        width: 180,
        height: 44,
        // backgroundColor:'red',
    },
    latestPicIcon: {
        width: 55,
        height: 55,
        top: 0,
        left: 0,
        position: "absolute",
    },
    rectangleLineargradient: {
        height: 30,
        width: 83,
        position: "absolute",
    },
    bg3: {
        top: 0,
        left: 0,
    },
    text5: {
        color: Color.whiteColor,
        lineHeight: 18,
        fontSize: FontSize.textSmallTextMedium_size,
        textAlign: 'center',
        fontFamily: FontFamily.textSmallTextMedium,
        fontWeight: "500",
        position: "absolute",
        top: 5,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
    },

    button: {
        top: 10,
        left: 250,
    },
    profileSection: {
        top: 32,
        height: 135,
    },
    rectangleView: {
        shadowOpacity: 1,
        elevation: 40,
        shadowRadius: 40,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowColor: "rgba(29, 22, 23, 0.07)",
        borderRadius: Border.br_base,
        backgroundColor: Color.whiteColor,
    },
    text6: {
        fontSize: FontSize.textLargeTextRegular_size,
        lineHeight: 24,
        fontWeight: "600",
        fontFamily: FontFamily.textLargeTextSemiBold,
    },
    title: {
        width: 35,
    },
    iconProfile: {
        width: 20,
        top: 0,
        left: 0,
    },
    text8: {
        top: 0,
        left: 0,
    },
    text7: {
        width: 230,
        left: 30,
        // backgroundColor:'red'
    },
    iconArrow: {
        //ลูกศรมากกว่า
        top: 1,
        height: 18,
        position: "absolute",
        // backgroundColor:'red'
    },
    personalData1: {
        top: 59,
        width: 313,
        height: 20,
        left: 20,
        // backgroundColor:'green'
    },
    text9: {
        width: 230,
        left: 30,
    },
    achievement: {
        top: 89,
        width: 313,
        height: 20,
        left: 20,
        // backgroundColor:'yellow'
    },
    text11: {
        width: 230,
        left: 30,
    },
    activityHistory: {
        top: 119,
        width: 313,
        height: 20,
        left: 20,
        // backgroundColor:'blue'
        //ประวัติกับการตั้งค่า
    },
    bgChild1: {
        shadowOpacity: 1,
        elevation: 40,
        shadowRadius: 40,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowColor: "rgba(29, 22, 23, 0.07)",
        borderRadius: Border.br_base,
        backgroundColor: Color.whiteColor,
        top: 0,
    },
    bg5: {
        top: 0,
    },
    title1: {
        width: 90,
    },
    text14: {
        width: 230,
        left: 30,
    },
    toggleChild: {
        width: 28, // ปรับความกว้างของ toggle switch
        height: 16, // ปรับความสูงของ toggle switch
        borderRadius: 8, // ปรับขนาดของรอบมุม
        justifyContent: 'center',
        alignItems: 'center',
    },
    text4Layout: {
        height: 20, // ปรับความสูงของ toggle switch
        position: "absolute",
    },
    toggleItem: {
        left: 21,
        width: 12,
        height: 12,
    },
    toggle: {
        left: 270,
        width: 36,
    },
    notificationSection: {
        top: 204,
    },
    bgChild2: {
        shadowOpacity: 1,
        elevation: 40,
        shadowRadius: 40,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowColor: "rgba(29, 22, 23, 0.07)",
        borderRadius: Border.br_base,
        backgroundColor: Color.whiteColor,
        top: 0,
    },
    bg6: {
        top: 0,
    },
    title2: {
        width: 31,
    },
    text16: {
        width: 230,
        left: 30,
    },
    text18: {
        width: 230,
        left: 30,
    },
    text20: {
        width: 230,
        left: 30,
    },
    iconArrow5: {
        width: 18,
        left: 285,
        // backgroundColor:'blue'
    },
    privacyPolicy: {
        top: 88,
        width: 313,
        height: 20,
        left: 20,
        // backgroundColor:'pink'
    },
    otherSection: {
        top: 318,
    },
    dataCardSection: {
        top: 180,
        height: 477,
        // backgroundColor:'yellow'
    },
    profile: {
        // borderRadius: Border.br_21xl,
        flex: 1,
        width: "100%",
        height: 812,
        overflow: "hidden",
        backgroundColor: Color.whiteColor,
    },
});