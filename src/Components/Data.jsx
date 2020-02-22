import React from 'react'
import '../Style/chart.css'
import { Card, Col, Row } from 'antd';
class Data extends React.Component{
    render(){
        var temp=this.props.temp
        var name=this.props.name
        var unit=this.props.unit
        return(
            <div style={{padding: '15px',width:'80%' }}>
            <Row gutter={0}>
              <Col span={400}>
                <Card title={name} bordered={false}>
                  {temp}{unit}
                </Card>
              </Col>
            </Row>
          </div>
        );
    }
}
export default Data