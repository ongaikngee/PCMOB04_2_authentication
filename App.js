import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screen/LoginScreen';
import ChatScreen from './screen/ChatScreen';

const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator mode="modal">
				<Stack.Screen
					name="Chat"
					component={ChatScreen}
					options={{ title: 'Chat App', headerStyle: styles.header }}
				/>
				<Stack.Screen
					name="Login"
					component={LoginScreen}
					options={{ title: 'Slackers Huts', headerStyle: styles.header, headerShown: false }}
					
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	header: {
		backgroundColor: '#EE7B30'
	}
});
