import React from 'react';
import { useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from '../database/firebaseDB';

const db = firebase.firestore();

export default function ChatScreen({ navigation, route }) {
	useEffect(() => {

        // navigation.setOptions({
        //     headerRight: () => (
        //       <TouchableOpacity onPress={logout}>
        //         <MaterialCommunityIcons
        //           name="logout"
        //           size={20}
        //           color="black"
        //           style={{ marginRight: 20 }}
        //         />
        //       </TouchableOpacity>
        //     ),
        //   });

		const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				navigation.navigate('Chat', { id: user.id, email: user.email });
			} else {
                navigation.navigate("Login");
            }
        });
        return unsubscribe;
    }, []);

    // const logout = ()=>{
    //     firebase.auth().signOut();
    // }
    
    

	return (
		<View style={styles.container}>
			<Text>Welcome to Chat Screen</Text>
            {/* <Text>{route.params.user.id}</Text> */}
			<TouchableOpacity onPress={() => firebase.auth().signOut()}>
				<Text>Logout</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#D1B490',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
