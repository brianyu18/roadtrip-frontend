import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment, Card } from 'semantic-ui-react'
import { withRouter } from 'react-router';
import constant from '../constants/constant'


class LoginForm extends Component{
  state={
    username: '',
    password: '',
    failed: false
  }

  login=()=>{
    fetch(`${constant.api_route}/login`,{
      method: "POST",
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(this.state),
    })
    .then(res => {
      if(res.ok){
        return res.json()
      } else {
        this.setState({
          failed: true
        },()=>console.log("see ham"))
        throw new Error('Invalid Login');

      }
    })
    .then(jwt =>{
      console.log(jwt)
      localStorage.setItem('accessToken_roadTrip', jwt.token)
      localStorage.setItem('user_id', jwt.user_id)
      localStorage.setItem('username', jwt.username)
      this.props.history.push('/trips')
    })
    .catch((error)=>{
      console.log("failed", error)
    })
  }

  nameHandle=(e)=>{
    this.setState({
      username: e.target.value
    })
  }

  passHandle=(e)=>{
    this.setState({
      password: e.target.value
    })
  }

  showError=()=>{
    if(this.state.failed===true){
      console.log("enter error")
    return <Message negative>
    <Message.Header>Invalid Name or Password</Message.Header>
      <p>Invalid Name or Password, please try again</p>
    </Message>
    }
  }

  render() {
    return (
      <div style={{"backgroundColor":"#6435c9"}} className='login-form'>
        {/*
          Heads up! The styles below are necessary for the correct render of this example.
          You can do same with CSS, the main idea is that all the elements up to the `Grid`
          below must have a height of 100%.
        */}
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header color='teal' textAlign='center'>
            <Card style={{'margin':'auto'}}>
              <div ><Image src='images/RoadTrip.jpeg' /></div>
            </Card>
              <div style={{"color":"#ffffff","font-family":"'Baloo Thambi', cursive","marginTop":"10px"}}>Log-in to your account</div>
            </Header>
            <Form size='large'>
              <Segment stacked>
                <Form.Input onChange={this.nameHandle} fluid icon='user' iconPosition='left' placeholder='Username' />
                <Form.Input
                  onChange={this.passHandle}
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                />
                {this.showError()}
                <Button onClick={this.login} color='violet' fluid size='large'>
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              New to us? <a href='/signup'>Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default withRouter(LoginForm)
