import { StatusBar, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Matter, { Body } from "matter-js";
import { GameEngine } from "react-native-game-engine";
import Player from './Player';
import Ball from './Ball';

const engine = Matter.Engine.create({ enableSleeping: false });
const world = engine.world;

const randInt = (min, max) => { return Math.floor(Math.random() * (max - min + 1) + min) - 1; };
const randomColor = () => { return Math.floor(Math.random()*16777215).toString(16); }

const { width, height } = Dimensions.get("screen");
const entitySize = Math.trunc(Math.max(width, height) * 0.025);

const player = Matter.Bodies.trapezoid(width / 2, height / 5 * 3, entitySize, entitySize, 1, { isStatic: true });
const balls = [];
for (let i = 0; i < 7; i++) {
  let ball = Matter.Bodies.circle(width / 8 * i + 1, -height * i, entitySize / 2., { frictionAir: 0.05});
  balls.push(ball);
  Matter.World.add(world, [balls[i]]);
}

Matter.World.add(world, [player]);

let currentBall = 0;
let framesDelta = 0;
let ballInterval = 24;

const Physics = (entities, { time }) => {
  let engine = entities["physics"].engine;
  Matter.Engine.update(engine, time.delta);
  framesDelta++;
  return entities;
};

const dropBall = (entities) => {
  if (ballInterval < framesDelta) {
    framesDelta = 0;
    if (6 < currentBall) currentBall = 0;
    entities[currentBall].color = '#' + randomColor();
    Matter.Body.setPosition(entities[currentBall].body, { x: randInt(0, width), y: -entitySize });
    currentBall++;
  }
  return entities;
}

const movePlayer = (entities) => { 

}

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
      systems={[Physics, dropBall]}
      entities={{
        physics: {
          engine: engine,
          world: world
        },
        player: {
          body: player,
          size: [entitySize, entitySize],
          color: 'red',
          renderer: Player
        },
        0: {
          body: balls[0],
          size: [entitySize, entitySize],
          color: '#' + randomColor(),
          renderer: Ball
        },
        1: {
          body: balls[1],
          size: [entitySize, entitySize],
          color: '#' + randomColor(),
          renderer: Ball
        },
        2: {
          body: balls[2],
          size: [entitySize, entitySize],
          color: '#' + randomColor(),
          renderer: Ball
        },
        3: {
          body: balls[3],
          size: [entitySize, entitySize],
          color: '#' + randomColor(),
          renderer: Ball
        },
        4: {
          body: balls[4],
          size: [entitySize, entitySize],
          color: '#' + randomColor(),
          renderer: Ball
        },
        5: {
          body: balls[5],
          size: [entitySize, entitySize],
          color: '#' + randomColor(),
          renderer: Ball
        },
        6: {
          body: balls[6],
          size: [entitySize, entitySize],
          color: '#' + randomColor(),
          renderer: Ball
        }
      }}
    >
      <StatusBar hidden={true} />
    </GameEngine >
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
