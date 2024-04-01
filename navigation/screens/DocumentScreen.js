import React, { useState, useEffect } from 'react';
import { ScrollView, Text, StyleSheet, View, Image, TouchableOpacity, Modal, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { firebase } from '../../config';
import { LinearGradient } from "expo-linear-gradient";
import { FontFamily, FontSize, Color, Border } from "../../GlobalStyles";


export default function DocumentScreen() {
  const navigation = useNavigation();
  const auth = firebase.auth();
  const db = firebase.firestore();
  const [devicesAll, setDevicesAll] = useState([]);
  const [deviceStatusText, setDeviceStatusText] = useState(''); // เพิ่ม state เพื่อเก็บข้อความของสถานะอุปกรณ์


  const imageURL = require('../../assets/dataEmpty.png'); // Import the empty icon image

  const [filter, setFilter] = useState('all'); // กำหนดค่าเริ่มต้นเป็น all

  const [showModal, setShowModal] = useState(false);

  const handleFilterPress = () => {
    setShowModal(true);
  };

  const handleFilterChange = (value) => {
    setFilter(value);
    setShowModal(false);
  };

  useEffect(() => {
    const fetchDevicesAll = async () => {
      try {
        const userDoc = await db.collection('users').doc(auth.currentUser.uid).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          if (userData && userData.devicesAll) {
            setDevicesAll(userData.devicesAll);
          }
        }
      } catch (error) {
        console.error('Error fetching devicesAll:', error);
      }
    };

    fetchDevicesAll();

    const unsubscribe = db.collection('users').doc(auth.currentUser.uid)
      .onSnapshot((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          if (userData && userData.devicesAll) {
            setDevicesAll(userData.devicesAll);
            // Set device status for each device
            const devicesWithStatus = userData.devicesAll.map(device => ({
              ...device,
              statusDevice: device.statusDevice || false, // Set default value to false if statusDevice is not present
              statusDeviceText: device.statusDevice ? 'กำลังใช้งาน' : 'ถูกลบแล้ว' // Set status text based on statusDevice
            }));
            setDevicesAll(devicesWithStatus);

          }
        }
      });

    // Cleanup function
    return () => {
      unsubscribe();
      // Cleanup code if needed
    };
  }, []);



  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Render devicesAll or empty message and image */}
        {devicesAll.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>ไม่มีประวัติการใช้งาน</Text>
            <Image source={imageURL} style={styles.emptyImage} />
          </View>
        ) : (
          <>
            <View style={styles.detailnav}>
              <Text style={styles.title}>ตัวกรองอุปกรณ์ของฉัน</Text>
              <TouchableOpacity style={styles.detailnavImage} onPress={handleFilterPress}>
                <Image
                  style={{ width: 35, height: 20 }} // ปรับขนาดภาพตามต้องการ
                  contentFit="cover"
                  source={require("../../assets/vector2.png")}
                />

              </TouchableOpacity>
            </View>
            {devicesAll.map(device => (
              // ตรวจสอบว่าอุปกรณ์ตรงกับการกรองหรือไม่
              (filter === 'all' || (filter === 'active' && device.statusDevice) || (filter === 'deleted' && !device.statusDevice)) && (
                <TouchableOpacity key={device.id} style={styles.deviceContainer} onPress={() => navigation.navigate("History", { deviceId: device.id, deviceName: device.name })}>
                  <View style={styles.deviceNameStatus}>
                    <Image source={{ uri: device.image || imageURL }} style={styles.deviceImage} />
                    <View>
                      <Text style={[styles.deviceText]}>
                        {device.id}: {device.name} {/* เพิ่ม id ของอุปกรณ์ด้วย */}
                      </Text>
                      <Text style={[styles.statusText, device.statusDevice ? styles.onlineText : styles.offlineText]}>
                        {device.statusDeviceText}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.deviceButton}>
                    {device.statusDevice ? (
                      <Image source={require('../../assets/materialsymbolscheckcircle.png')} style={styles.workoutbtn} />
                    ) : (
                      <Image source={require('../../assets/materialsymbolscancel.png')} style={styles.workoutbtn} />
                    )}
                  </View>
                </TouchableOpacity>
              )
            ))}

          </>
        )}
      </ScrollView>

      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>เลือกกรองอุปกรณ์</Text>
            <TouchableOpacity onPress={() => handleFilterChange('all')} style={styles.filterButtonContainer}>
              <Text style={styles.filterButtonText}>ทั้งหมด</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFilterChange('active')} style={styles.filterButtonContainer}>
              <Text style={styles.filterButtonText}>กำลังใช้งาน</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFilterChange('deleted')} style={styles.filterButtonContainer}>
              <Text style={styles.filterButtonText}>ถูกลบแล้ว</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Text style={styles.closeButton}>ปิด</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  detailnav: {
    flexDirection: 'row',
    justifyContent: 'center',
    // backgroundColor: 'red',
    paddingRight: 10,
  },
  detailnavImage: {
    marginLeft: 120,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'white',
    borderRadius: 10 // ค่าที่กำหนดให้เท่ากับครึ่งของความกว้างและความสูงของรูปภาพ
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
  deviceImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    marginLeft: 20,
  },
  deviceText: {
    fontSize: 16,
  },
  statusText: {
    fontSize: 16,
    top: 5, // Add spacing between device name and status
  },
  onlineText: {
    color: '#4375F6',
  },
  offlineText: {
    color: '#FE4894',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 15,
    marginLeft: 30,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 20,
    marginBottom: 10,
  },
  emptyImage: {
    width: 100,
    height: 100,
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
    marginLeft: -6
  },


  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // สีพื้นหลังหลังจากโมดัล
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '80%',
  },
  closeButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    marginTop: 20,
    textAlign: 'center',
  },
  filterButtonContainer: {
    backgroundColor: '#f0f0f0', // สีพื้นหลังปุ่มกรอง
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center', // จัดการจัดการให้อยู่กลางตามแนวนอน
    justifyContent: 'center', // จัดการจัดการให้อยู่กลางตามแนวตั้ง
  },
  filterButtonText: {
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: '#333', // สีข้อความ
  },
  closeButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red', // สีข้อความ
    marginTop: 20,
    textAlign: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333', // สีข้อความ
  },
  

});
