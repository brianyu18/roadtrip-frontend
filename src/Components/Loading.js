import React from 'react'
import { Button, Header, Icon, Segment, Image, Dimmer, Loader } from 'semantic-ui-react'

const NoSearchItems = () => (
  <div style={{"textAlign":"center","width":"100%"}}>
  <Segment fluid placeholder>
      <Dimmer active inverted>
        <Loader size='massive'>Loading</Loader>
      </Dimmer>

      <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
      <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
      <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
    </Segment>
  </div>
)

export default NoSearchItems
