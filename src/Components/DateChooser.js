import React, { Component } from 'react'
import DatePicker from 'antd/lib/date-picker';
import locale from 'antd/lib/date-picker/locale/en_US';
import moment from 'moment';
import 'moment/min/locales';




function onOk(value) {
  console.log('onOk: ', value);
}

export default class DateChooser extends Component {

  onChange=(value, dateString)=>{
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
    this.props.dateControl(value)
  }

  render(){
    return(
  <div>
    <DatePicker
      showTime
      format="MM-DD-YYYY HH:mm"
      placeholder="Select Time & Date"
      onChange={this.onChange}
      onOk={onOk}
      locale={moment.locale("en")}
    />

  </div>
)
}
}
