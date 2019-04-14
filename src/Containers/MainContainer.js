import React, { Component } from 'react';
import GoogleMapsContainer from '../Components/GoogleMapsContainer'
import MapWithASearchBox from '../Components/MapWithASearchBox'
import MapWithInfo from '../Components/MapWithInfo'
import GoogleMapsSearchBar from '../Components/GoogleMapSearchBar'
import CollapseEvents from '../Components/CollapseEvents'
import ButtonGroupMainSwitch from '../Components/ButtonGroupMainSwitch'
import moment from 'moment';

import NoEvents from '../Components/NoEvents'
import TripTimeline from '../Components/TripTimeline'
import AddEventContainer from './AddEventContainer'
import EventContainer from './EventContainer'
import ChatWindow from '../Components/ChatWindow'
import BetterConvo from '../Components/BetterConvo'
import '../App.css'

import {Marker} from "react-google-maps";

class MainContainer extends Component {
  state = {
    window:"edit",
    pictures: [],
    origEvents: [],
    focus: { lat: -34.397, lng: 150.644 },
    timeLine: [],
    searchTerm: '',
    searchCity: '',
    searchCord: { lat: null, lng: null },
    date: '',
    price: 5,
    reason: ''
  }

setPrice=(e, value)=>{
  console.log("pricd",value);
  this.setState({
    price: value
  })
}

citySearching=()=>{
  console.log("show city",this.state.searchCity);
  const search = this.state.searchTerm.split(' ').join('+')
  const city = this.state.searchCity.split(' ').join('+')

  let header = {
    'Access-Control-Allow-Origin':'*',
    'Content-Type': 'application/json'
  }

  fetch(`https://roadtrip-backend.herokuapp.com/findcord?city=${city}`,
  {'headers': header})
  .then(res => res.json())
  .then(location =>{
    console.log("see cord", location)
    console.log("find cordinate", location.results[0].geometry.location)
    this.setState({
      searchCord: location.results[0].geometry.location
    })
    this.searchTermFind()
  })
}

searchTermFind=()=>{
  console.log('sending cord',this.state.searchCord);
  console.log('searchterm find', this.state.searchTerm);

  const search = this.state.searchTerm.split(' ').join('+')
  const city = this.state.searchCity
  const cord = this.state.searchCord

  let header = {
    'Access-Control-Allow-Origin':'*',
    'Content-Type': 'application/json'
  }

  fetch(`https://roadtrip-backend.herokuapp.com/find?location=${cord.lat},${cord.lng}&search=${search}`,
  {'headers': header})
  .then(res => res.json())
  .then(locationDets=>{
    console.log('locationDets', locationDets)
    let newArr = locationDets.results.filter(location =>{
      return location.price_level <= this.state.price
    })
    this.setState({
      pictures: newArr
    })
    console.log('finalshow',this.state.pictures);
  })
}

cityControl=(e)=>{
  console.log('city', e.target.value);

  this.setState({
    searchCity: e.target.value
  })
}

searchControl=(e)=>{
  console.log('search',e.target.value);
  this.setState({
    searchTerm: e.target.value
  })
}

dateControl=(value)=>{
  console.log('date', value)
  this.setState({
    date: value
  })
}

fullFetch=()=>{
  this.citySearching()
}

componentDidMount() {

const search = this.state.searchTerm.split(' ').join('+')
const city = this.state.searchCity

fetch("https://roadtrip-backend.herokuapp.com/events",{
  headers: {'Authorization':`Bearer ${localStorage.getItem('accessToken_roadTrip')}`},
})
.then(res => res.json())
.then(events => {
  console.log("initial",events)
  let filterEvents = events.data.filter(singleEvent => {
    console.log("singleEvent",typeof singleEvent.relationships["trip-id"].data)
    console.log("tripid",typeof this.props.tripID)
    console.log("destinationid",typeof localStorage.getItem('destination'));

    return singleEvent.relationships["trip-id"].data === parseInt(this.props.tripID)
  })
  console.log('show', filterEvents)

  this.setState({
    timeLine: filterEvents,
    filteredEvents: filterEvents
    })
  })
.catch((error)=> {console.log("invalid login", error)})
}

  fakeDataFetch=()=>{
    const search = this.state.searchTerm.split(' ').join('+')
    const city = this.state.searchCity
    fetch("https://roadtrip-backend.herokuapp.com/locations")
    .then(res => res.json())
    .then(data => {
    this.setState({
      pictures: data.results,
    })
    this.setInitialMarker(data.results)
    }
  )
  console.log(this.state.pictures)
  }

  putInTimeline=(item, reason)=>{
    item["dateTime"]=moment(this.state.date).format('MM/DD/YYYY')
    item["reason"]=reason
    console.log("new key", item.types[0])
    console.log("lat", item.photos[0].photo_reference)
    let eventData ={
      name: item.name,
      address: item.formatted_address,
      phone_number: item.formatted_phone_number,
      lng: item.geometry.location.lng,
      lat: item.geometry.location.lat,
      category: item.types[0],
      date: item.dateTime,
      love: 0,
      hate: 0,
      rating: item.rating,
      price: item.price_level,
      photo_reference: item.photos[0].photo_reference,
      place_id: item.place_id,
      reason: item.reason,
      google_url: item.url,
      website: item.website,
      trip_id: localStorage.getItem('destination')
    }
    fetch('https://roadtrip-backend.herokuapp.com/events',{
      method: 'POST',
      headers: {'Content-Type':'application/json','Authorization':`Bearer ${localStorage.getItem('accessToken_roadTrip')}`},
      body: JSON.stringify(eventData)
    })
    .then(res=>res.json())
    .then(newEvent => {
      console.log("newEvent",newEvent)
      let newArr = [...this.state.timeLine]
      newArr.push(newEvent.data)
      console.log("before",newArr)
      newArr.sort((obj1, obj2)=>{
        if(obj1.attributes.date < obj2.attributes.date){
          return -1
        } else if(obj1.attributes.date  > obj2.attributes.date){
          return 1
        }
        return 0
      })
      console.log("after",newArr)
      this.setState({
        timeLine: newArr,
        date: '',
        focus: { lat: newEvent.data.attributes.lat, lng: newEvent.data.attributes.lng }
      })
      console.log("timeline", this.state.timeLine);
    })
  }


  showWindow=()=>{
    if(this.state.timeLine.length===0 && this.state.window === "edit"){
      return <NoEvents buttonChange={this.buttonChange}/>
    } else if(this.state.window === "edit" ){
      return <div style={{"marginLeft":"8px"}}>
        <EventContainer timeline={this.state.timeLine}/>
      </div>
    } else {
    return <div style={{"marginLeft":"15px"}}>
      <AddEventContainer
        pictures={this.state.pictures}
        putInTimeline={this.putInTimeline}
        timeline={this.state.timeLine}
        searchControl={this.searchControl}
        cityControl={this.cityControl}
        fullFetch={this.fullFetch}
        dateControl={this.dateControl}
        setPrice={this.setPrice}
        />
    </div>
    }
  }

  buttonChange=(e)=>{
    console.log(e.target.value);
    this.setState({
      window: e.target.value
    })
  }


  setInitialMarker=(data)=>{
    this.setState({
      focus: data[0].geometry.location
    })
    console.log("see focus",this.state.focus)
  }

  render() {
    return (
      <div style={{"display":"flex"}}>
        <div style={{"width":"25vw", "height":"100vh", "margin": "auto 0","marginRight":"15px"}}>
          <div>
            <TripTimeline timeline={this.state.timeLine}/>
          </div>
          <div style={{"width":"auto", "height":"50vh", "display":"inline"}}>
          <MapWithInfo
            focus = {this.state.focus}
            markers={this.setMarkers}
            // googleMapURL="https://maps.googleapis.com/maps/api/js?key=`${process.env.REACT_APP_API_KEY}`.exp&libraries=geometry,drawing,places"
            // loadingElement={<div style={{ height: `100%` }} />}
            // containerElement={<div style={{ height: `400px` }} />}
            // mapElement={<div style={{ height: `100%` }} />}
            timeLine={this.state.timeLine}
          />
          </div>
        </div>
        <div style={{"width":"50vw", "height":"100vh", "margin": "auto 0"}}>
          <ButtonGroupMainSwitch buttonChange={this.buttonChange}/><br/>
          {this.showWindow()}
        </div>
        <div style={{"width":"25vw", "height":"100vh", "margin": "auto 0"}}>
          <BetterConvo />
        </div>
      </div>
    );
  }

}

export default MainContainer;
