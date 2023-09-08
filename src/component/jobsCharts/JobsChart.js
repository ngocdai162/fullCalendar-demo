import { DoughnutChart } from "../doughnutChart/DoughnutChart";
import {jobsApi} from './jobsApi'
import './chartStyle.css';
import {  useRef } from "react";

export const JobsChart = ()=> {
    const {total, data : jobsData} = jobsApi;
    const configRef = useRef(null);

    const getConfig = () => {
      let jobsInputConfig  = {
        status :[], 
        percent : [], 
        color: []
      }
      jobsData.forEach(item => {
        jobsInputConfig.status.push(item.status);
        jobsInputConfig.percent.push(item.percent);
        jobsInputConfig.color.push(item.color);
      });
      return  {
        type: 'doughnut',
        data: {
          labels: jobsInputConfig.status,
          datasets: [
            {
              label: 'Chart',
              data: jobsInputConfig.percent,
              backgroundColor: jobsInputConfig.color
            }
          ],
          option : { legend: {
            display: false
         },}
        },
        options: {
          plugins: {
              legend: {
                  display: false
              }
          }
        }
      }
    }

    configRef.current = getConfig();

    const renderFc = () => {
      return jobsData.map(({color, status, percent, value}, index) => {
        return (
          <div className="info-block">
            <div className="info-status">
              <div style={{backgroundColor: color}} className="circle-block"/>
              <span style={{color: color}}>{status}</span>
            </div>
            <span className="percent-info">{percent}</span>
            <span className="value-info">{value}</span>
          </div>
        )
      })
    }
    
    
    return (
        <div className='jobs-chart'>
          <div className='jobs-chart__info'>
            <h1>{total}</h1>
            {renderFc()}
          </div>
          <div className='jobs-chart__draw'>
            <DoughnutChart config = {configRef.current}/>
          </div>
        </div>
        
    )
}