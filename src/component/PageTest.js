import { PieChart } from "./pieChart/PieChart"
import {dataChart } from "./pieChart/api"


export const PageTest = () => {
    const config = {
        type: 'pie',
        data: {
          labels: dataChart.map(row => row.item),
          datasets: [
            {
              label: 'Acquisitions by year',
              data: dataChart.map(row => row.count)
            }
          ]
        }
      }

    return <div className="page-test" style={{
        display : 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh'
    }} >
        <PieChart config={config}/>
    </div>
}