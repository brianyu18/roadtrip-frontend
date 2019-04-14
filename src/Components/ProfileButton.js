import React from 'react'
import { Button, Popup, Icon, Image} from 'semantic-ui-react'
import { Route, Link } from 'react-router-dom'

function avatar(){
  return 'http://profilepicturesdp.com/wp-content/uploads/2018/06/avatar-profile-pictures-1.png'
}

const ProfileButton = () => (
  <Popup trigger={<Button color="violet"><Icon style={{"margin":"auto"}} size="large" name="user in circle outline" /></Button> }
      header={<Image style={{"textAlign":"center"}} src={avatar()} size='small' circular />}
      content={
        <div style={{"textAlign":"center","marginTop":"10px"}}>
          <p>Welcome Back</p>
          <h3>{localStorage.username}</h3>
          <div style={{"marginBottom":"10px"}}>
          <Link to='/trips' onClick={()=>localStorage.removeItem('destination')}>
            <Button style={{"width":"100%"}}color='orange' content='Change Trip'/>
          </Link>
          </div>
          <div style={{"margin":"auto"}}>
          <Link to='/' onClick={()=>localStorage.removeItem('accessToken_roadTrip','username','user_id')}>
            <Button style={{"width":"100%"}}color='red' content='Sign Out'/>
          </Link>
          </div>
        </div>
        }


      on='click'
      position='bottom center'  />
)

export default ProfileButton
