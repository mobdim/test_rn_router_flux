/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from './AppStore'
import AppNavigator from './AppNavigator'

const AppStore = configureStore()

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={AppStore}>
        <AppNavigator/>
      </Provider>
    )
  }
}