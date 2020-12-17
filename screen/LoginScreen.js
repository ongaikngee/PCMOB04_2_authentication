import React from 'react';
import { useState } from 'react';
import {
	View,
	Text,
	Button,
	StyleSheet,
	TouchableOpacity,
	TouchableWithoutFeedback,
	TextInput,
	Keyboard
} from 'react-native';
import firebase from '../database/firebaseDB';

export default function LoginScreen({ navigation }) {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const db = firebase.firestore().collection('users');

	const login = () => {
		const newUser = {
			email: 'ongaikngee@gmail.com',
			password: '123'
		};

		db.add(newUser);
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				<Text style={styles.header}>Chat App</Text>
				<Text style={styles.label}>Email</Text>
				<TextInput
					style={styles.textInput}
					placeholder="Enter Email"
					value={email}
					onChangeText={(text) => setEmail(text)}
				/>
				<Text style={styles.label}>Password</Text>
				<TextInput
					style={styles.textInput}
					placeholder="Enter Password"
					value={password}
					onChangeText={(password) => setPassword(password)}
					secureTextEntry={true}
				/>
				<TouchableOpacity onPress={login} style={styles.button}>
					<Text style={[ styles.label, { color: '#D1B490' } ]}>Log in</Text>
				</TouchableOpacity>
				<Button title="Go to Chat" onPress={() => navigation.navigate('Chat')} />
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		justifyContent: 'space-around',
		height: '100%',
        backgroundColor: '#D1B490',
        paddingTop:100,
        paddingBottom:200,
	},
	header: {
		fontSize: 36,
		fontWeight: 'bold',
        color: '#885A89',
        marginBottom:30,
	},
	label: {
		fontSize: 22,
		color: '#EE7B30'
	},
	button: {
		backgroundColor: '#EE7B30',
		width: 200,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
        borderRadius: 25,
        marginTop:20,
	},
	textInput: {
		borderWidth: 1,
		borderColor: '#EE7B30',
		padding: 10,
		fontSize: 22,
	}
});
