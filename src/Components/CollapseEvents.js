import React, { Component } from 'react'
import Rate from 'antd/lib/rate';
import AntIcon from 'antd/lib/icon';
import { Accordion, Image, Icon, Rating, Button, Card, Transition, Label } from 'semantic-ui-react'
import DateChooser from './DateChooser'
import constant from '../constants/constant'


export default class CollapseEvents extends Component {
  state = {
    visible: false,
    love: this.props.singleItem.love,
    hate: this.props.singleItem.hate
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  loveThis=()=>{
    this.setState({
      love: this.state.love +=1
    },()=>this.updateLike())
  }

  hateThis=()=>{
    this.setState({
      hate: this.state.hate +=1
    })
  }

  updateLike=()=>{
    const eventData= {
      love: this.state.love,
      hate: this.state.hate
    }
    fetch(`${constant.api_route}/events/${this.props.itemID}`,{
      method: 'PATCH',
      headers: {'Content-Type':'application/json','Authorization':`Bearer ${localStorage.getItem('accessToken_roadTrip')}`},
      body: JSON.stringify(eventData)
    })
    .then(res=>res.json())
    .then(updatedEvent => {
      console.log("hey2", updatedEvent.data)
      this.setState({
        love: updatedEvent.data.attributes.love,
        hate: updatedEvent.data.attributes.hate
      })
    })
  }

  render() {
    const { activeIndex } = this.state
    const { visible } = this.state
    const key = `${process.env.REACT_APP_GET_DATA}`;
    const photo = this.props.singleItem['photo-reference']
    const image = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo}&key=${key}`


    return (
      <Accordion color="violet" styled fluid style={{"marginLeft":"1%"}}>
        <Accordion.Title >
          <Card style={{"width":"100%", "flex-direction":"row"}}>
            <div style={{"display":"inline-block", "width":"50%"}}>
              <Image style={{
                "width":"400px",
                "height":"220px",
                "display": "block",
                "margin-left": "auto",
                "margin-right": "auto",
                "width": "100%",
                "position":"relative"
              }}
               src={image}
               />
               <div style={{"position": "absolute", "bottom":"84%", "left":"94%"}}>
                 <Button icon="close" color="violet"></Button>
               </div>
            </div>
            <div style={{"display":"inline-block", "width":"50%","textAlign":"left"}}>
            <Card style={{"margin":"0 auto","width":"100%","height":"100%","marginLeft":"1px"}}>
              <Card.Content style={{"paddingBottom":"0px","textAlign":"center"}}>
                <h1 style={{'font-family':"'Baloo Thambi', cursive","color":"#4c1db3"}}>{this.props.singleItem.name}</h1>
              </Card.Content>
              <Card.Content style={{"paddingBottom":"0px"}}extra>
                <Icon color="violet" name='pin' /> {this.props.singleItem.category}<br/>
              </Card.Content>
              <Card.Content style={{"paddingBottom":"0px"}} extra>
                <Icon color="violet" name='map marker alternate' /> {this.props.singleItem.address}<br/>
              </Card.Content>
              <Card.Content style={{"paddingBottom":"0px"}} extra>
                <Icon color="violet" name='calendar check outline' /> {this.props.singleItem.date}
              </Card.Content>
              <Card.Content style={{"color":"#6435c9","paddingBottom":"7px"}} extra>
                <div style={{"display":"inline-block", "width":"50%","textAlign":"center"}}>
                  <Button onClick={this.loveThis} as='div' labelPosition='right'>
                    <Button color="green">
                      <Icon name="thumbs up outline"/>
                      Love It
                    </Button>
                    <Label as='a' basic color="green" pointing='left'>
                    {this.state.love}
                    </Label>
                  </Button>
                </div>
                <div style={{"display":"inline-block", "width":"50%","textAlign":"center"}}>
                  <Button onClick={this.hateThis} as='div' labelPosition='right'>
                    <Button color="red">
                      <Icon name="thumbs down outline"/>
                      Hate It
                    </Button>
                    <Label as='a' basic basic color="red" pointing='left'>
                    {this.state.hate}
                    </Label>
                  </Button>
                </div>
</Card.Content>
            </Card>


            </div>

          </Card>
      <Button fluid color="violet" onClick={this.toggleVisibility}>
        Details
      </Button>
        </Accordion.Title>
        <Transition visible={visible} animation='fade down' duration={500}>
        <Accordion.Content>
          <div style={{"display":"inline-block","width":"50%", "text-align":"left"}}>
            Rating: <Rate style={{"color":"red"}} character={<AntIcon type="fire" />} allowHalf disabled defaultValue={this.props.singleItem.rating} /><br/>
            Price: <Rate style={{"color":"green"}} character={<AntIcon type="dollar" />} disabled allowHalf defaultValue={this.props.singleItem.price} />
          </div>
          <div style={{"display":"inline-block","width":"50%", "text-align":"left"}}>
              <h3>Why I love it:</h3>
              {this.props.singleItem.reason}
          </div>
        </Accordion.Content>
        </Transition>
      </Accordion>
    )
  }
}
