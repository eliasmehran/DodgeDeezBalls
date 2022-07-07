import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { array, number } from 'prop-types';

export default class Player extends Component {
    render() {
        const size = this.props.size
        const x = this.props.position[0] - size;
        const y = this.props.position[1] - size;

        const styles = StyleSheet.create({
            player: {
                position: 'absolute',
                left: x,
                top: y,
                width: 0,
                height: 0,
                backgroundColor: 'transparent',
                borderStyle: 'solid',
                borderLeftWidth: size,
                borderRightWidth: size,
                borderBottomWidth: size * 2,
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: 'red'
            },
            playerCenter: {
                position: 'absolute',
                left: x + size,
                top: y + size,
                width: 1,
                height: 1,
                backgroundColor: 'cyan'
            }
        })

        return (
            <View>
                <View style={styles.player} />
                <View style={styles.playerCenter} />
            </View>
        );
    }
}

Player.propTypes = {
    size: number,
    position: array
}