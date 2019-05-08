import React from 'react'
import SearchModal from './SearchModal'
import Rate from 'antd/lib/rate';
import AntIcon from 'antd/lib/icon';
import { Button, Card, Icon, Image, Grid } from 'semantic-ui-react'
import DetailsModal from './DetailsModal'
import DateChooser from './DateChooser'
import { Route, Link } from 'react-router-dom'


const Event = (props) => (
  <Grid.Column style={{"marginTop":"40px", "marginBottom":"20px"}}>
    <Card raised style={{"margin":"auto"}}>
      <Card.Content>
        <h3 style={{"color":"#6435c9"}}>{props.trip.destination}</h3>
      </Card.Content>
      <Link to={`/${props.trip.id}`} onClick={()=>props.onSelect(props.trip)}>

      <Image style={{"height":"200px"}} src="https://images.unsplash.com/photo-1484544808355-8ec84e534d75?ixlib=rb-1.2.1&auto=format&fit=crop&w=1966&q=80" />
      </Link>
      <Card.Content style={{"color":"#6435c9"}} extra>
        <Icon name='user' />
        4 Collaborators</Card.Content>
        <Button onClick={()=>props.deleteTrip(props.trip)} fluid color="yellow" animated='vertical'>
          <Button.Content visible >Delete</Button.Content>
          <Button.Content hidden >
            <Icon name='trash alternate outline' />
          </Button.Content>
        </Button>
    </Card>
  </Grid.Column>
)

export default Event
