import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Button, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { firebase } from '../config';

const NotificationScreen = () => {
    const navigation = useNavigation();
    const db = firebase.firestore();
    const auth = firebase.auth();
    

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>การแจ้งเตือน</Text>
            </View>

            <ScrollView contentContainerStyle={styles.contentContainer}>
                {/* <Text style={styles.sectionTitle}>ข้อมูลส่วนบุคคลที่เราเก็บ</Text> */}

                <TouchableOpacity style={styles.button} onPress={''}>
                    <Text style={styles.buttonText}>แจ้งเตือน</Text>
                </TouchableOpacity>

            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textContainer: {
        flexDirection: 'row',
    },
    text: {
        marginRight: 30, // กำหนดระยะห่างระหว่างข้อความ
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
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 96,
        marginTop: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 1,
        marginBottom: 10,
    },
    backButton: {
        paddingTop: 30,
    },
    button: {
        backgroundColor: '#E8E8E8',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    buttonSubText: {
        fontSize: 14,
        color: 'gray',
        marginTop: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },

    deleteButton: {
        backgroundColor: 'red',
    },
    deleteButtonText: {
        color: 'white',
    },
    verificationText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'green',
        marginTop: 10,
    },
    unverifiedText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF9100', // เปลี่ยนเป็นสีแดง
        marginTop: 10,
    },
});

export default NotificationScreen;
