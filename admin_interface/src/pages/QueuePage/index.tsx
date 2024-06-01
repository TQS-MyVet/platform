import React, { useState } from 'react';
import { Layout, LayoutBody } from '@/components/custom/layout';
import { Separator } from '@/components/ui/separator';
import { QueueService } from '@/services/Client/QueueService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Queue } from '@/utils/types';
import QueueSection from './components/QueueSection'; 
import AddUserButton from './components/AddUserButton'; 

export default function QueuePage() {
  const [userType, setUserType] = useState<'doctor' | 'receptionist'>('receptionist'); // Simulate user type
  const [addUserToQueue, setAddUserToQueue] = useState(false);

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
        <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-2 lg:space-y-0 lg:space-x-4'>
          <div className='space-y-1'>
            <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
              Queue Management
            </h1>
            <p className='text-sm text-muted-foreground'>
              Manage the queue of pets waiting to be seen by the vet.
            </p>
          </div>
          <AddUserButton addUserToQueue={addUserToQueue} setAddUserToQueue={setAddUserToQueue} userType={userType} />
        </div>
        <Separator />
        <div className='flex xl:flex-row flex-col justify-center pt-20 items-start gap-12'>
          <QueueSection
            queue={receptionistQueue}
            headOfQueue={headOfReceptionistQueue}
            userType={userType}
            addUserToQueue={addUserToQueue}
            handleDeleteHead={handleDeleteHead}
            queueType="receptionist"
            bgColor="bg-primary"
          />
          <QueueSection
            queue={doctorQueue}
            headOfQueue={headOfDoctorQueue}
            userType={userType}
            addUserToQueue={addUserToQueue}
            handleDeleteHead={handleDeleteHead}
            queueType="doctor"
            bgColor="bg-custom-yellow"
          />
        </div>
      </LayoutBody>
    </Layout>
  );
}
