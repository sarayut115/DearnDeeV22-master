import { ScrollView, Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useRef } from 'react';
import { firebase } from '../configotp';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';

const Otp = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationId, setVerificationId] = useState('');
    const [code, setCode] = useState('');
    const recaptchaVerifier = useRef(null);

    const sendVerification = async () => {
        try {
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            const verificationId = await phoneProvider.verifyPhoneNumber(
                phoneNumber,
                recaptchaVerifier.current
            );
            setVerificationId(verificationId);
            alert('Verification code has been sent to your phone.');
        } catch (error) {
            console.log(error);
            alert('Failed to send verification code. Please try again.');
        }
    };

    const confirmCode = async () => {
        try {
            const credential = firebase.auth.PhoneAuthProvider.credential(
                verificationId,
                code
            );
            await firebase.auth().signInWithCredential(credential);
            alert('Successfully signed in with OTP.');
        } catch (error) {
            console.log(error);
            alert('Failed to sign in. Please check the verification code.');
        }
    };

    return (
        <View style={styles.container}>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebase.app().options}
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
                <Text style={styles.buttonText}>Send Verification</Text>
            </TouchableOpacity>
            <TextInput
                placeholder='Enter Verification Code'
                onChangeText={setCode}
                keyboardType='number-pad'
                style={styles.textInput}
            />
            <TouchableOpacity style={styles.sendCode} onPress={confirmCode} >
                <Text style={styles.buttonText}>Confirm Verification</Text>
            </TouchableOpacity>
        </View>
    );
};

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
