import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SignUpScreen from './screen/SignUpScreen';
import ChatStack from './screen/ChatStack';

const OutterStack = createStackNavigator();

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
