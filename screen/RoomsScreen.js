import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import firebase from '../database/firebaseDB';

const auth = firebase.auth();
const db = firebase.firestore().collection('rooms');

export default function RoomsScreen({ navigation }) {
	const [ data, setData ] = useState([]);
	const [ textInput, setTextInput ] = useState('');

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

		const unSubSnapShot = db.onSnapshot((snapshot) => {
			const roomArray = snapshot.docs.map((doc) => {
				const room = {
					...doc.data(),
					id: doc.id
				};
				return room;
			});
			console.log('A');
			console.log(roomArray);
			setData(roomArray);
		});

		return () => {
			unSubAuth();
			unSubSnapShot();
		};
	}, []);

	function logout() {
		auth.signOut();
	}

	const addRoom = () => {
		db
			.add({
				room: textInput
			})
			.then(function(docRef) {
				setTextInput('');
				console.log('Document written with ID: ', docRef.id);
			})
			.catch(function(error) {
				console.error('Error adding document: ', error);
			});
	};

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
			<View style={styles.addRoomContainer}>
				<TextInput value={textInput} onChangeText={(input) => setTextInput(input)} style={styles.textInput} />
				<TouchableOpacity onPress={addRoom} style={styles.addRoomButton}>
					<Text style={styles.flatlistButtonText}>Add Room</Text>
				</TouchableOpacity>
			</View>
			<FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item.id} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#DAB785'
	},
	title: {
		fontSize: 24,
		color:"#031D44",
	},
	flatlistContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: '#D5896F',
		marginTop: 5,
		marginBottom: 2,
		padding: 10,
		paddingLeft:20,
		paddingRight:20,
	},
	flatlistButton: {
		borderWidth: 1,
		borderRadius: 15,
		borderColor: '#031D44',
		padding: 10,
		// flex: 2
	},
	flatlistButtonText: {
		fontSize: 18,
		color:'#031D44',
	},
	addRoomContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		// backgroundColor: 'brown',
		padding:20,
		marginBottom:10,
		borderBottomWidth:2,
	},
	addRoomButton: {
		backgroundColor: '#D5896F',
		padding:10,
		borderRadius:10,
	},
	textInput: {
		borderWidth: 1,
		fontSize: 24,
		flex:1,
		marginRight:15,
	}
});
