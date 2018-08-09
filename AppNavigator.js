/* @flow */

import React, { Component } from 'react'

import { Actions, Router, Scene, Reducer, Modal } from 'react-native-router-flux'


import View1Screen from './views/view1'
import View2Screen from './views/view2'


const reducerCreate = params => {
  const defaultReducer = Reducer(params)
  return (state, action) => {
    if (__DEV__) {
      if (action.type == 'REACT_NATIVE_ROUTER_FLUX_FOCUS') {
        console.log("ROUTER ACTION: ", action)
      }
    }

    return defaultReducer(state, action)
  }
}

const scenes = Actions.create(
  <Scene>
    <Scene key="view1" component={View1Screen} initial/>
    <Scene key="view2" component={View2Screen}/>
  </Scene>
)


export default class AppNavigator extends Component {
  render() {
    return (
      <Router key="root" createReducer={reducerCreate} scenes={scenes}/>
    )
  }
}