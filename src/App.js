import React, { Component } from 'react';
import LoginForm from './Components/LoginForm'
import AppContainer from './Containers/AppContainer'
import RegisterForm from './Components/RegisterForm'
import { Button, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';


import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

import ReactDOM from 'react-dom';
import { LocaleProvider, DatePicker, Timeline, message } from 'antd';
// The default locale is en-US, but we can change it to other language
import moment from 'moment';
import 'moment/locale/fr';


UIkit.use(Icons);

class App extends Component {

  checkAuth=()=>{
    if(localStorage.getItem('accessToken_roadTrip')){
      return <AppContainer />
    } else {
      return <LoginForm/>
    }
  }

  render() {
    return(
      <Router>
        <React.Fragment>
          <Switch>
            <Route exact path="/signup" component={RegisterForm} />
            <Route path="/" render={()=>this.checkAuth()} />
          </Switch>
        </React.Fragment>
      </Router>)
  }
}

export default withRouter(App);
