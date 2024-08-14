import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';

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
});

// eslint-disable-next-line react/prop-types
const VideoQualitySettingsScreen = ({ navigation }) => {
  const [videoQuality, setVideoQuality] = useState('Auto');
  const [dataSaverEnabled, setDataSaverEnabled] = useState(false);

  const handleVideoQualityChange = (quality) => {
    setVideoQuality(quality);
  };

  const handleDataSaverChange = (value) => {
    setDataSaverEnabled(value);
  };

  const handleApplySettings = () => {
    // Apply selected settings
    // eslint-disable-next-line react/prop-types
    navigation.goBack();
  };

  const videoQualityOptions = ['Auto', 'Low', 'Medium', 'High'];

  return (
    <View style={styles.container}>
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
    </View>
  );
};

export default VideoQualitySettingsScreen;
