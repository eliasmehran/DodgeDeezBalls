import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { array, string, object } from 'prop-types';

export default class Player extends Component {
    render() {
        const width = this.props.size[0];
        const height = this.props.size[1];
        const x = this.props.body.position.x - width / 2;
        const y = this.props.body.position.y - height / 2;

        const styles = StyleSheet.create({
            player: {
                position: 'absolute',
                left: x,
                top: y,
                width: 0,
                height: 0,
                backgroundColor: 'transparent',
                borderStyle: 'solid',
                borderLeftWidth: height / 2,
                borderRightWidth: height / 2,
                borderBottomWidth: width,
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: this.props.color || 'red'
            }
        })

        return (
            <View style={styles.player} />
        );s
    }
}

Player.propTypes = {
    size: array,
    body: object, 
    color: string
}