import { Layout, LayoutBody } from '@/components/custom/layout';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { QueueService } from '@/services/Client/QueueService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Queue } from '@/utils/types';
import QueueSection from './components/QueueSection'; 
import { useUserStore } from '@/stores/useUserStore';


export default function QueuePage() {
  const [addUserToQueue, setAddUserToQueue] = useState(false);

  const queryClient = useQueryClient();
  const user = useUserStore();


  const getQueue = async () => {
    const response = await QueueService.getQueues();
    return response.data;
  }

  const { data: queues, isLoading } = useQuery<Queue[], Error>({
    queryKey: ['queues'],
    queryFn: getQueue,
    refetchInterval: 5000,
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

  const handleDeleteHead = (queueType: string) => {
    if (queueType === 'DOCTOR') {
      deleteFirstOfTheQueueDoctor.mutate();
    } else if (queueType === 'RECEPTIONIST') {
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
        <div className='flex xl:flex-row flex-col justify-center pt-20 items-start gap-12'>
          <QueueSection
              queue={receptionistQueue}
              headOfQueue={headOfReceptionistQueue}
              addUserToQueue={addUserToQueue}
              handleDeleteHead={handleDeleteHead}
              queueType="RECEPTIONIST"
              bgColor="bg-primary"
            />
            <QueueSection
              queue={doctorQueue}
              headOfQueue={headOfDoctorQueue}
              addUserToQueue={addUserToQueue}
              handleDeleteHead={handleDeleteHead}
              queueType="DOCTOR"
              bgColor="bg-custom-yellow"
            />
        </div>
      </LayoutBody>
    </Layout>
  );
}
