import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { NavBar } from '../ui/NavBar';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { messages } from '../../helpers/calendar-messages-es';
import { uiOpennModal } from '../../actions/ui';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');

const localizer = momentLocalizer(moment); // or globalizeLocalizer



export const CalendarScreen = () => {

    const dispatch = useDispatch();
    const {events, activeEvent} = useSelector(state => state.calendar);
    const { uid } = useSelector(state => state.auth);

    const [lastView, setlastView] = useState(localStorage.getItem('lastView') || 'month' );

    useEffect(() => {
        dispatch( eventStartLoading() )
    }, [dispatch]);

    const onDoubleClick = (e) => {
        dispatch( uiOpennModal() )
    };
    
    const onSelectEvent = (e) => {
        dispatch( eventSetActive(e) );
    };

    const onViewChange = (e) => {
        setlastView(e);
        localStorage.setItem( 'lastView', e )
    };

    const onSelectSlot = (e) => {
        dispatch( eventClearActiveEvent() );
    }

    const eventStyleGetter = ( event, start, end, isSeleted ) => {

        const style = {
            backgroundColor:  (uid === event.user._id) ? '#367CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }

        return {
            style
        }

    }


    return (
        <div className="calendar-screen">

            <NavBar/>


            <Calendar
                localizer={ localizer }
                events={ events }
                startAccessor="start"
                endAccessor="end"
                messages= { messages }
                eventPropGetter={ eventStyleGetter }
                onDoubleClickEvent = { onDoubleClick }
                onSelectEvent= { onSelectEvent }
                onSelectSlot={ onSelectSlot }
                selectable={ true }
                onView= {onViewChange}
                view = { lastView }
                components = {
                    {
                        event: CalendarEvent
                     }
                }
            />

            <AddNewFab/>

            {
                (activeEvent) && <DeleteEventFab/>
            }
            

            <CalendarModal/>
        </div>
    )
}
