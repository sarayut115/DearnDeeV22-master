import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const ContactUsScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>ติดต่อเรา</Text>
            </View>

            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text style={styles.sectionTitle}>ข้อมูลติดต่อ</Text>
                <Text style={styles.text}>
                    หากคุณมีคำถามหรือข้อสงสัยเกี่ยวกับแอปพลิเคชัน DearnDeeV2 หรือต้องการให้เราช่วยเหลือ โปรดติดต่อเราที่อีเมล: <Text style={styles.textemail} onPress={() => Linking.openURL('mailto:sarayuth.k@ku.th')}>sarayuth.k@ku.th</Text>
                </Text>

                <Text style={styles.sectionTitle}>สำหรับคำถามและข้อเสนอแนะ</Text>
                <Text style={styles.text}>
                    เรายินดีรับฟังคำถามและข้อเสนอแนะจากผู้ใช้ทุกท่านเพื่อปรับปรุงและพัฒนาคุณภาพของแอปพลิเคชัน กรุณาส่งอีเมลของคุณไปยัง: <Text style={styles.textemail} onPress={() => Linking.openURL('mailto:ratchanon.h@ku.th')}>
                        ratchanon.h@ku.th
                    </Text>

                </Text>

                <Text style={styles.sectionTitle}>ชื่อและที่อยู่</Text>
                <Text style={styles.text}>
                    DearnDeeV2{'\n'}
                    123 ถนนสุขุมวิท แขวงคลองตัน เขตคลองเตย กรุงเทพมหานคร 10110{'\n'}
                    ประเทศไทย{'\n'}
                    ติดต่อเรา: <Text style={styles.textemail} onPress={() => Linking.openURL('mailto:phongphol.p@ku.th')}>phongphol.p@ku.th</Text>
                </Text>
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
        marginLeft: 112,
        marginTop: 30,

    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 10,
    },
    backButton: {
        paddingTop: 30,
        // paddingRight: 20, // หรือค่าใดค่าหนึ่งที่ต้องการ
    },
    text: {
        fontSize: 16,
        marginBottom: 15,
    },
    textemail: {
        fontSize: 16,
        marginBottom: 15,
        // fontWeight:'bold',
        textDecorationLine: 'underline'
    },
});

export default ContactUsScreen;
