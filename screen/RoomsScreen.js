import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import firebase from '../database/firebaseDB';

// const db = firebase.firestore().collection('rooms').doc("rooms").collection("room02");
// const db = firebase.firestore().collection('rooms').doc("rooms");

// const db = firebase.firestore().collection('rooms');

export default function RoomsScreen({navigation}) {
	const [ data, setData ] = useState([ { id: '1', room: 'room01' }, { id: '2', room: 'room02' } ]);
	// const [data, setData] = useState([]);

	useEffect(() => {
		// Load data and store in DATA.
		//FireStore .get() methods
		// db.get().then((snapshot) => {
		// 	const data = snapshot.docs.map((doc) => ({
		// 		id: doc.id,
		// 		...doc.data(),
		// 	}));
		// 	setData(data);
		// 	console.log("All data in 'rooms' collection", data);
		// });

		//using onSnapshot
		// const unsub = db.onSnapshot((snapshot)=>{
		// 	const data =  snapshot.docs.map((doc)=>({
		// 		id:doc.id,
		// 		...doc.data(),
		// 	}));
		// 	setData(data);
		// });
		// return unsub();
		console.log(data);
	}, []);

	const room1 = () => console.log('going to room1');
	const room2 = () => console.log('going to room2');

	const room = (item) => console.log('going to rooming', item);

	const renderItem = ({ item }) => {
		return (
			<View style = {styles.flatlistContainer}>
				<Text style={styles.title}>{item.room}</Text>
				<TouchableOpacity onPress={()=>navigation.navigate('Chat',{...item})} style={styles.flatlistButton}>
					<Text style={styles.flatlistButtonText}>Enter Chat</Text>
				</TouchableOpacity>
			</View>
		);
	};

	return (
		<View>
			<FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item.id} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	title: {
		fontSize: 32,
		// padding: 10,
		// backgroundColor: 'orange'
	},
	flatlistContainer:{
		flexDirection:'row',
		justifyContent:'space-between',
		backgroundColor: 'orange',
		marginBottom: 15,
		padding: 10,
	},
	flatlistButton:{
		borderWidth:1,
		borderRadius:15,
		padding:10,
	},
	flatlistButtonText:{
		fontSize:24,
	}
});
