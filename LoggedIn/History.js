import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { LineChart } from 'react-native-chart-kit';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from "expo-linear-gradient";
import { firebase } from '../config';

const History = ({ route }) => {
    const { deviceId, deviceName } = route.params;
    const navigation = useNavigation();
    const auth = firebase.auth();
    const db = firebase.firestore();
    const [usageHistory, setUsageHistory] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [filteredHistory, setFilteredHistory] = useState([]);

    const filterHistory = () => {
        const filteredData = usageHistory.filter(item => {
            const itemDate = new Date(item.timestamp.toMillis());
            return (
                itemDate.getDate() === selectedDate.getDate() &&
                itemDate.getMonth() === selectedDate.getMonth() &&
                itemDate.getFullYear() === selectedDate.getFullYear()
            );
        });
        setFilteredHistory(filteredData);
    };
    useEffect(() => {
        filterHistory();
    }, [selectedDate]);

    useEffect(() => {
        const fetchUsageHistory = async () => {
            try {
                const userDocRef = db.collection('users').doc(auth.currentUser.uid);
                const userDoc = await userDocRef.get();
                const userData = userDoc.data();
                if (userData && userData.devicesAll) {
                    const device = userData.devicesAll.find(d => d.id === deviceId);
                    if (device && device.History) {
                        // Calculate duration for each usage record
                        const updatedHistory = device.History.map((item, index, arr) => {
                            if (item.isOn && arr[index + 1] && !arr[index + 1].isOn) {
                                const duration = arr[index + 1].timestamp.toMillis() - item.timestamp.toMillis();
                                return { ...item, duration };
                            }
                            return item;
                        }).filter(item => item.duration); // Filter out records without duration
                        setUsageHistory(updatedHistory);
                        setFilteredHistory(updatedHistory); // Initialize filtered history with all history data
                    } else {
                        setFilteredHistory([]); // Set filtered history to empty array if no data available
                    }
                }
            } catch (error) {
                console.error('Error fetching usage history:', error);
            }
        };

        fetchUsageHistory();
    }, [auth.currentUser.uid, db, deviceId]);

    const formatDateThai = (date) => {
        const thaiMonths = [
            "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
            "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม",
            "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
        ];
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear() + 543; // แปลงเป็น พ.ศ.
        return `${day} ${thaiMonths[monthIndex]} ${year}`;
    };

    const formatDuration = (milliseconds) => {
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        const remainingSeconds = seconds % 60;
        return `${hours} ชั่วโมง ${remainingMinutes} นาที ${remainingSeconds} วินาที`;
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>ติดตามการใช้งาน </Text>
            </View>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {/* <Text style={styles.sectionTitle}>{deviceId}. {deviceName}</Text> */}

                <LinearGradient
                    style={styles.gradientContainer}
                    locations={[0, 1]}
                    colors={["#92a3fd", "#9dceff"]}
                >
                    <LinearGradient
                        style={[styles.button1AAStim]}
                        locations={[0, 1]}
                        colors={["#c58bf2", "#eea4ce"]}
                    >
                        <Text style={styles.sectionTitle}>{deviceId}. {deviceName}</Text>
                    </LinearGradient>

                    <Text style={styles.sectionTitle}>กราฟการใช้งาน:  {formatDateThai(selectedDate)}</Text>
                    
                    <View style={styles.usageContainer}>
                        {filteredHistory.length > 0 ? (
                            <LineChart
                                data={{
                                    labels: filteredHistory.map((item, index) => `${index + 1}`),
                                    datasets: [{
                                        data: filteredHistory.map(item => item.duration / 1000 ),
                                        // data: filteredHistory.map(item => (item.duration / 1000) / 60), // แปลงจากวินาทีเป็นนาที
                                    }]
                                }}
                                width={300}
                                height={300}
                                yAxisLabel=""
                                chartConfig={{
                                    backgroundColor: "#fff",
                                    backgroundGradientFrom: "#fff",
                                    backgroundGradientTo: "#fff",
                                    decimalPlaces: 0,
                                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                    style: {
                                        borderRadius: 16,
                                    },
                                    propsForDots: {
                                        r: "6",
                                        strokeWidth: "2",
                                        stroke: "#ffa726",
                                    }
                                }}
                                style={{
                                    marginVertical: 8,
                                    borderRadius: 16,
                                }}
                            />
                        ) : (
                            <Text style={styles.noDataText}>ไม่มีข้อมูล</Text>
                        )}
                    </View>
                    <Text style={styles.axisDescription}>แกน x: จำนวนการใช้งาน (เปิด-ปิด)</Text>
                    <Text style={styles.axisDescription}>แกน y: ระยะเวลาการใช้งาน (วินาที)</Text>

                </LinearGradient>
                <View style={styles.filterContainer}>

                    {/* เนื้อหาของ Linear Gradient */}
                    <View style={styles.filterContainer}>
                        <TouchableOpacity onPress={filterHistory}>
                            <Text style={styles.filterButton}>เลือกตัวกรอง</Text>
                        </TouchableOpacity>
                        <DateTimePicker
                            value={selectedDate}
                            mode="date"
                            is24Hour={true}
                            display="default"
                            onChange={(event, selectedDate) => setSelectedDate(selectedDate)}
                            locale="th"
                        // style={{ marginTop:10 , backgroundColor: 'white',width:80}}
                        />
                    </View>

                </View>


                {filteredHistory.map((item, index) => (
                    <View key={index} style={styles.usageItem}>
                        <Text style={styles.itemTitle}>ครั้งที่ {index + 1}</Text>
                        <Text style={styles.itemText}>
                            เปิดเครื่องเมื่อ: {formatDateThai(item.timestamp.toDate())} เวลา {item.timestamp.toDate().toLocaleTimeString()}
                        </Text>
                        <Text style={styles.itemText}>
                            ปิดเครื่องเมื่อ: {formatDateThai(new Date(item.timestamp.toMillis() + item.duration))} เวลา {new Date(item.timestamp.toMillis() + item.duration).toLocaleTimeString()}
                        </Text>
                        <Text style={styles.itemTexttime}>ระยะเวลาการใช้งาน: {formatDuration(item.duration)}</Text>
                    </View>

                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({

    gradientContent: {
        borderRadius: 15
    },
    container: {
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: 20,
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
        marginLeft: 75,
        marginTop: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 10,
        alignSelf: 'center',
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    backButton: {
        paddingTop: 30,
    },
    gradientContainer: {
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 20,
    },
    usageContainer: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    usageItem: {
        marginBottom: 10,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    filterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 10,
        width: 350,
    },
    filterButton: {
        fontSize: 20,
        color: 'black',
        paddingLeft: 20,
        paddingTop: 10,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    noDataText: {
        fontSize: 16,
        color: 'black',
        marginTop: 20,
        alignSelf: 'center',
    },
    axisDescription: {
        fontSize: 14,
        color: 'black',
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 10,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    itemText: {
        fontSize: 16,
        color: '#555',
        marginLeft: 10,
    },
    itemTexttime: {
        fontSize: 16,
        color: '#555',
        marginLeft: 10,
    },
});


export default History;
