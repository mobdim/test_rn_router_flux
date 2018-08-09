/* @flow */
import React from 'react'
import View1 from './view'
import { start_app_action } from './action'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    onAppStart: () => {
      dispatch(start_app_action())
    }
  }
}

const View1Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(View1)

export default View1Container