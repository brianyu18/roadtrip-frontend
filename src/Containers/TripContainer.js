import React, { Component } from 'react';
import { Button, Header, Icon, Image, Menu, Segment, Sidebar, Grid } from 'semantic-ui-react'
import Event from '../Components/Event'
import constant from '../constants/constant'

import Navbar from '../Components/Navbar'

import { Route, Link } from 'react-router-dom'

import ReactDOM from 'react-dom';

class TripContainer extends Component {
  state = {
    destination: '',
    trips: []
  }

  componentDidMount(){
    this.fetchTrips()
  }

  deleteTrip=(place)=>{
    fetch(`${constant.api_route}/trips/${place.id}`,{
      method: "DELETE",
      headers: {"Authorization": `Bearer ${localStorage.getItem('accessToken_roadTrip')}`}
    })
    this.setState({
      trips: this.state.trips.filter(trip => {
        return trip.id!==place.id
      })
    })
  }

  fetchTrips=()=>{
    fetch(`${constant.api_route}/trips`,{
      headers: {"Authorization": `Bearer ${localStorage.getItem('accessToken_roadTrip')}`}
    })
    .then(res => res.json())
    .then(trips => {
      console.log(trips)
      this.setState({
        trips: trips.data
      })
    })
  }

  createTrip=()=>{
    if(this.state.destination!==''){
      let data={
        destination: this.state.destination
      }
      fetch(`${constant.api_route}/trips`,{
        method: "POST",
        headers: {'Content-Type':'application/json','Authorization':`Bearer ${localStorage.getItem('accessToken_roadTrip')}`},
        body: JSON.stringify(data),
      })
      .then(res => res.json())
      .then(trip =>{
        console.log(trip)
        this.fetchTrips()
        this.setState({
          destination: ''
        })
      })
    }
  }

  changeHandler=(e)=>{
    console.log(e.target.value);
    this.setState({
      destination: e.target.value
    })
  }


  onSelect=(trip)=>{
    console.log("setnewtrip", trip);
    localStorage.setItem('destination', trip.id)
  }

  showTrips=()=>{
    let showEvent = this.state.trips.map(trip => {
      return <Event deleteTrip={this.deleteTrip} trip={trip} onSelect={this.onSelect}/>
    })
    return showEvent
  }


  render() {
    return (
      <div style={{"backgroundColor":"#6435c9","height":"100%"}}>
        <div >
        <Navbar changeHandler={this.changeHandler} destination={this.state.destination} createTrip={this.createTrip}/>
        <div style={{"width":"90%","margin":"auto","textAlign":"center","overlfow":"scroll"}}>
          <Grid relaxed columns={4}>
            {this.showTrips()}
          </Grid>
        </div>
        </div>
      </div>
    );
  }
}

export default TripContainer;
