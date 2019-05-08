import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment, Card } from 'semantic-ui-react'
import { withRouter } from 'react-router';
import constant from '../constants/constant'


class RegisterForm extends Component{
  state={
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: ''
  }

  register=()=>{
    fetch(`${constant.api_route}/users`,{
      method: "POST",
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(this.state),
    })
    .then(res => {
      if(res.ok){
        return res.json()
      } else {
        throw new Error('Invalid Login');
      }
    })
    .then(jwt =>{
      console.log(jwt)
      localStorage.setItem('access', jwt.token)
      this.props.history.push('/trips')
    })
    .catch((error)=>{
      console.log("failed", error)
    })
  }

  usernameHandle=(e)=>{
    this.setState({
      username: e.target.value
    })
  }

  passHandle=(e)=>{
    this.setState({
      password: e.target.value
    })
  }

  firstHandle=(e)=>{
    this.setState({
      firstname: e.target.value
    })
  }

  lastHandle=(e)=>{
    this.setState({
      lastname: e.target.value
    })
  }

  emailHandle=(e)=>{
    this.setState({
      email: e.target.value
    })
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
              <div style={{"color":"#ffffff","font-family":"'Baloo Thambi', cursive","marginTop":"10px"}}>Create A New Account</div>
            </Header>
            <Form size='large'>
              <Segment stacked>
                <Form.Input onChange={this.usernameHandle} fluid icon='user' iconPosition='left' placeholder='Username' />
                <Form.Input
                  onChange={this.passHandle}
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                />
                <div style={{"display":"flex"}}>
                <Form.Input onChange={this.firstHandle} style={{"width":"95%","right":"5px"}} icon='user circle outline' iconPosition='left' placeholder='First Name' />
                <Form.Input onChange={this.lastHandle} style={{"width":"95%","right":"5px"}} icon='user circle outline' iconPosition='left' placeholder='Last Name' />
                </div>
                <Form.Input onChange={this.emailHandle} fluid icon='envelope outline' iconPosition='left' placeholder='Email' />


                <Button onClick={this.register} color='violet' fluid size='large'>
                  Sign Up
                </Button>
              </Segment>
            </Form>
            <Message>
              Already have an account? <a href='/'>Login</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default withRouter(RegisterForm)
