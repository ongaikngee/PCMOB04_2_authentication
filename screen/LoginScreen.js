import React, { useState } from 'react';
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
	const [ errorText, setErrorText ] = useState('');
	const auth = firebase.auth();

	const login = () => {
		Keyboard.dismiss();

		auth
			.signInWithEmailAndPassword(email, password)
			.then((userCredential) => {
				console.log('Signed In');
				// navigation.navigate('Chat', { email });
			})
			.catch((error) => {
				console.log('Error!');
				setErrorText(error.message);
			});
	};

	// const signup = () => {
	// 	console.log('Sign up');
	// };

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				<Text style={styles.header}>Chat App</Text>
				<Text style={styles.label}>Email</Text>
				<TextInput
					style={styles.textInput}
					placeholder="Enter Email"
					value={email}
					onChangeText={(input) => setEmail(input)}
					autoCorrect={true}
					keyboardType="email-address"
					autoCapitalize="none"
					autoCompleteType="email"
				/>
				<Text style={styles.label}>Password</Text>
				<TextInput
					style={styles.textInput}
					placeholder="Enter Password"
					value={password}
					onChangeText={(input) => setPassword(input)}
					secureTextEntry={true}
					autoCapitalize="none"
					autoCompleteType="password"
				/>
				<View style={styles.signContainer}>
					<TouchableOpacity onPress={login} style={styles.button}>
						<Text style={[ styles.label, { color: '#D1B490' } ]}>Log in</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => navigation.navigate('Signup')}>
						<Text style={styles.signUpText}>Sign Up</Text>
					</TouchableOpacity>
				</View>
				<Text style={styles.errorText}>{errorText}</Text>
				{/* <Button title="Go to Chat" onPress={() => navigation.navigate('Chat')} /> */}
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
		paddingTop: 100,
		paddingBottom: 200
	},
	header: {
		fontSize: 36,
		fontWeight: 'bold',
		color: '#885A89',
		marginBottom: 30
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
		marginTop: 20
	},
	textInput: {
		borderWidth: 1,
		borderColor: '#EE7B30',
		padding: 10,
		fontSize: 22
	},
	errorText: {
		color: 'red',
		marginTop: 20,
		marginLeft: 20,
		marginRight: 20,
		height: 40
	},
	signContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	signUpText: {
		fontSize: 24,
		alignSelf:'center',
		justifyContent:'center',
		paddingLeft:20,
		paddingTop:15,
		color:"#EE7B30",
	}
});
