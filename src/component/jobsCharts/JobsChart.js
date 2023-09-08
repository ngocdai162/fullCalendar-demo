import { DoughnutChart } from "../doughnutChart/DoughnutChart";
import {jobsApi} from './jobsApi'
import './chartStyle.css';
// import { useEffect, useRef } from "react";

// 
export const JobsChart = ()=> {
    const {total, data : jobsData} = jobsApi;
    
    const config = {
        type: 'doughnut',
        data: {
          labels: jobsData.map(row => row.status),
          datasets: [
            {
              label: 'Chart',
              data: jobsData.map(row => row.percent),
              backgroundColor: jobsData.map(item => item.color)
            }
          ]
        }
    }

    const renderInfo = (info) => {
      const {status, percent, value, color} =  info;
      return (
          <div className="info-block">
            <span style={{color: color}}>{status}</span>
            <span className="percent-info">{percent}</span>
            <span className="value-info">{value}</span>
          </div>
      )
    }
    
    return (
        <div className='jobs-chart'>
          <div className='jobs-chart__info'>
            <h1>{total}</h1>
            {jobsData.map((item, index) => renderInfo(item))}
          </div>
          <div className='jobs-chart__draw'>
            <DoughnutChart config={config}/>
          </div>
        </div>
        
    )
}