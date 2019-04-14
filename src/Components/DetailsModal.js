import React, { Component } from 'react';
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react'
import ModalEventContainer from '../Containers/ModalEventContainer'


class DetailsModal extends Component {
  state = {
    pictures: [],
    origEvents: []
  }

  componentDidMount() {
    fetch("http://localhost:3002/locations")
    .then(res => res.json())
    .then(data => this.setState({
      pictures: data.results,
      filteredEvents: data.results
    })
  )
  }

  searchEvents=(e)=>{
    let newArr = [...this.origEvents].filter(event => {
      return event[0].description.includes(e)
    })
    this.setState({
      pictures: newArr
    })
  }

  render(){
    console.log(this.props.picture);
    return(
      <div>
        <Modal trigger={<Button fluid color='violet'>Details</Button>}>
          <Modal.Header>Info</Modal.Header>
          <Modal.Content image>
            <Image style={{"height":"400px","text-align":"center"}} src={this.props.picture}/>
          </Modal.Content>
          <Modal.Actions>
          <Button animated color="violet">
            <Button.Content visible>Add</Button.Content>
            <Button.Content hidden>
              <Icon name='plus' />
            </Button.Content>
          </Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default DetailsModal
