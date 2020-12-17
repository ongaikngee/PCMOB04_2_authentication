import React from 'react';
import { Text, View, StyleSheet } from 'react-native';


export default function ChatScreen(){
    return(
        <View style={styles.container}>
            <Text>Welcome  to Chat Screen</Text>
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