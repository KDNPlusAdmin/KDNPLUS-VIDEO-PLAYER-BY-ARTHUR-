/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import { updateUserProfile } from '../api/profileService'; // Import API function

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    color: '#fff',
    fontSize: 24,
  },
  saveButton: {
    color: '#1E90FF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 20,
  },
  editProfileButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#1E90FF',
    borderRadius: 15,
    padding: 5,
  },
  editProfileButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  inputContainer: {
    width: '100%',
    marginTop: 20,
  },
  input: {
    backgroundColor: '#1C1C1C',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
  },
});

const EditProfileScreen = ({ route }) => {
  const { user, setUser } = useContext(AuthContext); // Use AuthContext to access user and setUser
  const navigation = useNavigation();
  const { userId } = route.params; // Assuming userId is passed as a route param
  const [username, setUsername] = useState(user.name);
  const [age, setAge] = useState(user.age);
  const [profileImage, setProfileImage] = useState(user.avatar);

  const handleSaveProfile = async () => {
    try {
      // Update user profile data using API
      const updatedUser = await updateUserProfile(userId, {
        name: username,
        age: age,
        avatar: profileImage,
      });

      // Update user profile in the context
      setUser((prevUser) => ({
        ...prevUser,
        name: username,
        age: age,
        avatar: profileImage,
      }));

      // Navigate back
      navigation.goBack();
    } catch (error) {
      // Handle error
      Alert.alert('Update Error', 'Failed to update profile. Please try again.');
    }
  };

  const handleEditProfileImage = () => {
    // Implement image picker or camera functionality
  };

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
          source={profileImage ? { uri: profileImage } : require('../assets/default_profile.png')}
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

export default EditProfileScreen;
