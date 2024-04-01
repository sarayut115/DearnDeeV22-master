import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Border, Color, FontFamily, FontSize, Padding } from "../GlobalStyles";
import { firebase } from '../config';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";




const SetttingScreen = () => {

    const navigation = useNavigation();

    const auth = firebase.auth();

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                console.log('LogOut สำเร็จ');
                navigation.replace('LoginPage');
            })
            .catch(error => alert(error.message));
    };
    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>การตั้งค่า</Text>
            </View>

            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text
                    // onPress={() => navigation.navigate('Home')}
                    style={styles.emailText}>
                    {auth.currentUser?.email}
                </Text>
                <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
                    <LinearGradient
                        style={styles.buttonGradient}
                        locations={[0, 1]}
                        colors={["#c58bf2", "#eea4ce"]}
                    >
                        <Text style={styles.signOutText}>ออกจากระบบ</Text>
                    </LinearGradient>
                </TouchableOpacity>

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
        marginLeft: 110,
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
    signOutButton: {
        // backgroundColor: '#FF6347', // Coral color, you can change this to your preferred color
        // padding: 15,
        // borderRadius: 10,
    },
    signOutText:{
        color:'white',
        fontSize: 18,
        alignSelf:'center'
    
    },
    emailText: {
        fontSize: 19,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    buttonGradient: {
        borderRadius: 10,
        padding: 15,
    },
    
});

export default SetttingScreen;

