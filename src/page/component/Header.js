import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { filterConst } from "../../const/calendar";
import { Dropdown } from 'antd';
import { DownOutlined} from '@ant-design/icons';
import "react-datepicker/dist/react-datepicker.css";
import "./header.css"


export const Header = ({viewType, onChangeFilter, getDatePicker}) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    useEffect(()=> {
        if(startDate!==null && endDate !=null) {
            let startDateStr = formatDate(startDate);
            let endDateStr = formatDate(endDate)
            getDatePicker(startDateStr,endDateStr)
        }
    }, [startDate,endDate])

    useEffect(()=> {
        console.log('viewType', viewType)
    },[viewType])

  
    const items = [
        {
            label: <button onClick={() => onChangeFilter(filterConst.day)}>{filterConst.day.content}</button>,
            key: '0',
        },
        {
            label: <button onClick={() => onChangeFilter(filterConst.week)}>{filterConst.week.content}</button>,
            key: '1',
        },
        {
            label: <button onClick={() => onChangeFilter(filterConst.month)}>{filterConst.month.content}</button>,
            key: '2',
        },
        {
            // label: <button onClick={() => jumpToDate(14)}>{filterConst.week_2.content}</button>,
            label: <button onClick={() =>{
                jumpToDate(14);
                onChangeFilter(filterConst.week_2)
            }}>{filterConst.week_2.content}</button>,
            key: '4',
        },
        {
            // label: <button onClick={() => jumpToDate(21)}>{filterConst.week_3.content}</button>,
            label: <button onClick={() =>{
                jumpToDate(21);
                onChangeFilter(filterConst.week_3)
            }}>{filterConst.week_3.content}</button>,
            key: '5',
        },
    ]
 
     
    const onChange = (dates ) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const formatDate = (str) => {
        let dateStr = String(str.getDate()).length === 1 ? `0${str.getDate()}` : `${str.getDate()}`
        let monthStr = String(str.getMonth()).length === 1 ? `0${str.getMonth() + 1}` : `${str.getMonth()}`
        return `${str.getFullYear()}-${monthStr}-${dateStr}`;
    }

    const jumpToDate = (size) => {
        let datePoint =  new Date();
        datePoint.setDate(datePoint.getDate() + size)
        setStartDate(new Date());
        setEndDate(datePoint)
    }

    // const controlJump = () => {
    //     if()
    // }
 
    return (
        <div className="header">
            <div className="calendar-filter">
             <Dropdown
              menu={{
                items
              }}
              trigger={['click']}
             > 
               <button>
                  {viewType.content} 
                  <DownOutlined/>
                </button>
             </Dropdown>
            </div>
            <div className="date-picker-block">
             <ReactDatePicker 
              dateFormat="yyyy/MM/dd"
              selected={startDate} 
              onChange={onChange} 
              startDate={startDate}
              endDate={endDate}
              selectsRange
              monthsShown={2}
             />
            </div>
            <div>
                {/* <button onClick={}>Prev</button>
                <button onClick={}>Next</button> */}
            </div>
        </div>
    )
}




