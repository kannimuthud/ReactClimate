import React, { Component } from 'react'
import parseISO from 'date-fns/parseISO'
import Date1 from './Date1'
import Auth from './Auth'
import Data from './Data'
import '../Style/Welcome.css'
import { Layout, Menu, Icon,Button } from 'antd';
import 'antd/dist/antd.css';
import Chart from './Chart'
const { Header, Content, Footer, Sider } = Layout;
class Welcome extends Component {
    state = {
        collapsed: false,
        avg:{},
        data:[]
    };
    componentDidMount() {
        this.avg()
        this.data()
    }
    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    data = () => {
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
          .then(res => {
            this.setState({
              data:res.data
            })
          })
          .catch(error => console.log('error', error));
  }
    avg = () => {
        var token = localStorage.getItem('token')
        token = JSON.parse(token)
        var myHeaders = new Headers();
        myHeaders.append("auth", token);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch('https://api-interlace.interlockgroup.sg/api/v1/data/avg', requestOptions)
            .then(response => response.json())
            .then(res => {
              this.setState({
                avg:res.data,
                ac:res.status
              })
            })
            .catch(error => console.log('error', error));
    }
    logout = () => {
        Auth.isLogOut();
        localStorage.clear();
        this.props.history.push("/");
    }

    render() {
      // var sound=this.state.data.map(e => e.sound);
      // var temp=this.state.data.map(e => e.temp);
      // var humidity=this.state.data.map(e => e.humidity);
      // var light=this.state.data.map(e => e.light);
      // var label1=this.state.data.map(e => parseISO(e.polledOn));
        return (
            <div>
                <Layout style={{ minHeight: '100vh' }}>
                <Button  className="button" type="danger" onClick={this.logout}>LogOut</Button>

        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div> <img src="https://interlockgroup.sg/assets/logo/interlock_logo.png"  className="logo" alt="" /></div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>Dashboard</span>
            </Menu.Item>
            
          </Menu>
         
        </Sider>
        <Layout> 
          <Header style={{ background: '#fff', padding: 0 }} ><h1 style={{textAlign:'center'}}>Report</h1></Header>
          <Content style={{ marginRight: '50px',marginBottom:'-20px'}}>
            <h1 className="headerh1" >Last 24 hours average</h1>
            <div className="dataposition">
            <Data temp={this.state.avg.temp}  name="Temperature" unit="°C"/>
            <Data  temp={this.state.avg.humidity} name="Humidity" unit="%"/>
            <Data  temp={this.state.avg.light} name="Light" unit="lux"/>
            <Data  temp={this.state.avg.sound} name="Sound" unit="dB"/>
            <div>{this.state.ac ? <h1  className="acstatus">Fan control Unit<br/> ON</h1>:<h1  className="acstatus">Fan control Unit <br/>OFF</h1>}</div>

            </div>
            <Date1 />
            {/* <div className="chartposition">
            <Chart data={temp}  label={label1} name="Temprature" color='#ffcd56' unit="°C"/>
            <Chart data={humidity}  label={label1} name="Humidity" color='#36a2eb' unit="%"/>
            <Chart data={light}  label={label1} name="Light" color='#ff9f40' unit="lux"/>
            <Chart data={sound}  label={label1} name="Sound" color='#ff6384'  unit="dB" />
            </div> */}
          </Content>
          
          <Footer className="footer">DotWorld</Footer>
        </Layout>
      </Layout>
      
            </div>
        );
    }
}
export default Welcome