import React, { Component } from 'react';
import SideBar from '../Components/SideBar'
import GoogleMapsContainer from '../Components/GoogleMapsContainer'
import EventContainer from './EventContainer'
import { Button, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'
import SearchModal from '../Components/SearchModal'
import MainContainer from './MainContainer'
import Navbar from '../Components/Navbar'
import {Switch} from 'react-router-dom'
import TripContainer from './TripContainer'
import AppWrapper from './AppWrapper'


import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import { Route } from 'react-router-dom'

import ReactDOM from 'react-dom';
import { LocaleProvider, DatePicker, Timeline, message } from 'antd';
// The default locale is en-US, but we can change it to other language
import moment from 'moment';
import 'moment/locale/fr';


UIkit.use(Icons);

class AppContainer extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/trips" component={TripContainer} />
          <Route exact path="/:id" component={AppWrapper}/>
        </Switch>
      </React.Fragment>
    );
  }
}

export default AppContainer;
