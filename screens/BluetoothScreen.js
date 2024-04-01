import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { BleManager } from 'react-native-ble-plx';

const BluetoothScreen = () => {
  const [devices, setDevices] = useState([]);
  const [manager, setManager] = useState(null);

  useEffect(() => {
    const initializeBluetooth = async () => {
      const bleManager = new BleManager();
      setManager(bleManager);

      // Start scanning for Bluetooth devices
      const subscription = bleManager.onStateChange((state) => {
        if (state === 'PoweredOn') {
          bleManager.startDeviceScan(null, null, (error, scannedDevice) => {
            if (error) {
              console.error('Error scanning devices:', error);
              return;
            }
            if (scannedDevice) {
              setDevices((prevDevices) => {
                if (!prevDevices.find((d) => d.id === scannedDevice.id)) {
                  return [...prevDevices, scannedDevice];
                }
                return prevDevices;
              });
            }
          });
          subscription.remove(); // Stop scanning after first device is found
        }
      }, true);
    };

    initializeBluetooth();

    return () => {
      // Clean up BLE manager when component unmounts
      if (manager) {
        manager.destroy();
      }
    };
  }, []);

  const connectToDevice = async (device) => {
    try {
      const connectedDevice = await device.connect();
      console.log('Connected to device:', connectedDevice.id);
      // You can now perform operations with the connected device
    } catch (error) {
      console.error('Error connecting to device:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bluetooth Devices:</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    width: '90%',
    alignSelf: 'center',
  },
});

export default BluetoothScreen;
