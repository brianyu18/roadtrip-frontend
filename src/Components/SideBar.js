import React, { Component } from 'react'
import { Button, Header, Icon, Image, Menu, Segment, Sidebar, Transition } from 'semantic-ui-react'
import GoogleMapsContainer from './GoogleMapsContainer'
import ProfileButton from './ProfileButton'
import FriendFind from './FriendFind'

import '../App.css'

import MainContainer from '../Containers/MainContainer'

export default class SidebarExampleDimmed extends Component {
  state = { visible: false }

  loadFriend=()=>{
    console.log('sidebar', this.props.friendList)
    let people = this.props.friendList.map(friend => {
      console.log('name', friend.username)
      return <Menu.Item as='a'>
        <Icon name='user' />
        {friend.username}
      </Menu.Item>
    })
    return people
  }

  handleClick = () => {
    console.log(this.state.visible)
    if(this.state.visible === false){
      this.setState({
        visible: true
      })
    } else{
        this.setState({
          visible: false
        })
      }
  }
  handleHideClick = () => this.setState({ visible: false })
  handleShowClick = () => this.setState({ visible: true })
  handleSidebarHide = () => this.setState({ visible: false })

  render() {
    const { visible } = this.state

    return (
      <div style={{"height":"100vh"}}>
        <div style={{"display":"flex"}}>

          <div style={{"marginTop":"10px","marginBottom":"0px"}}>
          <Button.Group>
            <Button disabled={visible} onClick={this.handleShowClick}>
              Show Collaborators
            </Button>
            <Button.Or />
            <Button color='violet' disabled={!visible} onClick={this.handleHideClick}>
              Hide Collaborators
            </Button>
          </Button.Group>
          </div>
          <div style={{"height":"50px","width":"100px", "marginTop":"0px","marginBottom":"0px","marginLeft":"420px", "marginRight":"590px"}}>
            <Image style={{"height":"100%","width":"100%"}}src='images/RoadTrip.jpeg'/>
          </div>
          <div style={{"marginTop":"10px","marginBottom":"0px"}}>
            <ProfileButton />
          </div>
        </div>
        <Sidebar.Pushable as={Segment}>
          <Sidebar color='violet'
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={visible}
            width='thin'>
            <FriendFind />
            {this.loadFriend()}
          </Sidebar>

          <Sidebar.Pusher dimmed={visible}>
            <Segment basic>

              <MainContainer tripID={this.props.tripID}/>

            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}
