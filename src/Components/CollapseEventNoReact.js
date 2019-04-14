import React, { Component } from 'react'
import Rate from 'antd/lib/rate';
import AntIcon from 'antd/lib/icon';
import { Accordion, Image, Icon, Rating, Button, Card, Transition } from 'semantic-ui-react'
import '../../node_modules/semantic-ui/dist/semantic.min.css'
import '../../node_modules/semantic-ui/dist/semantic.min.js'

export default class AccordionExampleStyled extends Component {

  render() {

    return (
      <div class="ui styled fluid accordion">
        <div class="title active">
        <Card style={{"width":"100%"}}>
          <div style={{"display":"inline-block", "width":"50%"}}>
            <img style={{
              "width":"400px",
              "height":"220px",
              "display": "block",
              "margin-left": "auto",
              "margin-right": "auto",
              "width": "100%",
              "position":"relative"
            }}
             src="https://images.unsplash.com/photo-1512552288940-3a300922a275?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjQ5OTMyfQ"
             />
          </div>
          <div style={{"display":"inline-block", "width":"50%"}}>
            description
          </div>

        </Card>
        </div>
        <div class="content">
          <span className='date'>Trip in July</span><br/>
          Rating: <Rate style={{"color":"red"}} character={<AntIcon type="fire" />} allowHalf disabled defaultValue={5} /><br/>
          Price: <Rate style={{"color":"green"}} character={<AntIcon type="dollar" />} disabled allowHalf defaultValue={5} />
          <h3>Description:</h3>
          <p>dog time</p>
        </div>
      </div>
    )
  }
}
