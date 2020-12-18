import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';


export default function ChatScreen({navigation, route}){
    return(
        <View style={styles.container}>
            <Text>Welcome  to Chat Screen</Text>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Text>Click me</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#D1B490',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });