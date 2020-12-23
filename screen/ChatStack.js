import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screen/LoginScreen';
import ChatScreen from '../screen/ChatScreen';
import RoomsScreen from '../screen/RoomsScreen';

export default function ChatStack() {
	const Stack = createStackNavigator();
	return (
		<Stack.Navigator>
            <Stack.Screen name="Rooms" component={RoomsScreen} 
				options={{ title: 'Chat Rooms', headerStyle: styles.header }}/>
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
	);
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: '#EE7B30'
	}
});
