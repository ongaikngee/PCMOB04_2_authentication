import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
// import LoginScreen from './screen/LoginScreen';
// import ChatScreen from './screen/ChatScreen';
import SignUpScreen from './screen/SignUpScreen';
import ChatStack from './screen/ChatStack';

const Stack = createStackNavigator();
const OutterStack = createStackNavigator();

// const ChatStack = () => {
// 	return (
// 		// <NavigationContainer>
// 			<Stack.Navigator>
// 				<Stack.Screen
// 					name="Chat"
// 					component={ChatScreen}
// 					options={{ title: 'Chat App', headerStyle: styles.header }}
// 				/>
// 				<Stack.Screen
// 					name="Login"
// 					component={LoginScreen}
// 					options={{ title: 'Slackers Huts', headerStyle: styles.header, headerShown: false }}
// 				/>
// 			</Stack.Navigator>
// 		// </NavigationContainer>
// 	);
// }


export default function App() {
	return(
		<NavigationContainer>
			<OutterStack.Navigator mode="modal" headerMode="none">
				<OutterStack.Screen name="ChatStack" component={ChatStack} />
				<OutterStack.Screen name="Signup" component={SignUpScreen} />
			</OutterStack.Navigator>
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
