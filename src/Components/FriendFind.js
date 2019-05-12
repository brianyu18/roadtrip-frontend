import React from 'react'
import { Button, Form, Message } from 'semantic-ui-react'

const FormExampleError = () => (
  <Form error>
    <Form.Input placeholder='Name' style={{"width":"85%", "margin":"10px"}}/>
    <Button>Find</Button>
  </Form>
)

export default FormExampleError
