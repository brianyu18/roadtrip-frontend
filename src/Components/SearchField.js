import React from 'react'
import { Button, Select, Input } from 'semantic-ui-react'

const options = [
  { key: 'all', text: 'All', value: 'all', style:{'color':'#6435c9'}},
  { key: 'landmarks', text: 'Landmarks', value: 'landmarks', style:{'color':'#6435c9'} },
  { key: 'hotels', text: 'Hotels', value: 'hotels', style:{'color':'#6435c9'} },
  { key: 'restaurants', text: 'Restaurants', value: 'restaurants', style:{'color':'#6435c9'} },
  { key: 'shopping', text: 'Shopping', value: 'restaurants', style:{'color':'#6435c9'} },

]

const rating = [
  { key: 'all', text: 'All', value: 'all', style:{'color':'#6435c9'}},
  { key: 'landmarks', text: 'Landmarks', value: 'landmarks', style:{'color':'#6435c9'} },
  { key: 'hotels', text: 'Hotels', value: 'hotels', style:{'color':'#6435c9'} },
  { key: 'restaurants', text: 'Restaurants', value: 'restaurants', style:{'color':'#6435c9'} },
]

const price = [
  { key: '0', text: 'All', value: '0', style:{'color':'#6435c9'}},
  { key: '1', text: '$', value: '1', style:{'color':'#6435c9'} },
  { key: '2', text: '$$', value: '2', style:{'color':'#6435c9'} },
  { key: '3', text: '$$$', value: '3', style:{'color':'#6435c9'} },
  { key: '4', text: '$$$$', value: '4', style:{'color':'#6435c9'} },
  { key: '5', text: '$$$$$', value: '5', style:{'color':'#6435c9'} }
]

const clicking=(props)=>{
  props.setLoading(true)
  props.fullFetch()
}

const InputExampleActions = (props) => (
  <Input style={{"width":"600px"}} type='text' placeholder='Search...' action>
    <input onChange={(e) => props.searchControl(e)}/>
    <input placeholder="City..." onChange={(e) => props.cityControl(e)}/>
    <Button onClick={()=>{clicking(props)}} color="violet" type='submit'>Search</Button>
  </Input>
)

export default InputExampleActions
