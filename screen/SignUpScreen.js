import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, StatusBar, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from '../database/firebaseDB';

export default function SignUpScreen({ navigation }) {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ cPassword, setCPassword ] = useState('');
	const [ feedback, setFeedback ] = useState('');
	const [ avatar, setAvatar ] = useState('');

	// const API_URL = 'https://randomuser.me/api/?inc=picture';

	const auth = firebase.auth();

	const signup = () => {
		const formValid = formValidation();
		if (formValid) {
			// fetch(API_URL)
			// 	.then((response) => response.json())
			// 	.then((responseData) => {
			// 		setAvatar(responseData.results[0].picture.large);
			// 	})
			// 	.catch((error) => console.log(error));

			auth
				.createUserWithEmailAndPassword(email, password)
				.then((user) => navigation.navigate('Login'))
				.catch((error) => setFeedback(error.message));
		}
	};

	const formValidation = () => {
		setFeedback('');
		// check if password match and fields are not empty
		if (email == '' || password == '' || cPassword == '') {
			setFeedback('No empty fields');
			return false;
		}
		if (password != cPassword) {
			setFeedback('Password must match');
			return false;
		}
		return true;
	};

	// const randomUser = () => {
	// 	fetch(API_URL)
	// 		.then((response) => response.json())
	// 		.then((responseData) => {
	// 			setAvatar(JSON.stringify(responseData.results[0].picture.large));
	// 		})
	// 		.catch((error) => console.log(error));
	// };

	return (
		<KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
			<View style={styles.container}>
				<Text style={styles.titleText}>Sign up for an account</Text>
				<Text style={styles.labelText}>Email</Text>
				<TextInput
					style={styles.textInput}
					placeholder="Enter your email"
					keyboardType="email-address"
					value={email}
					onChangeText={(item) => setEmail(item)}
				/>
				<Text style={styles.labelText}>Password</Text>
				<TextInput
					style={styles.textInput}
					secureTextEntry={true}
					placeholder="Enter your password"
					value={password}
					onChangeText={(item) => setPassword(item)}
				/>
				<Text style={styles.labelText}>Confirm Password</Text>
				<TextInput
					style={styles.textInput}
					secureTextEntry={true}
					placeholder="Confirm password"
					value={cPassword}
					onChangeText={(item) => setCPassword(item)}
				/>
				<View style={styles.buttonContainer}>
					<TouchableOpacity onPress={signup} style={styles.button}>
						<Text style={[ styles.labelText, { color: '#D1B490' } ]}>Sign up</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => navigation.navigate('Login')}>
						<Text style={[ styles.labelText, { paddingLeft: 15, paddingTop: 15 } ]}>Cancel</Text>
					</TouchableOpacity>
				</View>
				{/* <TouchableOpacity style={styles.button} onPress={randomUser}>
					<Text>Random User</Text>
				</TouchableOpacity>
				<Text>{avatar}</Text> */}
				<StatusBar
					backgroundColor="red"
					hidden="false"
					barStyle="dark-content"
					networkActivityIndicatorVisible="false"
				/>
				<Text style={styles.feedback}>{feedback}</Text>
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		height: '100%',
		backgroundColor: '#D1B490',
		paddingRight: 10,
		paddingLeft: 10
	},
	titleText: {
		fontSize: 36,
		fontWeight: 'bold',
		color: '#885A89',
		marginBottom: 40
	},
	labelText: {
		fontSize: 22,
		color: '#EE7B30'
	},
	textInput: {
		borderWidth: 1,
		borderColor: '#EE7B30',
		fontSize: 22,
		padding: 10,
		marginBottom: 20
	},
	buttonContainer: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	button: {
		backgroundColor: '#EE7B30',
		width: 200,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 25,
		marginTop: 20
	},
	feedback: {
		color: 'red',
		marginTop: 20,
		marginLeft: 20,
		marginRight: 20,
		height: 40
	}
});
