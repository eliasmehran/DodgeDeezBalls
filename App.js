import { StatusBar, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Matter, { Body } from "matter-js";
import { GameEngine } from "react-native-game-engine";
import Player from './Player';
import Ball from './Ball';
import { Gyroscope, Accelerometer } from 'expo-sensors';
import { useState, useEffect } from 'react';

const engine = Matter.Engine.create({ enableSleeping: false });
const world = engine.world;
const gravity = world.gravity;

const randInt = (min, max) => { return Math.floor(Math.random() * (max - min + 1) + min) - 1; };
const randomColor = () => { return Math.floor(Math.random() * 16777215).toString(16); }
function round(n) { return Math.floor(n * 100) / 100; }

const { width, height } = Dimensions.get("screen");
const entitySize = Math.trunc(Math.max(width, height) * 0.03);

let player = Matter.Bodies.trapezoid(width / 2, height / 5 * 3, entitySize, entitySize, 1);
let balls = [];
for (let i = 0; i < 16; i++) {
  let ball = Matter.Bodies.circle(width / 8 * i + 1, -height * i, entitySize / 2., { frictionAir: 0.025, restitution: 1.0 });
  balls.push(ball);
  Matter.World.add(world, [balls[i]]);
}

const reset = () => {
  player = Matter.Bodies.trapezoid(width / 2, height / 5 * 3, entitySize, entitySize, 1);
 balls = [];
for (let i = 0; i < 16; i++) {
  let ball = Matter.Bodies.circle(width / 8 * i + 1, -height * i, entitySize / 2., { frictionAir: 0.025, restitution: 1.0 });
  balls.push(ball);
  Matter.World.add(world, [balls[i]]);
}
}

Matter.World.add(world, [player]);

let currentBall = 0;
let framesDelta = 0;
const ballInterval = 12;
let tilt = 0;
const speed = 15;

const Physics = (entities, { time }) => {
  let engine = entities["physics"].engine;
  Matter.Engine.update(engine, time.delta);
  framesDelta++;
  return entities;
};

const dropBall = (entities) => {
  if (ballInterval < framesDelta) {
    framesDelta = 0;
    if (15 < currentBall) currentBall = 0;
    entities[currentBall].color = '#' + randomColor();
    Matter.Body.setPosition(entities[currentBall].body, { x: randInt(0, width), y: -entitySize });
    currentBall++;
  }
  return entities;
}

const movePlayer = (entities) => {
  Body.applyForce(entities["player"].body, entities["player"].body.position, {
    x: -gravity.x * gravity.scale * entities["player"].body.mass,
    y: -gravity.y * gravity.scale * entities["player"].body.mass
  });
  Matter.Body.setVelocity(entities["player"].body, { x: -tilt * speed, y: 0 });

  return entities;
}

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Dodge Balls!</Text>
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => {
          navigation.navigate('Game');
        }}
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
      systems={[Physics, dropBall, movePlayer]}
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
        },
        7: {
          body: balls[7],
          size: [entitySize, entitySize],
          color: '#' + randomColor(),
          renderer: Ball
        },
        8: {
          body: balls[8],
          size: [entitySize, entitySize],
          color: '#' + randomColor(),
          renderer: Ball
        },
        9: {
          body: balls[9],
          size: [entitySize, entitySize],
          color: '#' + randomColor(),
          renderer: Ball
        },
        10: {
          body: balls[10],
          size: [entitySize, entitySize],
          color: '#' + randomColor(),
          renderer: Ball
        },
        11: {
          body: balls[11],
          size: [entitySize, entitySize],
          color: '#' + randomColor(),
          renderer: Ball
        },
        12: {
          body: balls[12],
          size: [entitySize, entitySize],
          color: '#' + randomColor(),
          renderer: Ball
        },
        13: {
          body: balls[13],
          size: [entitySize, entitySize],
          color: '#' + randomColor(),
          renderer: Ball
        },
        14: {
          body: balls[14],
          size: [entitySize, entitySize],
          color: '#' + randomColor(),
          renderer: Ball
        },
        15: {
          body: balls[15],
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
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);

  const _slow = () => {
    Accelerometer.setUpdateInterval(1000);
  };

  const _fast = () => {
    Accelerometer.setUpdateInterval(16);
  };

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener(accelerometerData => {
        setData(accelerometerData);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  tilt = data.x;

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
