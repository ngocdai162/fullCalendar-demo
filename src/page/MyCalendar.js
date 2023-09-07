import { useEffect, useRef, useState } from 'react';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid'
import { ListEvent } from '../data/listEvent';
import { Header } from './component/Header';
import { CALENDAR_MODE, filterConst } from '../const/calendar';
import './myCalendar.css';
import { Sidebar } from './component/sidebar/Sidebar';

export const MyCalendar = () => {
  const calendarRef = useRef(null)
  // const [calendarEvents, setCalendarEvents] =  useState(()=> ListEvent.data.map((item, index) => {
  //   return  {
  //     id :item.event.id,
  //     title:item.tile.content,
  //     start : item.time_window.start,
  //     end : item.time_window.end
  //   }
  // }));
  const [viewType, setviewType] = useState(filterConst.day);
  const [datePicker, setDatePicker] = useState({
    startDate: null,
    endDate:  null
  });

  useEffect(()=> {
    if(!checkViewType()) return ;
    const calendarApi = calendarRef.current ? calendarRef.current.getApi() : null;
    calendarApi && calendarApi.changeView(viewType.type);
  },[viewType])

  useEffect(() => {
    console.log('đỏi')
    const calendarApi = calendarRef.current ? calendarRef.current.getApi() : null;
    calendarApi && calendarApi.changeView('timeGrid',{
      start: datePicker.startDate,
      end:  datePicker.endDate
    });
  },[datePicker])

 const onChangeviewType = (type) => {
   setviewType(type)
 }   
  
 const getDatePicker = (start, end) => {
  setDatePicker({
    startDate :  start,
    endDate : end
   })
  }

  const getInitialView = () => {
    switch (viewType.type) {
      case filterConst.day.type :  return CALENDAR_MODE.DAY;
      case filterConst.week.type :  return CALENDAR_MODE.WEEK;
      case filterConst.month.type :  return CALENDAR_MODE.MONTH;
      default:  console.log('empty')
    }
  }


  const checkViewType = () => {
    if(viewType.type === filterConst.day.type || 
      viewType.type === filterConst.week.type || 
      viewType.type === filterConst.month.type) return true;
    return false;
  }


  
  const deleteEvent= (info) => {
    info.event.remove()
  }

  const  calendarJump = (type) => {
    const calendarApi = calendarRef.current ? calendarRef.current.getApi() : null;
    if(type === 'today') { 
      setviewType(filterConst.day)
      return;
    }
    if(type === 'prev' && calendarApi) {
      calendarApi.prev();
      return;
    }
    calendarApi.next();
  }
  
 
  // const handleReceive = (info) => {
  //   const objDrag   =  findEventById(info.draggedEl.id, ListEvent.data)
  //   setCalendarEvents(calendarEvents => [...calendarEvents,{
  //     title: objDrag.tile.content,
  //     start : objDrag.time_window.start,
  //     end : objDrag.time_window.end
  //   }])
  // }

  const findEventById = (id, arr) => {
    return arr.find((item) => item.event.id === id);
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
             <Header
                viewType = {viewType} 
                onChangeFilter={onChangeviewType} 
                getDatePicker={getDatePicker} 
                calendarJump={calendarJump}/>
          </div>
          <div className='calendar__container__main'>
             <div id='calendar-container'>
               <FullCalendar
                 plugins={[timeGridPlugin, interactionPlugin,dayGridPlugin]}
                 defaultView= 'timeGridWeek'
                 droppable ={true}
                 initialView={getInitialView()}
                 ref={calendarRef}
                //  events = {calendarEvents}
                 events = {eventsData}
                 editable = {true}
                 eventDragStop={deleteEvent}
                 headerToolbar=  {false}
                //  eventReceive={handleReceive}
               />
            </div>
          </div>   
       </div>
      <div className='calendar__sidebar'>
          <Sidebar/>
      </div>
    </div>
}
