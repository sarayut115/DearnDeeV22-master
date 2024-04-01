import React, { useState, useEffect, useRef, useCallback  } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import AccountScreen from "./screens/AccountScreen";
import DocumentScreen from "./screens/DocumentScreen";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View, StatusBar, SafeAreaView } from "react-native";
import ControlScreen from "../LoggedIn/ControlScreen";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { firebase } from '../config';

const Tab = createBottomTabNavigator();

const MainContainer = ({ }) => {
  const navigation = useNavigation();
  const db = firebase.firestore();
  const auth = firebase.auth();
  const realtimeDB = firebase.database();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = db.collection('users')
        .doc(auth.currentUser.uid)
        .onSnapshot(snapshot => {
          const userData = snapshot.data();
          if (userData) {
            setFirstName(userData.firstName)
            setLastName(userData.lastName)
            console.log(firstName)
          }
        });
  
      return () => {
        unsubscribe(); // Cleanup function to unsubscribe from the snapshot listener
      };
    }, [])
  );

  return (
    <>
      {/* <SafeAreaView style={{ backgroundColor: "#fff" }}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      </SafeAreaView> */}
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Account") {
              iconName = "person";
            } else if (route.name === "Documents") {
              iconName = "document-text";
              
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          // tabBarActiveTintColor: "#FF7AC6",
          tabBarActiveTintColor: "#6896FE",
          tabBarInactiveTintColor: "#888",
          // tabBarStyle: {
          //   display: "flex",
          // },
        })}
      >
        <Tab.Screen
          name="หน้าหลัก"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <Ionicons name="home" size={size} color={color} />;
            },
            headerLeft: () => (
              <View style={{ marginLeft: 25, marginBottom: 20 }}>
                <Text style={{ fontSize: 16, fontWeight: "normal", color: "#111", margin: 2 }}>
                  ยินดีต้อนรับ
                </Text>
                <Text style={{ fontSize: 16, fontWeight: "bold", color: "#111",width:200 }}>
                  {firstName} {lastName}
                </Text>
              </View>
            ),
            headerRight: () => (
              <TouchableOpacity
                // onPress={() => navigation123.navigate("HomeScreen")}
                // onPress={handleAddDevice}
                // onPress={() => navigation.navigate("HomeScreen", { isModalVisible: true })}
                style={{ marginRight: 15 }}
                onPress={() => navigation.navigate('NotificationScreen')}
              >
                {/* <Ionicons name="add-circle-outline" size={35} color="#00b4d8" /> */}
                <Image source={require("../assets/notification.png")} style={{ width: 150, height: 150, marginRight: -50, marginTop: 20 }} />
              </TouchableOpacity>
            ),
            headerTitle: "", // ลบ headerTitle ออก
            headerStyle: {
              elevation: 0, // ลบ shadow ของ header
              borderBottomWidth: 1, // เพิ่มเส้นขอบด้านล่างของ header
              borderBottomColor: '#ccc', // สีของเส้นขอบด้านล่างของ header
              height: 100,
            },

          }}
        />

        <Tab.Screen 
        name="ประวัติ" 
        component={DocumentScreen} 
          options={{
            tabBarIcon: ({ color, size }) => {
              return <Ionicons name="document-text" size={size} color={color} />;
            },
            headerShown: true,
            headerTitle: "ประวัติการใช้งาน",
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: "bold",
            },
            // headerStyle: {
            //   elevation: 0, // ลบ shadow ของ header
            //   borderBottomWidth: 1, // เพิ่มเส้นขอบด้านล่างของ header
            //   borderBottomColor: '#ccc', // สีของเส้นขอบด้านล่างของ header
            //   height: 100,
            // },

          }}
        />

        <Tab.Screen
          name="โปรไฟล์"
          component={AccountScreen}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <Ionicons name="person" size={size} color={color} />;
            },
            headerShown: true,
            headerTitle: "บัญชีของฉัน",
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: "bold",
            },

            // headerRight: () => (
            //   <TouchableOpacity
            //     onPress={() => console.log("Pressed Edit")}
            //     style={{ marginRight: 15 }}
            //   >
            //     <LinearGradient
            //       style={{ padding: 10, alignItems: "center", borderRadius: 20, width:80, height:40 }}
            //       colors={["#92a3fd", "#9dceff"]}
            //       start={[0, 0]}
            //       end={[1, 1]}
            //     >
            //       <Text style={{ fontSize: 16, color: "#ffff" }}>แก้ไข</Text>
            //     </LinearGradient>
            //   </TouchableOpacity>

            // ),
            // headerLeft: () => (
            //   <View style={{ marginLeft: 15 }}>
            //     {/* ภาพโปรไฟล์ */}
            //     <Image
            //       source={require("../assets/latestpic.png")} // เปลี่ยนเส้นทางไปยังไฟล์ภาพโปรไฟล์ของคุณ
            //       style={{ width: 30, height: 30, borderRadius: 15 }}
            //     />
            //     {/* ชื่อและรายละเอียด */}
            //     <View style={{ marginLeft: 10, width: 90, }}>
            //       <Text style={{ fontSize: 16, fontWeight: "bold", }} >
            //         รัชชานนท์
            //       </Text>
            //       <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            //         หอมประเสริฐ
            //       </Text>
            //       <Text style={{ fontSize: 14, color: "#888" }}>
            //         รายละเอียดเพิ่มเติม...
            //       </Text>
            //     </View>
            //   </View>
            // ),
          }}
        />


      </Tab.Navigator>
    </>
  );
};

export default () => {
  return <MainContainer />;
};
