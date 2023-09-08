import { Chart } from 'chart.js';
import './doughnutChart.css'
import { Chart as ChartJS } from "chart.js/auto";
import { useEffect, useRef } from 'react';

export const DoughnutChart = ({config}) => {
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
        <div className='doughnut-chart'>
          <canvas id="acquisitions" ref={chartRef}></canvas>
        </div>
    )
}