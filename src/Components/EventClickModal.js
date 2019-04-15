import React, { Component } from 'react';
import { Button, Header, Icon, Image, Modal, Container, Input } from 'semantic-ui-react'
import {Search} from 'semantic-ui-react'
import Rate from 'antd/lib/rate';
import AntIcon from 'antd/lib/icon';
import Carousel from 'antd/lib/carousel';
import 'antd/lib/carousel/style/index.css'
import DateChooser from './DateChooser'


class EventClickModal extends Component {

  state={
    details:[],
    modalOpen: false,
    reason: ''
  }

  componentDidMount(){
    const key = `${process.env.REACT_APP_GET_DATA}`;

    fetch(`https://roadtrip-backend.herokuapp.com/findevent?place=${this.props.info.place_id}`)
    .then(res => res.json())
    .then(details => {
      console.log("success",details);
      this.setState({
        details: details.result
      })
    })
  }

  componentDidUpdate(prevProps){
    const key = `${process.env.REACT_APP_GET_DATA}`;
    if(this.props.info === undefined || this.props.info.place_id !=prevProps.info.place_id){
      fetch(`https://roadtrip-backend.herokuapp.com/findevent?place=${this.props.info.place_id}`)
      .then(res => res.json())
      .then(details => {
        console.log("success",details);

          this.setState({
            details: details.result
          })
        })
    }
  }

  reviews=()=>{
    if(this.state.details.length !== 0){
      let showReviews = this.state.details.reviews.map(dets=>{
        console.log("details",dets)
        return <p>{dets.text}</p>
      })
    return showReviews
  }
}

imageSet=()=>{
  const key = process.env.REACT_APP_GET_DATA
  if(this.state.details.length !== 0){
    console.log("check",this.state.details);
    let images = this.state.details.photos.map(det=>{
      let ref = det.photo_reference
      return (<img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=${ref}&key=${key}`}/>)
    })
  return images
  }
}

changeReason=(e)=>{
  this.setState({
    reason: e.target.value
  })
}

handleOpen = () => this.setState({ modalOpen: true })
handleClose = () => this.setState({ modalOpen: false })

saveToBack = () =>{
  fetch('https://roadtrip-backend.herokuapp.com/events'
  )
  .then(res => res.json())
  .then(newEvent => console.log(newEvent))
}

  render(){
    return(
      <div>
        <Modal trigger={
          <Button onClick={this.handleOpen} fluid animated color="green">
            <Button.Content visible>Details</Button.Content>
            <Button.Content hidden>
              <Icon name='check' />
            </Button.Content>
          </Button>
            }
            onClose={this.handleClose}
            open={this.state.modalOpen}
            >
          <Modal.Header>
            {this.state.details.name}

          </Modal.Header>
          <Modal.Content image>
          <div style={{"width":"48%"}}>
            <div>
              <Carousel autoplay>
                {this.imageSet()}
              </Carousel>
            </div>
            <div >
              <Icon name="location arrow" />{this.state.details.formatted_address}<br/>
              <Icon name="phone" />{this.state.details.formatted_phone_number}
            </div>
          </div>
          <div style={{"width":"48%","marginLeft":"20px"}}>

            <div style={{"height":"20%"}}>
              <DateChooser dateControl={this.props.dateControl}/>
              Rating: <Rate style={{"color":"red"}} character={<AntIcon type="fire" />} allowHalf disabled defaultValue={this.props.info.rating} /><br/>
              Price: <Rate style={{"color":"green"}} character={<AntIcon type="dollar" />} disabled allowHalf defaultValue={this.props.info.price_level} />
            </div><br/>
            <div style={{"height":"75%"}} id="review-carousel">
              <Carousel>
                {this.reviews()}
              </Carousel>
            </div>
          </div>
          </Modal.Content>
          <Modal.Actions>
            <div style={{"display":"flex"}}>
            <Input style={{"display":"flex","width":"85%","marginRight":"15px","marginLeft":"15px"}} onChange={this.changeReason} value={this.state.reason} fluid icon='icon' placeholder='Why I love this...' />
            <Button onClick={()=>{
              this.handleClose()
              this.props.putInTimeline(this.state.details, this.state.reason)}
            } color="green">
            Add <Icon name='right chevron' />
            </Button>
            </div>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default EventClickModal
