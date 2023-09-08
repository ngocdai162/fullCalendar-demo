import { Chart } from 'chart.js';
import './pieChart.css'
import { Chart as ChartJS } from "chart.js/auto";
import { useEffect, useRef } from 'react';

export const PieChart = ({config}) => {
    const chartRef =  useRef(null);
    const chartCanva = useRef(null);
   
    useEffect(()=> {
        if(chartRef) {
          if(chartCanva.current != null) {
            chartCanva.current.destroy();
          }
          chartCanva.current= new Chart(
            chartRef.current, config
          );
        }
    },[chartRef])

    return(
        <div className='pie-chart'>
          <div className='pei-chart__info'>
            
          </div>
          <div className='pei-chart__draw'>
           <canvas id="acquisitions" ref={chartRef}></canvas>
          </div>
        </div>
    )
}