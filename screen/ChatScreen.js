import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button } from 'react-native';
import firebase from '../database/firebaseDB';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GiftedChat } from 'react-native-gifted-chat';

const db = firebase.firestore().collection('messages');
const auth = firebase.auth();

// const API_URL = 'https://randomuser.me/api/?inc=picture';

export default function ChatScreen({ navigation }) {
	const [ messages, setMessages ] = useState([]);
	const [ userUID, setUserUID ] = useState('');
	const [ userEmail, setUserEmail ] = useState('');
	const [ userPhoto, setUserPhoto ] = useState('');

	useEffect(() => {
		// This is the listener for authentication
		const unsubscribeAuth = auth.onAuthStateChanged((user) => {
			if (user) {
				setUserUID(user.uid);
				setUserEmail(user.email);
				setUserPhoto(user.photoURL);
				console.log(user);
				navigation.navigate('Chat');
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
			// headerLeft: () => (
			// 	<TouchableOpacity onPress={randomUser}>
			// 		<Text>Hi</Text>
			// 	</TouchableOpacity>
			// )
		});

		// This loads data from firebase
		const unsubscribeSnapshot = db.orderBy('createdAt', 'desc').onSnapshot((collectionSnapshot) => {
			const serverMessages = collectionSnapshot.docs.map((doc) => {
				const data = doc.data();
				const returnData = {
					...doc.data(),
					createdAt: new Date(data.createdAt.seconds * 1000) // convert to JS date object
				};
				return returnData;
			});
			setMessages(serverMessages);
		});

		return () => {
			unsubscribeAuth();
			unsubscribeSnapshot();
		};
	}, []);

	// const randomUser = () => {

	// 	fetch(API_URL)
	// 		.then((response) => response.json())
	// 		.then((responseData) => {
	// 			setUserPhoto(responseData.results[0].picture.large);
	// 		})
	// 		.catch((error) => console.log(error));

	// 	auth.currentUser
	// 		.updateProfile({
	// 			displayName: 'Jane Q. User',
	// 			photoURL: userPhoto
	// 		})
	// 		.then(function() {
	// 			// Update successful.
	// 		})
	// 		.catch(function(error) {
	// 			// An error happened.
	// 		});
	// };

	function logout() {
		auth.signOut();
	}

	function sendMessages(newMessages) {
		console.log(newMessages);
		const newMessage = newMessages[0];
		db.add(newMessage);
	}

	return (
			<GiftedChat
				messages={messages}
				onSend={(newMessages) => sendMessages(newMessages)}
				renderUsernameOnMessage={true}
				listViewProps={{
					style: {
						backgroundColor: '#D1B490'
					}
				}}
				user={{
					_id: userUID,
					name: userEmail
					// avatar: userPhoto,
				}}
			/>
	);
}
