import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { filterConst } from "../../const/calendar";
import { Dropdown } from 'antd';
import { DownOutlined} from '@ant-design/icons';
import "react-datepicker/dist/react-datepicker.css";
import "./header.css"


export const Header = ({viewType, onChangeFilter, getDatePicker, calendarJump}) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    useEffect(()=> {
        renderPickerWithViewType()
    }, [viewType])

    useEffect(()=> {
        getDatePicker(startDate, endDate)
    },[startDate, endDate])
    
    const onChange = (dates ) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        if(start!==null && end!=null) {
            let startDateStr = formatDate(start);
            let endDateStr = formatDate(end)
            getDatePicker(startDateStr,endDateStr)
        }
    };

    const jumpToDate = (size) => {
        let datePoint =  new Date();
        datePoint.setDate(datePoint.getDate() + size)
        setStartDate(new Date());
        setEndDate(datePoint)
    }

    const controlJump = (typeControl) => {
        if(viewType.type === filterConst.week_2.type) {
           const {start, end} = findStartEnd(typeControl, 14)
           sendDate(start, end)
           return;
        }
        if(viewType.type === filterConst.week_3.type) {
            const {start, end} = findStartEnd(typeControl, 21)
            sendDate(start, end)
            return ;
        }
        calendarJump(typeControl);
    }

    const findStartEnd = (typeControl, size) => {
        let start =  findDate(startDate, typeControl === 'prev'  ? - size : size)
        let end = findDate(endDate, typeControl === 'prev'  ? - size : size)
        return {start: start, end: end}
    }

    const findDate = (date, size) => {
        date.setDate(date.getDate() + size);
        return date;
    }

    const sendDate = (start, end) => {
        let startDateStr = formatDate(start);
        let endDateStr = formatDate(end)
        getDatePicker(startDateStr,endDateStr)
    }

    const formatDate = (str) => {
        let dateStr = String(str.getDate()).length === 1 ? `0${str.getDate()}` : `${str.getDate()}`
        let monthStr = String(str.getMonth()).length === 1 ? `0${str.getMonth() + 1}` : `${str.getMonth()}`
        return `${str.getFullYear()}-${monthStr}-${dateStr}`;
    }

    const renderPickerWithViewType = () => {
        if(viewType.type === filterConst.day.type) {
            setStartDate(new Date());
            setEndDate(new Date());
            return;
        }
        if(viewType.type === filterConst.week.type) {
            jumpToDate(7);
            return;
        }
        if(viewType.type === filterConst.month.type) {
            jumpToDate(30);
        }

    }

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
            label: <button onClick={() =>{
                jumpToDate(14);
                onChangeFilter(filterConst.week_2)
            }}>{filterConst.week_2.content}</button>,
            key: '4',
        },
        {
            label: <button onClick={() =>{
                jumpToDate(21);
                onChangeFilter(filterConst.week_3)
            }}>{filterConst.week_3.content}</button>,
            key: '5',
        },
    ]
 
 
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
            <div className="control-block">
                <button  onClick={() =>calendarJump('today')}>Today</button>
                <button onClick={() => controlJump('prev')}>Prev</button> 
                <button onClick={() => controlJump('next')}>Next</button> 
            </div>
        </div>
    )
}




