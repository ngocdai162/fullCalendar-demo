import { useEffect, useRef } from 'react';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid'
import './myCalendar.css';
import { ListEvent } from '../data/listEvent';


export const MyCalendar = () => {
  const containerEl = useRef();

  useEffect(()=> {
    console.log('keos')
  })

  const handleDateClick = () => {
    console.log('click')
  }

  const handleDrag = () => {
    console.log('kes')
    new Draggable(containerEl.current, {
      itemSelector:'.event__block',
      eventData : (eventEl) => {
        return {
          title: eventEl.innerText,
          duration: '02:00'
        };
      }
    });
  }
  
    return <div className='calendar__page'>
        <div className='calendar__container'>
          <div className='calendar__container__header'>header</div>
          <div className='calendar__container__main'>
             <div id='calendar-container'>
               <FullCalendar
                 plugins={[timeGridPlugin, interactionPlugin]}
                 defaultView= 'timeGridWeek'
                 droppable ={true}
                 dateClick={handleDateClick}
             />
            </div>
          </div>   
       </div>
      <div className='calendar__sidebar'>
          <h1>List event</h1>
          <div ref={containerEl} className='calendar__sidebar__container'>
            {ListEvent.data.map((item, index) => (
               <div className='event__block' draggable= {true} onDragStart={handleDrag}>
                 <p>{item.tile.header}<br/>{item.tile.content.join(" ")}</p>
               </div>
            ))}
          </div>
         
      </div>
      
    </div>
}

