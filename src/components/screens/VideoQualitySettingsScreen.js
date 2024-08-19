/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';

const API_BASE_URL = 'https://your-api-url.com/api'; // Replace with your actual API URL

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsContainer: {
    width: '80%',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingLabel: {
    color: '#fff',
  },
  applyButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});

const VideoQualitySettingsScreen = ({ navigation }) => {
  const [videoQuality, setVideoQuality] = useState('Auto');
  const [dataSaverEnabled, setDataSaverEnabled] = useState(false);
  const [videoQualityOptions, setVideoQualityOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/settings`);
        if (response.status === 200) {
          const settings = response.data;
          setVideoQuality(settings.videoQuality);
          setDataSaverEnabled(settings.dataSaverEnabled);
        } else {
          throw new Error('Failed to fetch settings');
        }
      } catch (error) {
        setError('Failed to load settings. Please try again later.');
        console.error('Fetch Settings Error:', error);
      }
    };

    const fetchVideoQualityOptions = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/video-quality-options`);
        if (response.status === 200) {
          setVideoQualityOptions(response.data.options);
        } else {
          throw new Error('Failed to fetch video quality options');
        }
      } catch (error) {
        setError('Failed to load video quality options. Please try again later.');
        console.error('Fetch Video Quality Options Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
    fetchVideoQualityOptions();
  }, []);

  const handleVideoQualityChange = (quality) => {
    setVideoQuality(quality);
  };

  const handleDataSaverChange = (value) => {
    setDataSaverEnabled(value);
  };

  const handleApplySettings = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/settings`, {
        videoQuality,
        dataSaverEnabled,
      });
      if (response.status === 200) {
        Alert.alert('Success', 'Settings have been applied.');
        navigation.goBack();
      } else {
        throw new Error('Failed to apply settings');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to apply settings. Please try again later.');
      console.error('Apply Settings Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <>
          {error && <Text style={styles.errorText}>{error}</Text>}
          <Text style={{ color: '#fff', fontSize: 20, marginBottom: 20 }}>Video Quality Settings</Text>
          <View style={styles.settingsContainer}>
            {videoQualityOptions.map((quality) => (
              <TouchableOpacity
                key={quality}
                style={styles.settingItem}
                onPress={() => handleVideoQualityChange(quality)}
              >
                <Text style={styles.settingLabel}>{quality}</Text>
                {videoQuality === quality && <Text style={{ color: 'green' }}>✓</Text>}
              </TouchableOpacity>
            ))}
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Data Saver</Text>
              <Switch value={dataSaverEnabled} onValueChange={handleDataSaverChange} />
            </View>
            <TouchableOpacity style={styles.applyButton} onPress={handleApplySettings}>
              <Text style={{ color: '#fff' }}>Apply</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default VideoQualitySettingsScreen;
