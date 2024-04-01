import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const TermsOfUseScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>ข้อกำหนดการใช้งาน</Text>
            </View>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text style={styles.text}>
                    โปรดทบทวนข้อกำหนดการใช้งานนี้อย่างละเอียดก่อนการใช้งานแอปพลิเคชัน DearnDeeV2 โดยการใช้งานแอปพลิเคชันนี้ถือว่าคุณยอมรับและปฏิบัติตามข้อกำหนดและเงื่อนไขทั้งหมดที่ระบุไว้ในเอกสารนี้
                </Text>

                <Text style={styles.sectionTitle}>1. การยอมรับข้อตกลง</Text>
                <Text style={styles.text}>
                    การใช้งานแอปพลิเคชัน DearnDeeV2 จะถือว่าคุณยอมรับข้อกำหนดการใช้งานทุกข้อและข้อตกลงในเอกสารนี้ หากคุณไม่ยอมรับข้อตกลงใดๆ คุณควรหยุดการใช้งานแอปพลิเคชันทันที
                </Text>

                <Text style={styles.sectionTitle}>2. การเปลี่ยนแปลงและการปรับปรุง</Text>
                <Text style={styles.text}>
                    เราอาจทำการเปลี่ยนแปลงหรือปรับปรุงข้อกำหนดการใช้งานนี้เมื่อมีการเปลี่ยนแปลงในบริการหรือกฎหมาย และการเปลี่ยนแปลงเหล่านั้นจะมีผลบังคับใช้ทันทีเมื่อมีการโพสต์ในแอปพลิเคชัน DearnDeeV2 ดังนั้นโปรดทบทวนข้อกำหนดการใช้งานเป็นประจำ
                </Text>

                <Text style={styles.sectionTitle}>3. ความเป็นส่วนตัว</Text>
                <Text style={styles.text}>
                    เราใช้ข้อมูลส่วนบุคคลของคุณเพื่อวัตถุประสงค์ของการให้บริการและการปรับปรุง โปรดอ่านนโยบายความเป็นส่วนตัวของเราเพื่อทราบเพิ่มเติมเกี่ยวกับวิธีการเก็บ ใช้ และเปิดเผยข้อมูลส่วนบุคคล
                </Text>

                <Text style={styles.sectionTitle}>4. ข้อจำกัดความรับผิด</Text>
                <Text style={styles.text}>
                    เราไม่รับผิดชอบต่อความเสียหายใดๆ ที่เกิดขึ้นจากการใช้งานแอปพลิเคชัน DearnDeeV2 อย่างไรก็ตามข้อจำกัดนี้อาจไม่ใช้กับความเสียหายหรือความรับผิดที่ไม่อนุญาตหรือไม่สามารถยกเว้นได้ตามกฎหมาย
                </Text>

                <Text style={styles.sectionTitle}>5. การติดต่อ</Text>
                <Text style={styles.text}>
                    หากคุณมีคำถามหรือข้อสงสัยเกี่ยวกับข้อกำหนดการใช้งานนี้ โปรดติดต่อเราที่ [<Text style={styles.textemail} onPress={() => Linking.openURL('mailto:sarayuth.k@ku.th')}>sarayuth.k@ku.th</Text>]
                </Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    contentContainer: {
        paddingHorizontal: 30,
        paddingVertical: 20,
    },
    goBackButton: {
        paddingTop: 30,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 65,
        marginTop: 30,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        marginBottom: 15,
    },
    textemail: {
        fontSize: 16,
        marginBottom: 15,
        textDecorationLine: 'underline',
        fontWeight:'600'
    },

});

export default TermsOfUseScreen;
