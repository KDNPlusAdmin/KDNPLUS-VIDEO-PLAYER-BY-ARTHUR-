/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { getAllUsers } from '../api/userApi'; // Ensure this function is implemented correctly
import axios from 'axios'; // Import axios if not already done

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#000',
    },
    userItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
    },
    userName: {
        color: '#fff',
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },
});

const UsersScreen = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getAllUsers();
                setUsers(data);
            } catch (error) {
                setError('Error fetching users');
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const renderUserItem = ({ item }) => (
        <View style={styles.userItem}>
            <Text style={styles.userName}>{item.name}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={{ color: '#fff', fontSize: 18, marginBottom: 10 }}>Users</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#fff" />
            ) : error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : (
                <FlatList
                    data={users}
                    keyExtractor={(item) => item.userId.toString()} // Ensure userId is unique and use .toString()
                    renderItem={renderUserItem}
                />
            )}
        </View>
    );
};

export default UsersScreen;
