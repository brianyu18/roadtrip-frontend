import React, { Component } from 'react';
import Event from '../Components/Event'
import CollapseEvents from '../Components/CollapseEvents'
import { Grid } from 'semantic-ui-react'
import '../App.css'


class EventContainer extends Component {
  state = {
    pictures: []
  }

  // componentDidMount() {
  //   fetch("http://localhost:3001/pictures")
  //   .then(res => res.json())
  //   .then(data => this.setState({
  //     pictures: data.results
  //   })
  // )
  // }

  renderEvent=()=>{
    let showEvent = this.props.timeline.map(item => {
      console.log("showitem",item);
      console.log('photo', item.attributes['photo-reference'])
      return <CollapseEvents itemID={item.id} singleItem={item.attributes} />
    })
    return showEvent
  }

  render() {
    return (
      <div style={{"overflow-y":"scroll","paddingBottom":"50px","height":"100vh"}}>
      <Grid relaxed columns={1}>
        {this.renderEvent()}
      </Grid>
      </div>
    );
  }

}

export default EventContainer;
