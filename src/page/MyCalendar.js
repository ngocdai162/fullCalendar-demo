import { useEffect, useRef, useState } from 'react';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid'
import { ListEvent } from '../data/listEvent';
import { Header } from './component/Header';
import { CALENDAR_MODE, CONTROL, FILTER_MODE } from '../const/calendar';
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
  const [viewType, setviewType] = useState({
    type :  CALENDAR_MODE.DAY,
    content:  FILTER_MODE.DAY.CONTENT
  });
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
      case FILTER_MODE.DAY.TYPE :  return CALENDAR_MODE.DAY;
      case FILTER_MODE.WEEK.TYPE :  return CALENDAR_MODE.WEEK;
      case FILTER_MODE.MONTH.TYPE :  return CALENDAR_MODE.MONTH;
      default:  console.log('empty')
    }
  }

  const checkViewType = () => {
    if(viewType.type === FILTER_MODE.DAY.TYPE || 
      viewType.type === FILTER_MODE.WEEK.TYPE || 
      viewType.type === FILTER_MODE.MONTH.TYPE) return true;
    return false;
  }

  
  const deleteEvent= (info) => {
    info.event.remove()
  }

  const  calendarJump = (type) => {
    const calendarApi = calendarRef.current ? calendarRef.current.getApi() : null;
    if(type === CONTROL.TODAY) { 
      setviewType({
        type:  FILTER_MODE.DAY.TYPE,
        content : FILTER_MODE.DAY.CONTENT
      })
      return;
    }
    if(type === CONTROL.PREV && calendarApi) {
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
                 defaultView= {CALENDAR_MODE.WEEK}
                 droppable ={true}
                 initialView={getInitialView()}
                 ref={calendarRef}
                //  events = {calendarEvents}
                 events = {eventsData}
                 eventContent = {() => <div>hello</div>} // custom event render
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
