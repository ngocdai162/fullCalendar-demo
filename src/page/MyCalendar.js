import { Calendar } from '@fullcalendar/core';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from "@fullcalendar/daygrid";
import './myCalendar.css';


export const MyCalendar = () => {
    
 
    return <div className='calendar__page'>
        <div className='calendar__container'>
          <div className='calendar__container__header'></div>
          <div className='calendar__container__main'>
           <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView={"dayGridMonth"}
            weekends={false}
            events={[
            { title: 'event 1', date: '2023-09-07' },
            { title: 'event 2', date: '2023-09-08' }
            ]}
          />
          </div>   
       </div>
      <div className='calendar__sidebar'>
          <p>tesst</p>
      </div>
      
    </div>
}

