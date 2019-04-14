import React, { Component } from 'react';
import Timeline from 'antd/lib/timeline';
import { Container, Divider, Icon } from 'semantic-ui-react';
import moment from 'moment';


import '../App.css';


class TripTimeline extends Component {

  showLine=()=>{
    console.log("show timeline", this.props.timeline);
    let show = this.props.timeline.sort((obj1, obj2)=>{
      if(obj1.attributes.date < obj2.attributes.date){
        return -1
      } else if(obj1.attributes.date  > obj2.attributes.date){
        return 1
      }
      return 0
    })
    show = show.map(time=>{
      console.log("show time",time)
      return <Timeline.Item color="#6435c9">
        <div style={{"width":"90%", "display":"flex"}}>
          <div style={{"width":"50%", "margin":"auto 0"}}>{time.attributes.name}</div>
          <div style={{"width":"50%", "textAlign":"right","margin":"auto 0"}}>
            <Icon color="violet" name="calendar alternate outline"/>
            {time.attributes.date}
          </div>
        </div>
      </Timeline.Item>
    })
    return show
  }

  render() {
    return (
      <div style={{"text-align":"left","marginTop":"20px","width":"350px","height":"40vh","overflow":"scroll"}}>
        <Container>
          <b><h1>Itinerary</h1></b>
        </Container>
          <Divider />
        <Container>
            <Timeline>
              {this.showLine()}
            </Timeline>

        </Container>
      </div>
    );
  }

}

export default TripTimeline;
