import React from 'react'
import { Button, Header, Icon, Segment } from 'semantic-ui-react'

const NoSearchItems = () => (
  <div style={{"textAlign":"center","width":"100%"}}>
  <Segment fluid placeholder>
    <Header icon>
      <Icon name='search' />
      No matches here.
    </Header>

  </Segment>
  </div>
)

export default NoSearchItems
