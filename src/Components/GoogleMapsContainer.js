import React from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import SearchBox from "react-google-maps/lib/components/places/SearchBox";

class GoogleMapsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      userLocation: { lat: 39.648209, lng: -75.711185 },
      loading: true
    }
    // binding this to event-handler functions
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  onMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  componentDidMount(props) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          console.log(latitude, longitude)

          this.setState({
            userLocation: { lat: latitude, lng: longitude },
            loading: false
          }, console.log(this.state.userLocation));
        },
        () => {
          this.setState({ loading: false });
        }
      );
    }

    markerList = () =>{
      this.props.markers.map(marker=>{
          console.log("show", marker.geometry.location)
          return <Marker position={marker.geometry.location} />
      })
    }

  render() {
    const { loading, userLocation } = this.state;
    console.log("new coords", loading, userLocation);


    const style = {
      width: '22vw',
      height: '55vh',

      'marginRight': 'auto'
    }
    return (
      (props =>
      <Map
        item
        xs = { 12 }
        style = { style }
        google = { this.props.google }
        onClick = { this.onMapClick }
        zoom = { 6 }
        initialCenter = {userLocation}
      >
      <SearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={props.onPlacesChanged}
      >
        <input
          type="text"
          placeholder="Customized your placeholder"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            marginTop: `27px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
          }}
        />
      </SearchBox>

        <Marker
          onClick = { this.onMarkerClick }
          title = { 'Changing Colors Garage' }
          position = {{ lat: 39.648209, lng: -75.711185 }}
          name = { 'Changing Colors Garage' }
        />

        <Marker
          onClick = { this.onMarkerClick }
          title = { 'Changing Colors Garage' }
          position = {{ lat: 40, lng: -76 }}
          name = { 'Changing Colors Garage' }
        />

        <InfoWindow
          marker = { this.state.activeMarker }
          visible = { this.state.showingInfoWindow }
        >
        </InfoWindow>
      </Map>
    )
    );
  }
}
export default GoogleApiWrapper({
    apiKey: `${process.env.REACT_APP_API_KEY}`
})(GoogleMapsContainer)
