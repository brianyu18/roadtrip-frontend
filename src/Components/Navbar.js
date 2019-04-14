import React, { Component } from 'react'
import { Menu, Segment, Icon, Input, Button } from 'semantic-ui-react'
import ProfileButton from './ProfileButton'

export default class Navbar extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Segment inverted style={{"backgroundColor":"#9868ff"}}>
        <Menu style={{"backgroundColor":"#9868ff"}} inverted secondary>
          <Menu.Item
          position="left"
          name='user'
          active={activeItem === 'user'}
          onClick={this.handleItemClick}
          >
          <ProfileButton/>
          </Menu.Item>
          <Menu.Item position="right" style={{"":"#9868ff"}}>
            <Input type='text' placeholder='Create a trip!'
              defaultValue='Add New Trip...'
              value={this.props.destination}
              action>
              <input onChange={this.props.changeHandler}/>
              <Button onClick={this.props.createTrip}
                icon color="green" labelPosition='right'>
                <Icon name='plus' />
                Create
              </Button>
            </Input>
          </Menu.Item>
        </Menu>
      </Segment>
    )
  }
}
