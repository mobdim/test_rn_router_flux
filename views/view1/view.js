/* @flow */

import React, { Component } from 'react'

import {
  View, Text, TouchableOpacity
} from 'react-native'


export default class View1 extends Component {
  componentWillMount() {

    const {
      onAppStart,
    } = this.props

    onAppStart()
  }

  render() {
    const {
      onAppStart,
    } = this.props
    return (
      <View>
        <Text>View1</Text>
        <TouchableOpacity onPress={() => onAppStart()}>
          <Text style={{color: 'blue'}}>go to View2</Text>
        </TouchableOpacity>
      </View>
    )
  }
}