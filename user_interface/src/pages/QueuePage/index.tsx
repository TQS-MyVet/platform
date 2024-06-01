import { Layout, LayoutBody } from '@/components/custom/layout';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { useState } from 'react';
import Ticket from '@/assets/ticket.png';
import DoctorTicket from '@/assets/ticket-doctor.png';
import { QueueService } from '@/services/Client/QueueService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Queue } from '@/utils/types';

export default function QueuePage() {
  const [userType, setUserType] = useState<'doctor' | 'receptionist'>('receptionist'); // Simulate user type

  const queryClient = useQueryClient();

  const getQueue = async () => {
    const response = await QueueService.getQueues();
    return response.data;
  }

  const { data: queues, isLoading } = useQuery<Queue[], Error>({
    queryKey: ['queues'],
    queryFn: getQueue,
  });

  if (isLoading) return <div>Loading...</div>;

  const receptionistQueue = queues?.[0];
  const doctorQueue = queues?.[1];
  const headOfReceptionistQueue = receptionistQueue?.[0];
  const headOfDoctorQueue = doctorQueue?.[0];

  return (
    <Layout>
      <LayoutBody className='space-y-4 mt-24'>
        <div className='flex items-center justify-center text-center space-y-2'>
          <div className='space-y-1'>
            <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
              MyVet Queues
            </h1>
            <p className='text-sm text-muted-foreground'>
              View the current queues for the reception and doctor.
            </p>
          </div>
        </div>
        <div className='flex justify-center'>
          <Separator className='w-1/2'/>
        </div>  
        <div className='flex xl:flex-row flex-col justify-center items-center pt-24 p-1 gap-12'>
          <div className='w-full max-w-xl'>
            <h2 className='text-center text-2xl font-bold mb-4'>Reception Queue</h2>
            <Card>
              <CardHeader>
                <div className="relative flex w-full h-48 justify-center items-center">
                  <img
                    src={Ticket}
                    alt="Ticket"
                    className="absolute inset-0 w-[500px] h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pr-14 sm:pr-20 lg:pr-24">
                    <span className="xs:text-5xl text-4xl font-bold text-white">
                      {headOfReceptionistQueue ? `P-${headOfReceptionistQueue.userId.toString().padStart(4, '0')}` : 'No Queue'}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className='text-center text-lg'>
                  Current User ID: {headOfReceptionistQueue ? headOfReceptionistQueue.userId : 'No Queue'}
                </p>
                <p className='text-center text-lg'>
                  Queue Position: {headOfReceptionistQueue ? headOfReceptionistQueue.queuePos : 'N/A'}
                </p>
              </CardContent>
            </Card>
          </div>
          <div className='w-full max-w-xl'>
            <h2 className='text-center text-2xl font-bold mb-4'>Doctor Queue</h2>
            <Card>
              <CardHeader>
                <div className="relative flex w-full h-48 justify-center items-center">
                  <img
                    src={DoctorTicket} 
                    alt="Ticket"
                    className="absolute inset-0 w-[500px] h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pr-14 sm:pr-20 lg:pr-24">
                    <span className="xs:text-5xl text-4xl font-bold text-white">
                      {headOfDoctorQueue ? `P-${headOfDoctorQueue.userId.toString().padStart(4, '0')}` : 'No Queue'}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className='text-center text-lg'>
                  Current User Id: {headOfDoctorQueue ? headOfDoctorQueue.userId : 'No Queue'}
                </p>
                <p className='text-center text-lg'>
                  Queue Position: {headOfDoctorQueue ? headOfDoctorQueue.queuePos : 'N/A'}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </LayoutBody>
    </Layout>
  );
}
