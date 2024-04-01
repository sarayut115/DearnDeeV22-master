import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Border, Color, FontFamily, FontSize, Padding } from "../GlobalStyles";
import { firebase } from '../config';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const PrivacyPolicyScreen = () => {
    const navigation = useNavigation();

    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>นโยบายความเป็นส่วนตัว</Text>
            </View>

            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text style={styles.sectionTitle}>ข้อมูลส่วนบุคคลที่เราเก็บ</Text>
                <Text>- ชื่อและนามสกุล</Text>
                <Text>- ที่อยู่อีเมล</Text>
                <Text>- วันเดือนปีเกิด</Text>
                <Text>- เพศ</Text>
                <Text>- น้ำหนัก</Text>
                <Text>- ส่วนสูง</Text>
                <Text>- ข้อมูลการใช้งานและประวัติการใช้บริการ</Text>

                <Text style={styles.sectionTitle}>วัตถุประสงค์ในการใช้ข้อมูล</Text>
                <Text>- ให้บริการและปรับปรุงประสบการณ์การใช้งานในแอปพลิเคชัน DearnDeeV2</Text>
                <Text>- ส่งการแจ้งเตือนและข้อมูลที่เกี่ยวข้องกับบริการ</Text>
                <Text>- ปรับปรุงและพัฒนาคุณภาพของบริการ</Text>
                <Text>- ปรับปรุงการโฆษณาและการตลาด</Text>
                <Text>- ป้องกันการประพฤติการณ์ที่ไม่เหมาะสมหรือผิดกฎหมาย</Text>

                <Text style={styles.sectionTitle}>การเก็บและการจัดเก็บข้อมูล</Text>
                <Text>เราจะเก็บและจัดเก็บข้อมูลส่วนบุคคลของคุณอย่างปลอดภัย และจะไม่เผยแพร่ข้อมูลของคุณแก่บุคคลที่สามใดๆ ที่ไม่เกี่ยวข้องโดยไม่ได้รับอนุญาตจากคุณ ข้อมูลส่วนบุคคลของคุณจะถูกเก็บรักษาเฉพาะเพื่อวัตถุประสงค์ที่ได้ระบุไว้ในนโยบายนี้และจะถูกทำลายหรือลบออกจากระบบเมื่อไม่จำเป็น</Text>

                <Text style={styles.sectionTitle}>สิทธิของผู้ใช้</Text>
                <Text>คุณมีสิทธิที่จะเข้าถึง แก้ไข และลบข้อมูลส่วนบุคคลของคุณ โดยคุณสามารถทำเช่นนี้ได้ผ่านบัญชีผู้ใช้ของคุณในแอปพลิเคชัน DearnDeeV2 หากมีคำถามหรือข้อสงสัยเกี่ยวกับนโยบายความเป็นส่วนตัว โปรดติดต่อเราที่ [ratchanon.h@ku.th]</Text>

                <Text style={styles.sectionTitle}>การเปลี่ยนแปลงและการอัปเดตนโยบาย</Text>
                <Text>นโยบายความเป็นส่วนตัวนี้อาจมีการเปลี่ยนแปลงตามเวลา โปรดตรวจสอบนโยบายความเป็นส่วนตัวเป็นประจำเพื่อดูข้อมูลที่อัปเดตและการเปลี่ยนแปลง</Text>

                <Text style={styles.sectionTitle}>ติดต่อ</Text>
                <Text>หากคุณมีคำถามหรือข้อสงสัยเกี่ยวกับนโยบายความเป็นส่วนตัว โปรดติดต่อเราที่: [DearnDeeV2] ที่ [<Text style={styles.sectionTitleEmail} onPress={() => Linking.openURL('mailto:sarayuth.k@ku.th')}>sarayuth.k@ku.th</Text>]</Text>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingHorizontal: 20,
        // paddingVertical: 20,
    },
    contentContainer: {
        paddingHorizontal: 30,
        paddingVertical: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        // backgroundColor:'gray',
        // borderRadius:10
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 50,
        marginTop: 30,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 10,
    },
    sectionTitleEmail: {
        fontSize: 18,
        // fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 10,
        // color:'blue'
        textDecorationLine: 'underline'
    },
    backButton: {
        paddingTop: 30,
        // paddingRight: 20, // หรือค่าใดค่าหนึ่งที่ต้องการ
    },
});

export default PrivacyPolicyScreen;
