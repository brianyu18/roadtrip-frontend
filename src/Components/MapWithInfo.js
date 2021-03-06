import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapWithInfo extends Component {

    state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    focus: this.props.focus
  };

  setMarkers=()=>{
    console.log("starting", this.props.timeLine)
    let arr = this.props.timeLine.map(mark=>{
      console.log("mark",parseFloat(mark.attributes.lat));
      return <Marker
        title={mark.attributes.name}
        id={this.props.timeLine.id}
        position={{ lat: parseFloat(mark.attributes.lat), lng: parseFloat(mark.attributes.lng) }}
        onClick={this.onMarkerClick}
        name={
          mark.attributes.name
        }
        >
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
        </Marker>
    })
    console.log("show me",arr);
    return arr
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {
    return (
      <Map
         google={this.props.google}
         style={{'width':'25%'}}
         center={
           this.state.focus
         }
         zoom={15}
         onClick={this.onMapClicked}
       >
       {this.setMarkers()}
        <Marker
          onClick={this.onMarkerClick}
          name={'Current location'}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GET_DATA
})(MapWithInfo)
