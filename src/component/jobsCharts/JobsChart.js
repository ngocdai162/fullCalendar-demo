import { DoughnutChart } from "../doughnutChart/DoughnutChart";
import {jobsApi} from './jobsApi'
import './chartStyle.css';
import {  useRef } from "react";

export const JobsChart = ()=> {
    const {total, data : jobsData} = jobsApi;
    const configRef = useRef(null);

    const getConfig = () => {
      let temp  = {
        status :[], 
        percent : [], 
        color: []
      }
      jobsData.forEach(item => {
        temp.status.push(item.status);
        temp.percent.push(item.percent);
        temp.color.push(item.color);
      });

      return  {
        type: 'doughnut',
        data: {
          labels: temp.status,
          datasets: [
            {
              label: 'Chart',
              data: temp.percent,
              backgroundColor: temp.color
            }
          ]
        }
      }
    }
    configRef.current = getConfig();

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
            <DoughnutChart config={ configRef.current}/>
          </div>
        </div>
        
    )
}