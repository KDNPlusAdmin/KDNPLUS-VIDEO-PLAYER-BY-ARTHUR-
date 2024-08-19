/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from './AuthContext'; // Adjust the import path as needed
import axios from 'axios';

const API_BASE_URL = 'https://your-api-url.com/api'; // Replace with your actual API URL

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  addButton: {
    backgroundColor: 'red',
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
  },
  editButton: {
    marginRight: 10,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  userContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  userCard: {
    width: 100,
    height: 120,
    backgroundColor: '#222',
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    color: '#fff',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});

const WhoIsWatchingScreen = () => {
  const { users, setUsers } = useContext(AuthContext); // Access users from context
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/users`);
        if (response.status === 200) {
          setUsers(response.data);
        } else {
          throw new Error('Failed to fetch users');
        }
      } catch (error) {
        setError('Failed to load users. Please try again later.');
        console.error('Fetch Users Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [setUsers]);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    navigation.navigate('Content', { user }); // Navigate to content screen
  };

  const handleAddUserProfile = () => {
    navigation.navigate('CreateProfile', {
      onProfileCreated: async () => {
        // Refresh user list after profile creation
        await fetchUsers();
      }
    });
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile', { user: selectedUser });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <>
          {error && <Text style={styles.errorText}>{error}</Text>}
          <View style={styles.topBar}>
            <TouchableOpacity style={styles.addButton} onPress={handleAddUserProfile}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
              {/* Edit button icon or text */}
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Who's Watching?</Text>
          <View style={styles.userContainer}>
            {users.map((user) => (
              <TouchableOpacity key={user.id} style={styles.userCard} onPress={() => handleUserSelect(user)}>
                <Image source={{ uri: user.avatar }} style={{ width: 80, height: 80 }} />
                <Text style={styles.userName}>{user.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
    </View>
  );
};

export default WhoIsWatchingScreen;
