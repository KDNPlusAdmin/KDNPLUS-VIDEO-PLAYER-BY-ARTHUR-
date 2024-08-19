/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-require-imports */
import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import { getUserProfile, updateUserProfile } from '../api/userService'; // Import API functions

const styles = StyleSheet.create({
  // Styles here (same as your original code)
});

const CreateProfileScreen = () => {
  const navigation = useNavigation();
  const { user, setUser } = useContext(AuthContext); // Use AuthContext
  const [username, setUsername] = useState(user?.username || '');
  const [age, setAge] = useState(user?.age || '');
  const [profileImage, setProfileImage] = useState(user?.profileImage || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfile(user.token);
        setUser(profile);
        setUsername(profile.username);
        setAge(profile.age);
        setProfileImage(profile.profileImage);
      } catch (error) {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user.token, setUser]);

  const handleSaveProfile = async () => {
    // Validate and save user profile data
    if (username.trim() === '' || age.trim() === '') {
      Alert.alert('Validation Error', 'Please enter all fields');
    } else {
      try {
        const updatedProfile = await updateUserProfile(user.token, { ...user, username, age, profileImage });
        setUser(updatedProfile);
        navigation.navigate('WhoIsWatching');
      } catch (error) {
        setError('Failed to update profile');
      }
    }
  };

  const handleEditProfileImage = async () => {
    // Request permission to access the camera roll
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissions Error', 'Sorry, we need camera roll permissions to make this work!');
      return;
    }

    // Open the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error}</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>&lt;</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSaveProfile}>
          <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleEditProfileImage}>
        <Image
          source={
            profileImage
              ? { uri: profileImage }
              : require('./assets/default_profile.png') // Use correct path for the default image
          }
          style={styles.profileImage}
        />
        <View style={styles.editProfileButton}>
          <Text style={styles.editProfileButtonText}>Edit</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          placeholderTextColor="#888"
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Age"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={age}
          onChangeText={(text) => setAge(text)}
          style={styles.input}
        />
      </View>
    </View>
  );
};

export default CreateProfileScreen;
