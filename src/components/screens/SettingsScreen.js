import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  settingLabel: {
    color: '#fff',
  },
  settingValue: {
    color: '#fff',
  },
});

const SettingsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Account Settings</Text>
      <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('EditProfile')}>
        <Text style={styles.settingLabel}>Profile</Text>
        <Text style={styles.settingValue}>View Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem}>
        <Text style={styles.settingLabel}>Password</Text>
        <Text style={styles.settingValue}>Change Password</Text>
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>App Settings</Text>
      <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('VideoQualitySettings')}>
        <Text style={styles.settingLabel}>Video Quality</Text>
        <Text style={styles.settingValue}>Auto</Text> {/* Replace with actual video quality */}
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem}>
        <Text style={styles.settingLabel}>Notifications</Text>
        <Text style={styles.settingValue}>On/Off</Text> {/* Replace with toggle switch */}
      </TouchableOpacity>
      {/* ... other app settings */}
      <Text style={styles.sectionTitle}>About</Text>
      <TouchableOpacity style={styles.settingItem}>
        <Text style={styles.settingLabel}>App Version</Text>
        <Text style={styles.settingValue}>1.0.0</Text> {/* Replace with actual version */}
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem}>
        <Text style={styles.settingLabel}>Legal</Text>
        <Text style={styles.settingValue}>Terms of Service</Text>
      </TouchableOpacity>
      {/* ... other about information */}
    </View>
  );
};

export default SettingsScreen;
