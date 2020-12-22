import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button } from 'react-native';
import firebase from '../database/firebaseDB';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GiftedChat } from 'react-native-gifted-chat';

const db = firebase.firestore().collection('messages');
const auth = firebase.auth();

export default function ChatScreen({ navigation }) {
	const [ messages, setMessages ] = useState([]);
	const [ userUID, setUserUID ] = useState('');
	const [ userEmail, setUserEmail ] = useState('');
	const [ userPhoto, setUserPhoto ] = useState('');
	const [ userName, setUserName ] = useState('');

	const API_URL = 'https://randomuser.me/api/?inc=picture,name';

	let photoURL = null;
	let displayName = null;

	useEffect(() => {
		// This is the listener for authentication
		const unsubscribeAuth = auth.onAuthStateChanged((user) => {
			//get random name and image
			fetch(API_URL)
			.then((response) => response.json())
			.then((responseData) => {
				photoURL = responseData.results[0].picture.large;
				displayName = responseData.results[0].name.first + ' ' + responseData.results[0].name.last;
			})
			.catch((error) => console.log(error));
			if (user) {
				setUserUID(user.uid);
				setUserEmail(user.email);
				
				//if user does not have a photoURL and displayName, assign random.
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

					setUserName(displayName);
					setUserPhoto(photoURL);
				} else {
					setUserName(user.displayName);
					setUserPhoto(user.photoURL);
				}
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
				email: userEmail,
				name: userName,
				avatar: userPhoto
			}}
		/>
	);
}
