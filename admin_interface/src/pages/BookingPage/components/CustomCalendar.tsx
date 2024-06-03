import { useEffect, useState } from 'react';
import { Calendar } from 'react-big-calendar';
import localizer from './localizer';
import '@/pages/BookingPage/components/css/Calendar.css';
import { events } from '@/data/appointments';
import { GetAppointment, CalendarAppointments } from '@/utils/types';
import EventDialog from './EventDialog';
import HandleEventDialog from './HandleEventDialog';
import { useQuery } from '@tanstack/react-query';
import { BookingService } from '@/services/Client/BookingService';
import EditEventDialog from './EditEventDialog';
import DoctorNotesDialog from './DoctorNotesDialog';


export default function CustomCalendar() {
    const [isOpen, setIsOpen] = useState(false);
    const[isHandleEventOpen, setIsHandleEventOpen] = useState(false);
    const [isEditEventOpen, setIsEditEventOpen] = useState(false);
    const [isAddDocNotesOpen, setIsAddDocNotesOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState< CalendarAppointments | null>(null);
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);
    const [savedEvents, setSavedEvents] = useState<CalendarAppointments[]>();


    const handleSelectEvent = (event: CalendarAppointments) => {
        setSelectedEvent(event);
        setIsOpen(true);
    };

    const handleSelectSlot = (slotInfo: any) => {
        setSelectedDates([slotInfo.start, slotInfo.end]);
        setIsHandleEventOpen(true);
    }

    const getAppointments = async () => {
        const response = await BookingService.getBookings();
        return response.data;
    }

    const { data: appointments, isLoading } = useQuery<GetAppointment[]>({
        queryKey: ['appointments'],
        queryFn: getAppointments,
    });

    useEffect(() => {
        if(appointments){
            const calendarAppointments: CalendarAppointments[] = appointments.map((appointment: GetAppointment) => {
                return {
                    id: appointment.id,
                    start: new Date(appointment.startDate),
                    end: new Date(appointment.endDate),
                    type: appointment.type,
                    doctor: appointment.doctor,
                    pet: appointment.pet,
                    title: appointment.title,
                    docNotes: appointment.docNotes,
                }
            });
            setSavedEvents(calendarAppointments);
        }
    }, [appointments]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Calendar className='font-semibold'
                localizer={localizer}
                events={savedEvents}
                startAccessor="start"
                endAccessor="end"
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent}
                selectable={true}
                style={{ height: 600 }}
            />
            <EventDialog isOpen={isOpen} event={selectedEvent} setIsOpen={setIsOpen} setEditEventOpen={setIsEditEventOpen} isEditEventOpen={isEditEventOpen} setIsAddDocNotesOpen={setIsAddDocNotesOpen}/>
            <HandleEventDialog isOpen={isHandleEventOpen} setIsOpen={setIsHandleEventOpen} selectedDates={selectedDates} setSavedEvents={setSavedEvents} savedEvents={savedEvents}/>
            <EditEventDialog isOpen={isEditEventOpen} setIsOpen={setIsEditEventOpen} appointment={selectedEvent} />
            <DoctorNotesDialog isOpen={isAddDocNotesOpen} setIsOpen={setIsAddDocNotesOpen} appointment={selectedEvent} />
        </div>
    );
}
