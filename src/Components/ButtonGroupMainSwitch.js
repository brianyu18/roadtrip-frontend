import React, { Component } from 'react'
import Rate from 'antd/lib/rate';
import AntIcon from 'antd/lib/icon';
import { Accordion, Image, Icon, Rating, Button, Card, Transition } from 'semantic-ui-react'

export default class ButtonGroupMainSwitch extends Component {
  state = { visible: false }

  handleClick = (e) => {
    this.props.buttonChange(e)
    console.log(this.state.visible)
    if(this.state.visible === false){
      this.setState({
        visible: true
      })
    } else {
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
      <div>
      <Button.Group fluid>
        <Button value="edit" color='yellow' disabled={!visible} onClick={this.handleClick}>
          Edit
        </Button>
        <Button.Or />
        <Button value="add" color='green' disabled={visible} onClick={this.handleClick}>
          Add
        </Button>
      </Button.Group>
      </div>
    )
  }
}
