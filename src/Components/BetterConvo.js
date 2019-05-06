import React, { Component } from 'react';
import {  Comment, Avatar, Form, List, Input,} from 'antd';
import { Button } from 'semantic-ui-react'

import moment from 'moment';

const TextArea = Input.TextArea;

const CommentList = ({ comments, avatar }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={comment =>
      <Comment
        author={comment.user.username}
        avatar={avatar(comment)}
        content={comment.content}
        datetime={comment.created_at}
      />
    }
      // <Comment style={{"textAlign":"left"}}{...props} />}

  />
);

const Editor = ({
  onChange, onSubmit, submitting, value,
}) => (
  <div>
    <Form.Item style={{"marginTop":"10px","marginLeft":"5px"}}>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item style={{"textAlign":"center"}}>
      <Button
        style={{"marginTop":"0px","width":"300px"}}
        color="violet"
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Reply
      </Button>
    </Form.Item>
  </div>
);

export default class BetterConvo extends Component {
  state = {
    comments: [],
    submitting: false,
    value: '',
    user_id: localStorage.user_id,
    username: localStorage.username,
    messages:[],
    trip_id: localStorage.destination
  }

  componentDidMount(){
    const options = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.accessToken_roadTrip}`
      }
    }
    setInterval(
    ()=>{fetch(`https://roadtrip-backend.herokuapp.com/messages/${localStorage.destination}`, options)
    .then(res => res.json())
    .then(messages_response => {
      if(messages_response.data.messages.length > this.state.messages.length){
        this.setState({
          messages: messages_response.data.messages
        },()=>{console.log("see",this.state.messages)})
      }
    })}, 1000)
  }

  componentDidUpdate(){
    const chatWindow = document.querySelector(".message-box");
    if(chatWindow){
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
  }

  sendMessage = (comment) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.accessToken_roadTrip}`
      },
      body: JSON.stringify({
        content: comment,
        user_id: this.state.user_id,
        trip_id: this.state.trip_id
      })
    }
    console.log(options)
    fetch("https://roadtrip-backend.herokuapp.com/messages", options)
    .then(res => res.json())
    .then(message_response => {
      this.setState({
        submitting:false,
        value: '',
        messages: [...this.state.messages, message_response.data]
      })
    })

  }


  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true,
    });

    this.sendMessage(this.state.value)

    // setTimeout(() => {
    //   this.setState({
    //     submitting: false,
    //     value: '',
    //     comments: [
    //       {
    //         author: this.state.messages.user.username,
    //         avatar: 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg',
    //         content: <p>{this.state.messages.user.username}</p>,
    //         datetime: moment().fromNow(),
    //       },
    //       ...this.state.comments,
    //     ],
    //   });
    // }, 1000);
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  }

  avatar = (comment) => {
    return "http://profilepicturesdp.com/wp-content/uploads/2018/06/avatar-profile-pictures-1.png' : 'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-eskimo-girl.png"
  }

  // showMessage=()=>{
  //   let messageArr = this.state.messages.map(message=>{
  //     return <Comment
  //       actions={item.actions}
  //       author={item.author}
  //       avatar={item.avatar}
  //       content={item.content}
  //       datetime={item.datetime}
  //     />
  //   })
  // }
  render() {
    const { comments, submitting, value } = this.state;

    return (
      <div >
        <div className={"message-box"} style={{"overflow":"scroll","height":"70vh","marginLeft":"10px"}}>
        {this.state.messages.length > 0 && <CommentList comments={this.state.messages} avatar={this.avatar}/>}
        </div>
          <Editor
            type={"submit"}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
            submitting={submitting}
            value={value}
          />

      </div>
    );
  }
}
