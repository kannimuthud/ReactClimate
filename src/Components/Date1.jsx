import React, { Component } from 'react'
import { DatePicker } from 'antd';
import Chart from './Chart'
import parseISO from 'date-fns/parseISO'
import moment from 'moment'
import '../Style/chart.css'
const { RangePicker } = DatePicker;
class Date1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      // start:"",
      //end:""
      start: new Date().toISOString(),
      end: new Date().toISOString(),

    }
  }
  componentDidMount() {
    this.first()
  }
  onChange = (value, dateString) => {
    console.log("time",value[0]._d);
    //console.log("datestring",dateString)
    this.setState({
      start: value[0]._d.toISOString(),
      end: value[1]._d.toISOString()
    })
    console.log("onchange",this.state.start)
    //https://api-interlace.interlockgroup.sg/api/v1/data?start=2020-02-12T16:01:00.000Z&end=2020-02-18T15:03:00.000Z
  }

  handleChange = () => {
    console.log(this.state.start)
    console.log("its work")
    console.log("handlechange",this.state.start)

    var myHeaders = new Headers();
    var token = localStorage.getItem('token')
    token = JSON.parse(token)
    myHeaders.append("auth", token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://api-interlace.interlockgroup.sg/api/v1/data?start=${this.state.start}&end=${this.state.end}`, requestOptions)
      .then(response => response.json())
     //.then(response => console.log("date",response))
      .then(res => {
          this.setState({
          data: res.data
        })
        // console.log(this.state.data)
      })
      // .then(result => console.log(result.data))
      .catch(error => console.log('error', error));
  }
  first = () => {
    var token = localStorage.getItem('token')
    token = JSON.parse(token)
    //var valid=localStorage.getItem('valid')
    //console.log("value", token);
    var myHeaders = new Headers();
    myHeaders.append("auth", token);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch('https://api-interlace.interlockgroup.sg/api/v1/data', requestOptions)
      .then(response => response.json())
     // .then(response => console.log("first",response))
      .then(res => {
        this.setState({
          data: res.data
        })
      })
      .catch(error => console.log('error', error));
  }


  render() {
    console.log("state",this.state.start)
    var sound = this.state.data.map(e => e.sound);
    var temp = this.state.data.map(e => e.temp);
    var humidity = this.state.data.map(e => e.humidity);
    var light = this.state.data.map(e => e.light);
    var label1 = this.state.data.map(e => parseISO(e.polledOn));
    return (
      <div className="date">
        <RangePicker
        showTime
          allowClear={false}
          onChange={this.onChange}
          separator="-"
          name="date"
          style={{ marginRight: '20px' }}
          placeholder={['Start Data', 'End Date']}
          onOk={this.handleChange}
          defaultValue={
            [moment(new Date()).add(-1, 'days'),
            moment(new Date())]
          }
        />
        {/* <Button type="primary" icon="search" onClick={this.newdata}>
      Search
    </Button> */}
        <div className="chartposition">
          <Chart data={temp} label={label1} name="Temprature" color='#ffcd56' unit="°C" />
          <Chart data={humidity} label={label1} name="Humidity" color='#36a2eb' unit="%" />
          <Chart data={light} label={label1} name="Light" color='#ff9f40' unit="lux" />
          <Chart data={sound} label={label1} name="Sound" color='#ff6384' unit="dB" />
        </div>
        <p className="showdate">Showing data from{this.state.start} to {this.state.end}</p>
      </div>
    );
  }
}
export default Date1