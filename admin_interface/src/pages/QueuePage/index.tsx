import { Layout, LayoutBody } from '@/components/custom/layout';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
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

  const deleteFirstOfTheQueueReceptionist = useMutation({
    mutationFn: QueueService.deleteFirstOfTheQueueReceptionist,
    onSuccess: () => {
      queryClient.invalidateQueries('queues');
    }
  });

  const deleteFirstOfTheQueueDoctor = useMutation({
    mutationFn: QueueService.deleteFirstOfTheQueueDoctor,
    onSuccess: () => {
      queryClient.invalidateQueries('queues');
    }
  });

  const handleDeleteHead = (queueType: 'doctor' | 'receptionist') => {
    if (queueType === 'doctor') {
      deleteFirstOfTheQueueDoctor.mutate();
    } else if (queueType === 'receptionist') {
      deleteFirstOfTheQueueReceptionist.mutate();
    }
  };

  if (isLoading) return <div>Loading...</div>;

  const receptionistQueue = queues?.[0];
  const doctorQueue = queues?.[1];
  const headOfReceptionistQueue = receptionistQueue?.[0];
  const headOfDoctorQueue = doctorQueue?.[0];

  return (
    <Layout>
      <LayoutBody className='space-y-4'>
        <div className='flex items-center justify-between space-y-2'>
          <div className='space-y-1'>
            <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
              Queue Management
            </h1>
            <p className='text-sm text-muted-foreground'>
              Manage the queue of pets waiting to be seen by the vet.
            </p>
          </div>
        </div>
        <Separator />
        <div className='flex xl:flex-row flex-col justify-center items-center pt-32 p-1 gap-12'>
          <div className='w-full max-w-xl'>
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
              <CardFooter className='flex justify-center space-x-4'>
                <Button
                  onClick={() => handleDeleteHead('receptionist')}
                  className='px-4 py-2 text-lg'
                  disabled={userType !== 'receptionist'}
                >
                  Next in Receptionist Queue
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div className='w-full max-w-xl'>
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
              <CardFooter className='flex justify-center space-x-4'>
                <Button
                  onClick={() => handleDeleteHead('doctor')}
                  className='px-4 bg-custom-yellow hover:bg-amber-400 py-2 text-lg'
                  disabled={userType !== 'doctor'}
                >
                  Next in Doctor Queue
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </LayoutBody>
    </Layout>
  );
}
