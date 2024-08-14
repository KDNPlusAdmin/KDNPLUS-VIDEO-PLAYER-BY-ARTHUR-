import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  // ... styles
});

const EditProfileScreen = ({ route, navigation }) => {
  const { user } = route.params;
  const [username, setUsername] = useState(user.name);
  const [age, setAge] = useState(user.age);
  const [profileImage, setProfileImage] = useState(user.avatar);

  const handleSaveProfile = () => {
    // Update user profile data
    navigation.goBack();
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
        <Image source={profileImage ? { uri: profileImage } : require('./default_profile.png')} style={styles.profileImage} />
        <View style={styles.editProfileButton}>
          <Text style={styles.editProfileButtonText}>Edit</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Age"
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
