import React, { Component } from 'react';
import SideBar from '../Components/SideBar'
import SearchModal from '../Components/SearchModal'
import {Switch} from 'react-router-dom'
import { Route } from 'react-router-dom'

import ReactDOM from 'react-dom';

class AppWrapper extends Component {
  render() {
    console.log("props", this.props.match.params.id)
    return (
      <div style={{"backgroundColor":"#9868ff"}}>
        <SideBar tripID={this.props.match.params.id}/>
      </div>
    )
  }
}

export default AppWrapper;
