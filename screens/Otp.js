import { ScrollView, Text, StyleSheet, View, Image, TouchableOpacity, Modal, TextInput, Button, Alert } from 'react-native';
import React, { useRef, useState } from 'react';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../config';
import firebase from 'firebase/compat/app';
import { style } from 'd3';

const Otp = () => {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [verificatinId, setVerificatinId] = useState(null);
    const recaptchaVerifier = useRef(null);

    const sendVerification = () => {
        const phoneProvider = new firebase.auth.PhoneAuthCredential();
        phoneProvider
            .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
            .then(setVerificatinId);
        setPhoneNumber('');
    }

    const confirmCode = () => {
        const credential = firebase.auth.PhoneAuthProvider.credential(
            verificatinId,
            code
        );
        firebase.auth().signInWithCredential(credential)
            .then(() => {
                setCode('');
                Alert.alert('Login Successful', 'Welcome to Dashboard');
            })
            .catch((error) => {
                //show an alert in case of error
                Alert.alert('Error', 'Something went wrong. Please try again later.');
            })
    }

    return (
        <View style={styles.container}>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
            />
            <Text style={styles.otpText}>OTP</Text>
            <TextInput
                placeholder='Phone Number With Country Code'
                onChangeText={setPhoneNumber}
                keyboardType='phone-pad'
                autoCompleteType='tel'
                style={styles.textInput}
            />
            <TouchableOpacity style={styles.sendVerification} onPress={sendVerification} >
                <Text style={styles.buttonText}>
                    Send Verification
                </Text>
            </TouchableOpacity>
            <TextInput
                placeholder='Confirm Code'
                onChangeText={setCode}
                keyboardType='number-pad'
                style={styles.textInput}
            />
            <TouchableOpacity style={styles.sendCode} onPress={confirmCode} >
                <Text style={styles.buttonText}>
                    Confirm Verification
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Otp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    otpText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%',
    },
    sendVerification: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
    },
    sendCode: {
        backgroundColor: '#28a745',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});