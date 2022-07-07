import { StatusBar, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Matter from "matter-js";
import { GameEngine } from "react-native-game-engine";
import Player from './Player';
import Ball from './Ball';

const { width, height } = Dimensions.get("screen");
const entitySize = Math.trunc(Math.max(width, height) * 0.025);

const initialPlayer = Matter.Bodies.trapezoid(width / 2, height / 5 * 3, entitySize, entitySize, 1, {isStatic: true});
const initialBall = Matter.Bodies.circle(width / 2 + 1, 0, entitySize / 2);

const engine = Matter.Engine.create({ enableSleeping: false });
const world = engine.world;

Matter.World.add(world, [initialPlayer, initialBall]);

const Physics = (entities, { time }) => {
  let engine = entities["physics"].engine;
  Matter.Engine.update(engine, time.delta);
  return entities;
};

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
    <GameEngine
      style={styles.game}
      systems={[Physics]}
      entities={{
        physics: {
          engine: engine,
          world: world
        },
        initialPlayer: {
          body: initialPlayer,
          size: [entitySize, entitySize],
          color: 'red',
          renderer: Player
        },
        initialBall: {
          body: initialBall,
          size: [entitySize, entitySize],
          color: 'red',
          renderer: Ball
        }
      }}
    >
      <StatusBar hidden={true} />
    </GameEngine>
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
    justifyContent: 'space-around'
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
  },
  game: {
    flex: 1,
    backgroundColor: '#777',
  }
});
