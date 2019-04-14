import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react'

import '../App.css'


class NoEvents extends Component {

  render() {
    return (
      <div style={{"overflow-y":"scroll","paddingBottom":"50px","height":"100vh","textAlign":"center"}}>
        <h1>No events yet, click here to get started<Icon name="arrow up"/></h1>
        <Button onClick={this.props.buttonChange}>Get Started!</Button>
      </div>
    );
  }

}

export default NoEvents;
