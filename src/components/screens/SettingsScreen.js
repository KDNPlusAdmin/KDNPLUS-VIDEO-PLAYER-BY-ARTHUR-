/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ActivityIndicator, Alert } from 'react-native';
import { AuthContext } from './AuthContext'; // Adjust path as needed
import axios from 'axios'; // Make sure axios is installed and imported

const API_BASE_URL = 'http://your-api-url.com/api'; // Replace with your actual API URL

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
  const { user, setUser } = useContext(AuthContext); // Access AuthContext
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [videoQuality, setVideoQuality] = useState('Auto');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch initial settings from the API
    const fetchSettings = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/user-settings/${user.id}`);
        const { notifications, videoQuality } = response.data;
        setNotificationsEnabled(notifications);
        setVideoQuality(videoQuality);
      } catch (error) {
        console.error('Error fetching user settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, [user.id]);

  const handleNotificationsToggle = async () => {
    setIsLoading(true);
    try {
      const response = await axios.put(`${API_BASE_URL}/user-settings/${user.id}/notifications`, {
        enabled: !notificationsEnabled,
      });
      if (response.status === 200) {
        setNotificationsEnabled(!notificationsEnabled);
      } else {
        Alert.alert('Error', 'Unable to update notification settings.');
      }
    } catch (error) {
      console.error('Error updating notification settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVideoQualityChange = async (newQuality) => {
    setIsLoading(true);
    try {
      const response = await axios.put(`${API_BASE_URL}/user-settings/${user.id}/video-quality`, {
        videoQuality: newQuality,
      });
      if (response.status === 200) {
        setVideoQuality(newQuality);
      } else {
        Alert.alert('Error', 'Unable to update video quality settings.');
      }
    } catch (error) {
      console.error('Error updating video quality settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading && <ActivityIndicator color="#fff" />}
      <Text style={styles.sectionTitle}>Account Settings</Text>
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => navigation.navigate('EditProfile')}
      >
        <Text style={styles.settingLabel}>Profile</Text>
        <Text style={styles.settingValue}>{user?.name || 'View Profile'}</Text> {/* Display user's name */}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => navigation.navigate('ChangePassword')}
      >
        <Text style={styles.settingLabel}>Password</Text>
        <Text style={styles.settingValue}>Change Password</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>App Settings</Text>
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => navigation.navigate('VideoQualitySettings')}
      >
        <Text style={styles.settingLabel}>Video Quality</Text>
        <Text style={styles.settingValue} onPress={() => handleVideoQualityChange('High')}>
          {videoQuality}
        </Text>
      </TouchableOpacity>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={handleNotificationsToggle}
        />
      </View>

      <Text style={styles.sectionTitle}>About</Text>
      <TouchableOpacity
        style={styles.settingItem}
      >
        <Text style={styles.settingLabel}>App Version</Text>
        <Text style={styles.settingValue}>1.0.0</Text> {/* Replace with actual version */}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => navigation.navigate('TermsOfService')}
      >
        <Text style={styles.settingLabel}>Legal</Text>
        <Text style={styles.settingValue}>Terms of Service</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
