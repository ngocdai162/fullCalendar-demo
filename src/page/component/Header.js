import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { CONTROL, FILTER_MODE } from "../../const/calendar";
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
        if(viewType.type === FILTER_MODE.WEEK_2.type) {
           const {start, end} = findStartEnd(typeControl, 14)
           sendDate(start, end)
           return;
        }
        if(viewType.type === FILTER_MODE.WEEK_3.type) {
            const {start, end} = findStartEnd(typeControl, 21)
            sendDate(start, end)
            return ;
        }
        calendarJump(typeControl);
    }

    const findStartEnd = (typeControl, size) => {
        let start =  findDate(startDate, typeControl === CONTROL.PREV  ? - size : size)
        let end = findDate(endDate, typeControl === CONTROL.NEXT  ? - size : size)
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
        if(viewType.type === FILTER_MODE.DAY.TYPE) {
            setStartDate(new Date());
            setEndDate(new Date());
            return;
        }
        if(viewType.type === FILTER_MODE.WEEK.TYPE) {
            jumpToDate(7);
            return;
        }
        if(viewType.type === FILTER_MODE.MONTH.TYPE) {
            jumpToDate(30);
        }
    }

    const filterItems = [
        {
            label: <button onClick={() => onChangeFilter({
                type:  FILTER_MODE.DAY.TYPE,
                content: FILTER_MODE.DAY.CONTENT
            })}>{FILTER_MODE.DAY.CONTENT}</button>,
            key: '0',
        },
        {
            label: <button onClick={() => onChangeFilter({
                type:  FILTER_MODE.WEEK.TYPE,
                content: FILTER_MODE.WEEK.CONTENT
            })}>{FILTER_MODE.WEEK.CONTENT}</button>,
            key: '1',
        },
        {
            label: <button onClick={() => onChangeFilter({
                type:  FILTER_MODE.MONTH.TYPE,
                content: FILTER_MODE.MONTH.CONTENT
            })}>{FILTER_MODE.MONTH.CONTENT}</button>,
            key: '2',
        },
        {
            label: <button onClick={() =>{
                jumpToDate(14);
                onChangeFilter({
                    type:  FILTER_MODE.WEEK_2.TYPE,
                    content: FILTER_MODE.WEEK_2.CONTENT
                })
            }}>{FILTER_MODE.WEEK_2.CONTENT}</button>,
            key: '4',
        },
        {
            label: <button onClick={() =>{
                jumpToDate(21);
                onChangeFilter({
                    type:  FILTER_MODE.WEEK_3.TYPE,
                    content: FILTER_MODE.WEEK_3.CONTENT
                })
            }}>{FILTER_MODE.WEEK_3.CONTENT}</button>,
            key: '5',
        },
    ]
 
 
    return (
        <div className="header">
            <div className="calendar-filter">
             <Dropdown
              menu={{
                items :  filterItems
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
                <button  onClick={() =>calendarJump(CONTROL.TODAY)}>Today</button>
                <button onClick={() => controlJump(CONTROL.PREV)}>Prev</button> 
                <button onClick={() => controlJump(CONTROL.NEXT)}>Next</button> 
            </div>
        </div>
    )
}




