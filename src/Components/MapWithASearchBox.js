import React from "react";

const { compose, withProps, withStateHandlers } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} = require("react-google-maps");

const MapWithASearchBox = compose(
  withStateHandlers(() => ({
    isOpen: false,
  }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    })
  }),
  withScriptjs,
  withGoogleMap
)(props =>



  <GoogleMap
    defaultZoom={12}
    defaultCenter={props.focus}
  >
  {props.markers()}
    <Marker
      position={{ lat: -34.397, lng: 150.644 }}
      onClick={props.onToggleOpen}
    >
      {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
   <div>
     <h1>Hola</h1>
   </div>
      </InfoWindow>}
    </Marker>
  </GoogleMap>
);



export default MapWithASearchBox
