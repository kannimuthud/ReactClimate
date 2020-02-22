import React, { Component } from 'react'
import {Line} from 'react-chartjs-2'
import '../Style/chart.css'
class Chart extends Component {
   
    render() {
       // var time=this.props.label.map(e => e.slice(11,13));
        let state={
            chartData:{
                labels:this.props.label,
                //laebls:time,
                datasets:[
                    {   
                        label:this.props.name,
                        data:this.props.data,
                        lineThickness: 3,
                        pointRadius:0,
                        borderWidth:0,
                        lineTension: 0.1,
                        backgroundColor:this.props.color,
                        borderColor:this.props.color
                    }
                ]
                  
            }
            
        }
        return (
            <div className="line">
                <Line
                    data={state.chartData}
                    width={500}
                    height={320}
                    paddingTop={30}
                    options={{
                        scales: {
                        yAxes: [{
                          scaleLabel: {
                            display: true,
                            labelString:this.props.unit
                          }
                        }],
                        xAxes: [{
                            type: 'time',
                            time: {
                                unit: 'hour'
                            },
                            scaleLabel: {
                                display: true,
                                labelString:"Time"
                              }
                        }],
                      }
                      }}

                />
            </div>
        );
    }
}
export default Chart