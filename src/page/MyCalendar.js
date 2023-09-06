import { useEffect, useRef, useState } from 'react';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid'
import './myCalendar.css';
import { ListEvent } from '../data/listEvent';
import { Header } from './component/Header';
import { filterConst } from '../const/calendar';


export const MyCalendar = () => {
  const containerEl = useRef(null);
  const calendarRef = useRef(null)
  const dragObj = useRef(false);
  const [viewType, setviewType] = useState(filterConst.day);
  const [datePicker, setDatePicker] = useState({
    startDate: null,
    endDate:  null
  });

  useEffect(()=> {
    const calendarApi = calendarRef.current ? calendarRef.current.getApi() : null;
    calendarApi && calendarApi.changeView(viewType.type);
  },[viewType])

  useEffect(() => {
    const calendarApi = calendarRef.current ? calendarRef.current.getApi() : null;
    calendarApi && calendarApi.changeView('timeGrid',{
      start: datePicker.startDate,
      end:  datePicker.endDate
    });
  },[datePicker])


  useEffect(()=> {
   if(dragObj.current === false) {
    dragObj.current =  new Draggable(containerEl.current, {
      itemSelector:'.event__block',
      eventData : (eventEl) => {
        return {
          title: eventEl.innerText,
          duration: '02:00',
        };
      }
    });
   }
  },[dragObj])

 const onChangeviewType = (type) => {
  setviewType(type)
 }   
  
 const getDatePicker = (start, end) => {
  setDatePicker({
    startDate :  start,
    endDate : end
   })
  }
  
  const handleDateClick = (info) => {
    info.event.remove()
  }

  const eventsData = ListEvent.data.map((item, index) => {
    return  {
      id :item.event.id,
      title:item.tile.content,
      start : item.time_window.start,
      end : item.time_window.end
    }
  })

    return <div className='calendar__page'>
        <div className='calendar__container'>
          <div className='calendar__container__header'>
             <Header viewType = {viewType} onChangeFilter={onChangeviewType} getDatePicker={getDatePicker}/>
          </div>
          <div className='calendar__container__main'>
             <div id='calendar-container'>
               <FullCalendar
                 plugins={[timeGridPlugin, interactionPlugin,dayGridPlugin]}
                 defaultView= 'timeGridWeek'
                 droppable ={true}
                 dateClick={handleDateClick}
                 initialView={viewType.type}
                 ref={calendarRef}
                 events = {eventsData}
                 editable = {true}
                
                 eventClick= {handleDateClick}
               />
            </div>
          </div>   
       </div>
      <div className='calendar__sidebar'>
          <h1>List event</h1>
          <div ref={containerEl} className='calendar__sidebar__container'>
            {ListEvent.data.map((item, index) => (
               <div className='event__block' draggable= {true} >
                 <p>{item.tile.header}<br/>{item.tile.content.join(" ")}</p>
               </div>
            ))}
          </div>
      </div>
    </div>
}

