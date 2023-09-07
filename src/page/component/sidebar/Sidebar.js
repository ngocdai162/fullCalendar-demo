import { Draggable } from '@fullcalendar/interaction';
import { useEffect, useRef, useState } from 'react';
import { ListEvent } from '../../../data/listEvent';

export const Sidebar = () => {
  const [sidebarEvents, setSidebarEvents] = useState(ListEvent.data);
  const containerEl = useRef(null);
  const dragObj = useRef(false);

  const findEventById = (id, arr) => {
    return arr.find((item) => item.event.id === id);
  }

  useEffect(()=> {
    if(!dragObj.current) {
     dragObj.current =  new Draggable(containerEl.current, {
       itemSelector:'.event__block',
       eventData : (eventEl) => {
         return {
           title: eventEl.innerText,
           duration: '02:00',
         };
       },

     });
    }
   },[dragObj])

    return (<div>
          <h1>List event</h1>
          <div ref={containerEl} className='calendar__sidebar__container'>
            {sidebarEvents.map((item, index) => (
               <div className='event__block' draggable= {true}  id={item.event.id}>
                 <p>{item.tile.header}<br/>{item.tile.content.join(" ")}</p>
               </div>
            ))}
          </div>
    </div>
    )
}