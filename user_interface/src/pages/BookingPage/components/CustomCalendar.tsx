import { useEffect, useState } from 'react';
import { Calendar } from 'react-big-calendar';
import localizer from './localizer';
import '@/pages/BookingPage/components/css/Calendar.css';
import EventDialog from './EventDialog';
import HandleEventDialog from './HandleEventDialog';
import { useQuery } from '@tanstack/react-query';
import { GetAppointment, CalendarAppointments } from '@/utils/types';
import { BookingService } from '@/services/Client/BookingService';
import { UserService } from '@/services/Client/UserService';
import { useUserStore } from '@/stores/useUserStore';
import EditEventDialog from './EditEventDialog';

export default function CustomCalendar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isHandleEventOpen, setIsHandleEventOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<CalendarAppointments | null>(null);
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);
    const [savedEvents, setSavedEvents] = useState<CalendarAppointments[]>([]);
    const [isEditEventOpen, setEditEventOpen] = useState(false);
    const user = useUserStore();
    const [petsIds, setPetsIds] = useState<number[]>([]);

    const handleSelectEvent = (event: CalendarAppointments) => {
        setSelectedEvent(event);
        setIsOpen(true);
    };

    const handleSelectSlot = (slotInfo: any) => {
        setSelectedDates([slotInfo.start, slotInfo.end]);
        setIsHandleEventOpen(true);
    }

    // Get pets from user
    const getPets = async () => {
        return (await UserService.getUserPets(user.sub)).data;
    }

    const { data: pets } = useQuery({
        queryKey: ['pets', user.sub],
        queryFn: getPets,
    });

    useEffect(() => {
        if (pets) {
            setPetsIds(pets.map((pet: any) => pet.id));
        }
    }, [pets]);

    // Get appointments
    const getAppointments = async () => {
        const response = await BookingService.getBookings();
        return response.data;
    }

    const { data: appointments, isLoading } = useQuery<GetAppointment[]>({
        queryKey: ['appointments'],
        queryFn: getAppointments,
    });

    useEffect(() => {
        if (appointments) {
            const calendarAppointments: CalendarAppointments[] = appointments.map((appointment: any) => {
                const isUserPet = petsIds.includes(appointment.pet.id);

                return {
                    id: appointment.id,
                    start: new Date(appointment.startDate),
                    end: new Date(appointment.endDate),
                    type: appointment.type,
                    doctor: appointment.doctor,
                    pet: appointment.pet,
                    title: isUserPet ? appointment.title : 'Already Booked',
                    docNotes: appointment.docNotes,
                    clickable: isUserPet,
                }
            });
            setSavedEvents(calendarAppointments);
        }
    }, [appointments, petsIds]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Calendar
                className='font-semibold'
                localizer={localizer}
                events={savedEvents}
                startAccessor="start"
                endAccessor="end"
                onSelectSlot={handleSelectSlot}
                onSelectEvent={(event) => event.clickable && handleSelectEvent(event)}
                selectable={true}
                style={{ height: 600 }}
            />
            <EventDialog
                isOpen={isOpen}
                event={selectedEvent}
                setIsOpen={setIsOpen}
                setEditEventOpen={setEditEventOpen}
                isEditEventOpen={isEditEventOpen}
            />
            <HandleEventDialog
                isOpen={isHandleEventOpen}
                setIsOpen={setIsHandleEventOpen}
                selectedDates={selectedDates}
                setSavedEvents={setSavedEvents}
                savedEvents={savedEvents}
            />
            <EditEventDialog isOpen={isEditEventOpen} setIsOpen={setEditEventOpen} appointment={selectedEvent} />

        </div>
    );
}
