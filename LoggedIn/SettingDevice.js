import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Button, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { firebase } from '../config';

const SettingDevice = ({ route }) => {
    const { deviceId, deviceName } = route.params;
    const navigation = useNavigation();
    const db = firebase.firestore();
    const auth = firebase.auth();
    const [email, setEmail] = useState("");
    const [deviceCurrent, setDeviceCurrent] = useState('');

    
    useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
            // Query Firestore collection 'users' for the current user's document
            db.collection('users')
                .doc(auth.currentUser.uid)
                .get()
                .then(doc => {
                    if (doc.exists) {
                        const userData = doc.data();
                        if (userData && userData.devices) {
                            // Find the device with the matching deviceId
                            const device = userData.devices.find(device => device.id === deviceId);
                            if (device) {
                                // Do something with the device data
                                console.log('Device found:', device);
                                setDeviceCurrent(device); // Set device data to state
                            } else {
                                console.log('Device not found');
                            }
                        } else {
                            console.log('No devices found in user data');
                        }
                    } else {
                        console.log('User document does not exist');
                    }
                })
                .catch(error => {
                    console.error('Error getting user document:', error);
                });
        }
    });
    return unsubscribe;
}, []);

    


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>การตั้งค่าอุปกรณ์</Text>
            </View>

            <ScrollView contentContainerStyle={styles.contentContainer}>
                {/* <Text style={styles.sectionTitle}>ข้อมูลส่วนบุคคลที่เราเก็บ</Text> */}

                <TouchableOpacity style={styles.button} onPress={''}>
                    <Text style={styles.buttonText}>เปลี่ยนชื่ออุปกรณ์</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={''}>
                    <Text style={[styles.buttonText, styles.deleteButtonText]}>ลบอุปกรณ์</Text>
                </TouchableOpacity>
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        marginLeft: 80,
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
});

export default SettingDevice;
