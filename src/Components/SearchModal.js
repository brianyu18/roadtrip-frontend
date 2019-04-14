import React, { Component } from 'react';
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react'
import {Search} from 'semantic-ui-react'
import ModalEventContainer from '../Containers/ModalEventContainer'

class SearchModal extends Component {
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
    return(
      <div>
        <Modal trigger={<Button style={{"position":"fixed","top":"90%","right":"28%"}} circular size="massive" icon="plus" color='violet'></Button>}>
        <div style={{"margin":"auto","width":"100%"}}>
          <Search fluid onChange={(e)=>this.searchEvents}/>
        </div>
          <Modal.Header>
            Results
  
          </Modal.Header>
          <Modal.Content image>
            <ModalEventContainer pictures={this.state.pictures}/>
          </Modal.Content>
          <Modal.Actions>
            <Button primary>
              Proceed <Icon name='right chevron' />
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default SearchModal
