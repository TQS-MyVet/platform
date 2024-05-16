import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import localizer from './localizer';
import './Calendar.css'
import { events } from '@/data/appointments';
import { Appointment } from '@/utils/types';
import EventDialog from './EventDialog';
import HandleEventDialog from './HandleEventDialog';

export default function CustomCalendar() {
    const [isOpen, setIsOpen] = useState(false);
    const[isHandleEventOpen, setIsHandleEventOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState< Appointment | null>(null);
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);


    const handleSelectEvent = (event: Appointment) => {
        setSelectedEvent(event);
        setIsOpen(true);
    };

    const handleSelectSlot = (slotInfo: any) => {
        setSelectedDates([slotInfo.start, slotInfo.end]);
        setIsHandleEventOpen(true);
    }

    return (
        <div>
            <Calendar className='font-semibold'
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent}
                selectable={true}
                style={{ height: 600 }}
            />
            <EventDialog isOpen={isOpen} event={selectedEvent} setIsOpen={setIsOpen} />
            <HandleEventDialog isOpen={isHandleEventOpen} setIsOpen={setIsHandleEventOpen} selectedDates={selectedDates} />
        </div>
    );
}
