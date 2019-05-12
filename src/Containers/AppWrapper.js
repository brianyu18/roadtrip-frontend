import React, { Component } from 'react';
import SideBar from '../Components/SideBar'
import SearchModal from '../Components/SearchModal'
import {Switch} from 'react-router-dom'
import { Route } from 'react-router-dom'
import constant from '../constants/constant'


import ReactDOM from 'react-dom';

class AppWrapper extends Component {
  state = {
    friends: []
  }

  componentDidMount() {
    fetch(`${constant.api_route}/friends/${localStorage.getItem('destination')}}`,{
      headers: {'Authorization':`Bearer ${localStorage.getItem('accessToken_roadTrip')}`,'local':localStorage.getItem('destination')},
    })
    .then(res => res.json())
    .then(friendsData => {
      console.log("show friends",friendsData)
      this.setState({
        friends: friendsData.data
      })
    },console.log("show friends2", this.state.friends))

    .catch((error)=> {console.log("invalid login", error)})
  }

  render() {
    console.log("props", this.props.match.params.id)
    return (
      <div style={{"backgroundColor":"#9868ff"}}>
        <SideBar tripID={this.props.match.params.id} friendList={this.state.friends}/>
      </div>
    )
  }
}

export default AppWrapper;
