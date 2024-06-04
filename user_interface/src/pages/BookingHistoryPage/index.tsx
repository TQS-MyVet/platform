import { Layout, LayoutBody } from '@/components/custom/layout';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import { Separator } from '@/components/ui/separator';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import { useUserStore } from '@/stores/useUserStore';
import { useEffect, useState } from 'react';
import { BookingService } from '@/services/Client/BookingService';
import { Appointment } from './data/schema';

interface RawAppointment {
  id: number;
  startDate: string;
  endDate: string;
  type: string;
  docNotes: string;
  title: string;
  doctor: {
    id: number;
    name: string;
    email: string;
    phone: string;
    roles: string[];
  };
  pet: {
    id: number;
    name: string;
    sex: string;
    birthdate: string;
    species: string;
  };
}

const transformAppointments = (rawAppointments: RawAppointment[]): Appointment[] => {
  return rawAppointments.map((appointment) => ({
    id: appointment.id.toString(),
    startDate: appointment.startDate,
    endDate: appointment.endDate,
    type: appointment.type,
    docNotes: appointment.docNotes,
    title: appointment.title,
    doctor: appointment.doctor.name,
    pet: appointment.pet.name,
  }));
};

export default function Tasks() {
  const [petsIds, setPetsIds] = useState<number[]>([]);
  const user = useUserStore();
  const queryClient = useQueryClient();

  // Get the ids of the pets
  useEffect(() => {
    if (user) {
      setPetsIds(user.pets.map((pet: any) => pet.id));
    }
  }, [user]);

  console.log(petsIds);

  const getAppointmentsByPet = async (petId: number) => {
    return await (await BookingService.getBookingByPet(petId.toString())).data;
  };

  const results = useQueries({
    queries: petsIds.map((petId) => ({
      queryKey: ['appointments', petId],
      queryFn: () => getAppointmentsByPet(petId),
    })),
  });

  const rawAppointments = results.reduce((acc, result) => {
    if (result.data) {
      acc.push(...result.data);
    }
    return acc;
  }, [] as any[]);

  const appointments = transformAppointments(rawAppointments);
  
  const isLoading = results.some((result) => result.isLoading);

  console.log(appointments);

  return (
    <Layout>
      <LayoutBody className='flex flex-col mt-24' fixedHeight>
        <div className='flex items-center justify-center text-center space-y-2'>
          <div>
            <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
              Booking's History
            </h1>
            <p className='text-muted-foreground'>
              View your booking's history. All your booking's information is here.
            </p>
          </div>
        </div>
        <div className='flex justify-center pt-4'>
          <Separator className='w-1/2' />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
          {!isLoading && appointments.length > 0 ? (
            <DataTable data={appointments} columns={columns} />
          ) : (
            <p className='text-center'>No appointments found.</p>
          )}
        </div>
      </LayoutBody>
    </Layout>
  );
}
