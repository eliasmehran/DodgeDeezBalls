import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { array, number } from 'prop-types';

export default class Ball extends Component {
    render() {
        const size = this.props.size
        const x = this.props.position[0] - size / 2;
        const y = this.props.position[1] - size / 2;

        const styles = StyleSheet.create({
            ball: {
                position: 'absolute',
                left: x,
                top: y,
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor: 'red'
            },
            playerCenter: {
                position: 'absolute',
                left: x + size / 2,
                top: y + size / 2,
                width: 1,
                height: 1,
                backgroundColor: 'cyan'
            }
        })

        return (
            <View>
            <View style={styles.ball} />
            <View style={styles.playerCenter}></View>
            </View>
        );
    }
}

Ball.propTypes = {
    size: number,
    position: array
}