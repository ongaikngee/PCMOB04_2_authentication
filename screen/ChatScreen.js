import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button } from 'react-native';
import firebase from '../database/firebaseDB';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GiftedChat } from 'react-native-gifted-chat';

// const db = firebase.firestore().collection('messages');

export default function ChatScreen({ navigation, route }) {

	//Check if route.params.room is valid
	const db = firebase.firestore().collection(route.params.room);
	const auth = firebase.auth();

	const [ messages, setMessages ] = useState([]);
	const [ userUID, setUserUID ] = useState('');
	const [ userEmail, setUserEmail ] = useState('');
	const [ userPhoto, setUserPhoto ] = useState('');
	const [ userName, setUserName ] = useState('');

	useEffect(() => {
		// This is the listener for authentication
		const unsubscribeAuth = auth.onAuthStateChanged((user) => {
			if (user) {
				setUserUID(user.uid);
				setUserEmail(user.email);
				setUserName(user.displayName);
				setUserPhoto(user.photoURL);
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
					createdAt: new Date(data.createdAt.seconds * 1000), // convert to JS date object
					
				};
				// console.log(returnData);
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
		const newMessage = {
			...newMessages[0],
			// received:true,
			// image: "https://randomuser.me/api/portraits/women/31.jpg",
			// system:true, 
		};
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
