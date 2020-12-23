import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import firebase from '../database/firebaseDB';

const auth = firebase.auth();

export default function RoomsScreen({ navigation }) {
	const [ data, setData ] = useState([ { id: '1', room: 'room01' }, { id: '2', room: 'room02' } ]);

	const API_URL = 'https://randomuser.me/api/?inc=picture,name';
	let photoURL = null;
	let displayName = null;

	//get random name and image
	fetch(API_URL)
		.then((response) => response.json())
		.then((responseData) => {
			photoURL = responseData.results[0].picture.large;
			displayName = responseData.results[0].name.first + ' ' + responseData.results[0].name.last;
		})
		.catch((error) => console.log(error));

	useEffect(() => {
		const unSubAuth = auth.onAuthStateChanged((user) => {
			if (user) {
				if (user.displayName == null || user.photoURL == null) {
					//update user profile
					user
						.updateProfile({
							displayName: displayName,
							photoURL: photoURL
						})
						.then(function() {
							// Update successful.
						})
						.catch(function(error) {
							// An error happened.
						});
				}
				navigation.navigate('Rooms');
			} else {
				navigation.navigate('Login');
			}
		});

		// This sets up the top right button
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity onPress={logout}>
					<MaterialCommunityIcons name="logout" size={20} color="black" style={{ marginRight: 20 }} />
				</TouchableOpacity>
			)
		});

		return () => {
			unSubAuth();
		};
	}, []);

	function logout() {
		auth.signOut();
	}

	const renderItem = ({ item }) => {
		return (
			<View style={styles.flatlistContainer}>
				<Text style={styles.title}>{item.room}</Text>
				<TouchableOpacity
					onPress={() => navigation.navigate('Chat', { ...item })}
					style={styles.flatlistButton}
				>
					<Text style={styles.flatlistButtonText}>Enter Chat</Text>
				</TouchableOpacity>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item.id} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#D1B490'
	},
	title: {
		fontSize: 32
	},
	flatlistContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: '#EE7B30',
		marginTop: 5,
		marginBottom: 15,
		padding: 10
	},
	flatlistButton: {
		borderWidth: 1,
		borderRadius: 15,
		padding: 10
	},
	flatlistButtonText: {
		fontSize: 24
	}
});
