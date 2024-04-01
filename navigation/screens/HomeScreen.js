import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, Text, StyleSheet, View, Image, TouchableOpacity, Modal, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { firebase } from '../../config';
import { LinearGradient } from "expo-linear-gradient";
import { FontFamily, FontSize, Color, Border } from "../../GlobalStyles";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from '@react-navigation/native';

// const devices = [
//   { id: 1, name: 'เครื่องกระตุ้นกระแสไฟฟ้า', image: require('../../assets/fes-leg.png'), online: true },
//   { id: 2, name: 'Device 2', image: require('../../assets/favicon.png'), online: false },
//   { id: 3, name: 'Device 3', image: require('../../assets/favicon.png'), online: true },
// ];

const HomeScreen = () => {
  const navigation = useNavigation();
  const db = firebase.firestore();
  const auth = firebase.auth();
  const realtimeDB = firebase.database();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [devices, setDevices] = useState([]);

  const [deviceName, setDeviceName] = useState('เครื่องกระตุ้นกระแสไฟฟ้า'); // เปลี่ยนค่าเริ่มต้นเป็นค่าว่าง

  const [wifiName, setWifiName] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [deviceStatus, setDeviceStatus] = useState(false);
  // const [imageURI, setImageURI] = useState('../../assets/fes-leg.png');


  const imageURL = 'https://media.discordapp.net/attachments/1193825332638265427/1221773168277192835/fes-leg.png?ex=6613cbee&is=660156ee&hm=340de8380043707bbeca5026cb0f36b940d0bb3b15559b64145daab544b767ec&=&format=webp&quality=lossless&width=320&height=350';


  // useEffect(() => {
  //   const unsubscribe = db.collection('users')
  //     .doc(auth.currentUser.uid)
  //     .onSnapshot(snapshot => {
  //       const userData = snapshot.data();
  //       // console.log(userData, 'asdasdas')
  //       if (userData && userData.devices) {
  //         setDevices(userData.devices);
  //         console.log(devices)
  //       }
  //     });

  //   return () => {
  //     unsubscribe(); // Cleanup function to unsubscribe from the snapshot listener
  //   };
  // }, []);
  useEffect(() => {
    const unsubscribeAuth = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, call your useEffect logic here
        const unsubscribe = db.collection('users')
          .doc(user.uid)
          .onSnapshot(snapshot => {
            const userData = snapshot.data();
            if (userData && userData.devices) {
              setDevices(userData.devices);
              console.log(devices);
            }
          });

        return () => {
          unsubscribe(); // Cleanup function to unsubscribe from the snapshot listener
        };
      } else {
        // User is signed out, clear the devices state
        setDevices([]);
      }
    });

    return () => {
      unsubscribeAuth(); // Cleanup function to unsubscribe from the Auth listener
    };
  }, []);

  useEffect(() => {
    const checkDeviceStatus = () => {
      try {
        const deviceStatusRef = realtimeDB.ref('/test/isOn');
        deviceStatusRef.on('value', (snapshot) => {
          const value = snapshot.val();
          if (value === 1) {
            setDeviceStatus(true);
          } else if (value === 0) {
            setDeviceStatus(false);
          }
        });
      } catch (error) {
        console.error('Error fetching device status:', error);
      }
    };

    checkDeviceStatus();

    // อย่าลืมใช้ return function เพื่อยกเลิกการสมัครฟังเหตุการณ์เมื่อ Component ถูก unmount
    return () => {
      realtimeDB.ref('/test/isOn').off(); // ยกเลิกการสมัครฟังเหตุการณ์เมื่อ Component ถูก unmount
    };
  }, []);



  const handleAddDevice = () => {
    setIsModalVisible(true);
  };

  // const handleSaveDevice = async () => {
  //   try {
  //     const newDevice = {
  //       id: devices.length + 1,
  //       name: deviceName,
  //       statusDevice: deviceStatus,
  //       image: imageURL, // Set default image URL
  //       wifiName: wifiName,
  //       wifiPassword: wifiPassword
  //       // Add other properties as needed

  //     };

  //     const newDeviceHis = {
  //       id: devices.length + 1,
  //       name: deviceName,
  //       statusDevice: true,
  //       image: imageURL, // Set default image URL
  //       wifiName: wifiName,
  //       wifiPassword: wifiPassword
  //       // Add other properties as needed

  //     };

  //     console.log(deviceName, 'asdasdasdasdasdasdasdasdasasdasdasdasd');
  //     await db.collection('users')
  //       .doc(auth.currentUser.uid)
  //       .update({
  //         devices: firebase.firestore.FieldValue.arrayUnion(newDevice),
  //         devicesAll: firebase.firestore.FieldValue.arrayUnion(newDeviceHis) // Update devicesAll field
  //       });

  //     console.log("เพิ่มอุปกรณ์เรียบร้อย!");
  //     Alert.alert('สำเร็จ', 'เพิ่มอุปกรณ์เรียบร้อยแล้ว!');

  //     setDevices([...devices, newDevice]);
  //     setDeviceName('เครื่องกระตุ้นกระแสไฟฟ้า');
  //     setWifiName('');
  //     setWifiPassword('');
  //     setIsModalVisible(false);
  //   } catch (error) {
  //     console.error('Error adding device:', error);
  //   }
  // };

  const handleSaveDevice = async () => {
    try {
      let newId = 1; // กำหนดค่าเริ่มต้นของ id ใหม่

      // ตรวจสอบว่ามี devicesAll ในฐานข้อมูลหรือไม่
      const devicesAllRef = await db.collection('users').doc(auth.currentUser.uid).get();
      const devicesAllData = devicesAllRef.data();

      if (devicesAllData && devicesAllData.devicesAll) {
        // หา id ที่มีค่ามากที่สุดใน devicesAll
        const maxId = Math.max(...devicesAllData.devicesAll.map(device => device.id));
        newId = maxId + 1; // กำหนด id ใหม่ให้เท่ากับ id ที่มีค่ามากที่สุด + 1
      }

      const newDevice = {
        id: newId,
        name: deviceName,
        statusDevice: deviceStatus,
        image: imageURL, // Set default image URL
        wifiName: wifiName,
        wifiPassword: wifiPassword
        // Add other properties as needed
      };

      const newDeviceHis = {
        id: newId,
        name: deviceName,
        statusDevice: true,
        image: imageURL, // Set default image URL
        wifiName: wifiName,
        wifiPassword: wifiPassword
        // Add other properties as needed
      };

      console.log(deviceName, 'asdasdasdasdasdasdasdasdasasdasdasdasd');
      await db.collection('users')
        .doc(auth.currentUser.uid)
        .update({
          devices: firebase.firestore.FieldValue.arrayUnion(newDevice),
          devicesAll: firebase.firestore.FieldValue.arrayUnion(newDeviceHis) // Update devicesAll field
        });

      console.log("เพิ่มอุปกรณ์เรียบร้อย!");
      Alert.alert('สำเร็จ', 'เพิ่มอุปกรณ์เรียบร้อยแล้ว!');

      setDevices([...devices, newDevice]);
      setDeviceName('เครื่องกระตุ้นกระแสไฟฟ้า');
      setWifiName('');
      setWifiPassword('');
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error adding device:', error);
    }
  };



  const showRemoveDeviceAlert = (device) => {
    Alert.alert(
      "ยืนยันการลบ",
      `คุณต้องการที่จะนำ ${device.name} ออกจากอุปกรณ์หรือไม่?`,
      [
        {
          text: "ยกเลิก",
          onPress: () => console.log("ยกเลิกการลบอุปกรณ์"),
          style: "cancel"
        },
        { text: "ยืนยัน", onPress: () => removeDevice(device) }
      ]
    );
  };

  // const removeDevice = async (device) => {
  //   try {
  //     // แก้ไข collection และ document ตามโครงสร้างของข้อมูลของคุณ
  //     await db.collection('users')
  //       .doc(auth.currentUser.uid)
  //       .update({
  //         devices: firebase.firestore.FieldValue.arrayRemove(device)
  //       });
  //     console.log("Device removed successfully!");

  //     // อัปเดต state โดยการกรองออกจาก devices ทั้งหมดที่ไม่ใช่อุปกรณ์ที่ถูกลบ
  //     setDevices(devices.filter(item => item.id !== device.id));

  //   } catch (error) {
  //     console.error('Error removing device:', error);
  //   }
  // };

  const removeDevice = async (device) => {
    try {
      // ลบอุปกรณ์ออกจาก collection ของ users
      await db.collection('users')
        .doc(auth.currentUser.uid)
        .update({
          devices: firebase.firestore.FieldValue.arrayRemove(device),
        });

      // อัปเดต state โดยการกรองออกจาก devices ทั้งหมดที่ไม่ใช่อุปกรณ์ที่ถูกลบ
      setDevices(devices.filter(item => item.id !== device.id));

      // หาอุปกรณ์ใน devicesAll และอัปเดต statusDevice เป็น true ถ้าพบ
      const userDocRef = db.collection('users').doc(auth.currentUser.uid);
      const userDoc = await userDocRef.get();
      const userData = userDoc.data();
      if (userData && userData.devicesAll) {
        const updatedDevicesAll = userData.devicesAll.map((d) => {
          if (d.id === device.id) {
            return { ...d, statusDevice: false };
          }
          return d;
        });
        await userDocRef.update({ devicesAll: updatedDevicesAll });
        console.log("StatusDevice updated successfully!");
      }

      console.log("Device removed successfully!");
    } catch (error) {
      console.error('Error removing device:', error);
    }
  };


  const handleCancel = () => {
    // รีเซ็ตค่าใน input เมื่อยกเลิก
    setDeviceName('เครื่องกระตุ้นกระแสไฟฟ้า');
    setWifiName('');
    setWifiPassword('');

    setIsModalVisible(false);
  };


  const handleEditDevice = (device) => {
    Alert.prompt(
      "แก้ไขชื่ออุปกรณ์",
      "กรุณาป้อนชื่อใหม่:",
      (newDeviceName) => {
        if (newDeviceName !== null && newDeviceName.trim() !== "") {
          updateDeviceName(device, newDeviceName);
        }
      },
      "plain-text",
      device.name
    );
  };


  const updateDeviceName = async (device, newName) => {
    try {
      const updatedDevices = devices.map(d => {
        if (d.id === device.id) {
          return { ...d, name: newName };
        }
        return d;
      });

      await db.collection('users')
        .doc(auth.currentUser.uid)
        .update({
          devices: updatedDevices
        });

      setDevices(updatedDevices);

      // อัปเดตชื่ออุปกรณ์ใน devicesAll
      const userDocRef = db.collection('users').doc(auth.currentUser.uid);
      const userDoc = await userDocRef.get();
      const userData = userDoc.data();
      if (userData && userData.devicesAll) {
        const updatedDevicesAll = userData.devicesAll.map(d => {
          if (d.id === device.id) {
            return { ...d, name: newName };
          }
          return d;
        });
        await userDocRef.update({ devicesAll: updatedDevicesAll });
        console.log("อัปเดตชื่ออุปกรณ์ใน devicesAll เรียบร้อยแล้ว!");
      }

      console.log("อัปเดตชื่ออุปกรณ์เรียบร้อยแล้ว!");
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการอัปเดตชื่ออุปกรณ์:', error);
    }
  };


  const handleDeviceActions = (device) => {
    Alert.alert(
      "เลือกรายการ",
      device.name,
      [
        {
          text: "แก้ไขชื่ออุปกรณ์",
          onPress: () => handleEditDevice(device),
        },
        {
          text: "ลบอุปกรณ์",
          onPress: () => showRemoveDeviceAlert(device),
          style: "destructive",
        },
        {
          text: "ยกเลิก",
          style: "cancel",
        },
      ]
    );
  };


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {devices.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>ไม่มีอุปกรณ์ โปรดเพิ่มอุปกรณ์</Text>
            <Image source={require('../../assets/empty-icon.png')} style={styles.emptyImage} />
            {/* <TouchableOpacity style={styles.addButton} onPress={handleAddDevice}>
            <Text style={styles.addButtonText}>เพิ่มอุปกรณ์</Text>
          </TouchableOpacity> */}
            <TouchableOpacity style={styles.buttonLargeRegister} onPress={handleAddDevice}>
              <LinearGradient
                style={[styles.buttonLargeRegisterChild, styles.labelChildPosition]}
                locations={[1, 0]}
                colors={["#92A3FD", "#9DCEFF"]}
              />
              <Text style={[styles.register, styles.text3FlexBox]}>
                เพิ่มอุปกรณ์
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>

            <Text style={styles.title}>อุปกรณ์ทั้งหมด</Text>

            {devices.map(device => (
              <TouchableOpacity key={device.id} style={styles.deviceContainer}
                onPress={() => navigation.navigate("ControlScreen", { deviceId: device.id, deviceName: device.name })}
                onLongPress={() => showRemoveDeviceAlert(device)}
              >
                <View style={styles.deviceNameStatus}>
                  <Image source={{ uri: imageURL }} style={styles.deviceImage} />
                  <View>
                    <Text style={[styles.deviceText]}>
                      {device.id}: {device.name} {/* เพิ่ม id ของอุปกรณ์ด้วย */}
                    </Text>
                    <Text style={[styles.statusText, deviceStatus ? styles.onlineText : styles.offlineText]}>
                      {deviceStatus ? 'ออนไลน์' : 'ออฟไลน์'}
                    </Text>
                  </View>
                </View>
                {/* <View style={styles.deviceButton1}>
                  <TouchableOpacity onPress={() => handleEditDevice(device)}>
                    <Ionicons name="create" size={35} color="blue" style={{ marginBottom: 10 }} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => showRemoveDeviceAlert(device)}>
                    <Ionicons name="trash-bin" size={30} color="red" />
                  </TouchableOpacity>
                </View> */}

                {/* <View style={styles.deviceButton}>
                  <Image source={require('../../assets/workoutbtn222.png')} style={styles.workoutbtn} />
                </View> */}

                <View style={styles.deviceButton}>
                  <TouchableOpacity onPress={() => handleDeviceActions(device)}>
                    <Image source={require('../../assets/workoutbtn222.png')} style={styles.workoutbtn} />
                  </TouchableOpacity>
                </View>


              </TouchableOpacity>

            ))}

            <TouchableOpacity style={styles.buttonLargeRegister} onPress={handleAddDevice}>
              <LinearGradient
                style={[styles.buttonLargeRegisterChild, styles.labelChildPosition]}
                locations={[1, 0]}
                colors={["#92A3FD", "#9DCEFF"]}
              />
              <Text style={[styles.register, styles.text3FlexBox]}>
                เพิ่มอุปกรณ์
              </Text>
            </TouchableOpacity>
          </>

        )}

        {/* Modal for adding device */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>เพิ่มอุปกรณ์</Text>
              <Text style={styles.modalTitle1}>ชื่ออุปกรณ์</Text>
              <TextInput
                style={styles.input}
                placeholder="ชื่ออุปกรณ์"
                placeholderTextColor="gray"
                onChangeText={text => setDeviceName(text)}
                value={deviceName}
              />

              {/* <TextInput
                style={styles.input}
                placeholder="ชื่อ WiFi"
                placeholderTextColor="gray"
                onChangeText={text => setWifiName(text)}
                value={wifiName}
              />

              <TextInput
                style={styles.input}
                placeholder="รหัสผ่าน WiFi"
                placeholderTextColor="gray"
                onChangeText={text => setWifiPassword(text)}
                value={wifiPassword}
                secureTextEntry={false} // แสดงเป็นตัวอักษรที่ถูกซ่อน
              /> */}

              {/* <Text style={styles.buttonText1}>หมายเหตุ: อุปกรณ์จะเชื่อมต่อกับ WiFi ที่ผู้ใช้กรอกอัตโนมัติ</Text> */}
              <Text style={styles.buttonText1}>หมายเหตุ: ตั้งชื่ออุปกรณ์ตามต้องการ ไม่มีผลต่อการทำงาน</Text>
              <View style={styles.buttonContainer}>
                {/* <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSaveDevice}>
                <Text style={styles.buttonText}>บันทึก</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setIsModalVisible(false)}>
                <Text style={styles.buttonText}>ยกเลิก</Text>
              </TouchableOpacity> */}
                <TouchableOpacity style={[styles.cancelButton]} onPress={handleCancel}>
                  <LinearGradient
                    style={[styles.buttonLargeRegisterChild, styles.labelChildPosition]}
                    locations={[0, 1]}
                    colors={["#C58BF2", "#EEA4CE"]}
                  />
                  <Text style={styles.buttonText}>ยกเลิก</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.saveButton]} onPress={() => handleSaveDevice()}>
                  <LinearGradient
                    style={[styles.buttonLargeRegisterChild, styles.labelChildPosition]}
                    locations={[0, 1]}
                    colors={["#92A3FD", "#9DCEFF"]}
                  />
                  <Text style={styles.buttonText}>บันทึก</Text>
                </TouchableOpacity>

              </View>
            </View>
          </View>
        </Modal>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  buttonLargeRegister: {
    top: 20,
    shadowColor: "rgba(149, 173, 254, 0.3)",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 22,
    elevation: 22,
    shadowOpacity: 1,
    height: 60,
    width: 150,
    alignSelf: 'center',
  },
  buttonLargeRegisterChild: {
    borderRadius: Border.br_80xl,
    backgroundColor: Color.blueLinear,
  },
  labelChildPosition: {
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    height: "100%",
    position: "absolute",
    width: "100%",
  },
  register: {
    top: "30%",
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    color: Color.whiteColor,
    fontFamily: FontFamily.titleH4Bold,
    fontWeight: "700",
    lineHeight: 24,
    fontSize: FontSize.textLargeTextRegular_size,
    textAlign: "center",
  },
  text3FlexBox: {
    textAlign: "center",
    position: "absolute",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 15,
    marginLeft: 15,
  },
  title2: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 30,
    marginLeft: 30,
    color: 'gray',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deviceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 7,
    backgroundColor: '#ffff',
    borderRadius: 10,
    width: '90%',
    height: 90, // ปรับความสูงของอุปกรณ์ตามต้องการ
    marginLeft: 20,
  },
  deviceNameStatus: {
    // backgroundColor: 'red',
    width: 295,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  deviceButton: {
    // backgroundColor: 'red',
    marginLeft: -10,
    marginTop: 10
  },
  deviceButton1: {
    // backgroundColor: 'red',
    marginLeft: 5,
    marginTop: 1,
    flexDirection: 'column', // เปลี่ยนเป็น 'column' เพื่อให้ไอคอนอยู่ในแนวตั้ง
  },
  deviceImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    marginLeft: 20,
  },
  deviceText: {
    fontSize: 16,
    // backgroundColor:'green'
  },
  statusText: {
    fontSize: 16,
    top: 5, // เพิ่มระยะห่างระหว่างชื่ออุปกรณ์กับสถานะ
  },

  onlineText: {
    color: 'green',

  },
  offlineText: {
    color: 'red',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 150,
  },
  emptyText: {
    fontSize: 20,
    marginBottom: 10,
  },
  emptyImage: {
    width: 100,
    height: 100,
  },
  workoutbtn: {
    width: 50,
    height: 50,
  },
  addButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
    // height: "45%",
    height: "30%",
    width: "87%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalTitle1: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
    marginLeft: 10,
    alignSelf: 'flex-start'
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: 'gray',
    // borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#F7F8F8', // เพิ่มสีพื้นหลังที่นี่
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    width: '45%',
    paddingVertical: 10,
    borderRadius: 5,
  },
  // saveButton: {
  //   backgroundColor: 'blue',
  // },
  // cancelButton: {
  //   backgroundColor: 'red',
  // },
  saveButton: {
    // กำหนดขนาดและที่ตั้งสไตล์เหมือนกับปุ่มเพิ่มอุปกรณ์
    width: '45%',
    height: 70,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: 'transparent', // เพื่อให้ LinearGradient ทับสีพื้นหลัง
  },
  cancelButton: {
    // กำหนดขนาดและที่ตั้งสไตล์เหมือนกับปุ่มเพิ่มอุปกรณ์
    width: '45%',
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: 'transparent', // เพื่อให้ LinearGradient ทับสีพื้นหลัง
  },

  buttonText: {
    marginTop: 4,
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText1: {
    color: 'red',
    fontSize: 12,
  },

});

export default HomeScreen;
