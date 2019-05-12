import React, { Component } from 'react';
import Rate from 'antd/lib/rate';
import AntIcon from 'antd/lib/icon';
import { Button, Card, Icon, Image, Grid } from 'semantic-ui-react'
import EventClickModal from './EventClickModal'


export default class ModalEvent extends Component {

showPrice = (price) => {
  let dollar = ("$").repeat(price)
  return dollar
}

buttonControl=()=>{
  console.log("checkthis", this.props.singleEvent)
  console.log("checktimeline", this.props.timeline);
  const key = `${process.env.REACT_APP_GET_DATA}`;
  const photo = this.props.singleEvent.photos[0].photo_reference
  const image = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo}&key=${key}`

  let showButton = null
  for(let i=0; i < this.props.timeline.length; i++){
    console.log("show", showButton);
    console.log("single",this.props.timeline[0].attributes["place-id"]);
    console.log("look here", this.props.singleEvent);
    if(this.props.timeline[i].attributes["place-id"] === this.props.singleEvent.place_id){
      showButton=
      <Button disabled fluid color="green" content="Added" icon="check">
      </Button>
      console.log("button here", showButton);
      break
    }
  }
  if(showButton === null){
    showButton=<EventClickModal image={image} info={this.props.singleEvent} putInTimeline={this.props.putInTimeline} dateControl={this.props.dateControl}/>
  }
  return showButton
}

render(){
  console.log("checkthis", this.props.singleEvent)
  console.log("checktimeline", this.props.timeline);

  const key = `${process.env.REACT_APP_GET_DATA}`;
  const photo = this.props.singleEvent.photos[0].photo_reference
  const image = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo}&key=${key}`

  return (
    <Grid.Column>
    <Card color='violet'>
      <Image style={{
        "width":"200px",
        "height":"160px",
        "display": "block",
        "margin-left": "auto",
        "margin-right": "auto",
        "width": "100%",
      }}
        src={image}/>
        <Card.Content>
        <Card.Header>{this.props.singleEvent.name}</Card.Header>
        <Card.Meta style={{"margin":"auto"}}>
          Rating: <Rate style={{"color":"red"}} character={<AntIcon type="fire" />} allowHalf disabled value={this.props.singleEvent.rating} /><br/>
          Price: <Rate style={{"color":"green"}} character={<AntIcon type="dollar" />} disabled allowHalf value={this.props.singleEvent.price_level} />
        </Card.Meta>
        <Card.Description>{this.props.singleEvent.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
      {this.buttonControl()}
      </Card.Content>
    </Card>
    </Grid.Column>
)}
}
