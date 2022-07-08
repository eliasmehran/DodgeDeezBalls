import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { array, string, object } from 'prop-types';

export default class Ball extends Component {
    render() {
        const width = this.props.size[0];
        const height = this.props.size[1];
        const x = this.props.body.position.x - width / 2;
        const y = this.props.body.position.y - height / 2;

        const styles = StyleSheet.create({
            ball: {
                position: 'absolute',
                left: x,
                top: y,
                width: width,
                height: height,
                borderRadius: width / 2,
                backgroundColor: this.props.color || 'red'
            }
        })

        return (
            <View style={styles.ball} />
        );
    }
}

Ball.propTypes = {
    size: array,
    body: object, 
    color: string
}