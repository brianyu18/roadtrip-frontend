import React, { Component } from 'react';
import ModalEvent from '../Components/ModalEvent'
import { Grid } from 'semantic-ui-react'
import '../App.css'


class ModalEventContainer extends Component {


  renderEvent=()=>{
    let showEvent = this.props.pictures.map(picture => {
      console.log("location data",picture)
      return <ModalEvent pictureDets={picture} />
    })
    return showEvent
  }

  render() {
    return (
      <div style={{"overflow":"scroll"}}>
      <Grid relaxed columns={3}>
        {this.renderEvent()}
      </Grid>
      </div>
    );
  }

}

export default ModalEventContainer;
