import { JobsChart } from "../component/jobsCharts/JobsChart"

export const PageTest = () => {
    return <div className="page-test" style={{
        display : 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh'
    }} >
       <JobsChart/>
    </div>
}