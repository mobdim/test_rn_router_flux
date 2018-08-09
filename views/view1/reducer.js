/* @flow */

import { handleActions } from "redux-actions"
import { START_APP_ACTION } from "./action"
import { Actions } from 'react-native-router-flux'

const initialState = {}

const Reducer = handleActions({
  [START_APP_ACTION]: (state, action) => {
    Actions.view2()
    return { ...state }
  }
}, initialState)

export default Reducer