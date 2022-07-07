import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Dodge Balls!</Text>
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate('Game')}
      >
        <Text style={styles.startButtonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
}

const GameScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Game screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Game' component={GameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  welcomeText: {
    color: '#8080ff',
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 40
  },
  startButton: {
    backgroundColor: '#8080ff',
    width: '50%',
    padding: 15,
    borderRadius: 25,
  },
  startButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25
  }
});
