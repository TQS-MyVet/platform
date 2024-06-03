import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import Ticket from '@/assets/ticket.png';
import DoctorTicket from '@/assets/ticket-doctor.png';
import { useUserStore } from '@/stores/useUserStore';
import { QueueService } from '@/services/Client/QueueService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface QueueSectionProps {
  queue: any[];
  headOfQueue: any;
  handleDeleteHead: (queueType: string) => void;
  queueType: string;
  bgColor: string;
}

const QueueSection: React.FC<QueueSectionProps> = ({
  queue,
  headOfQueue,
  queueType,
}) => {
  const ticketImage = queueType === 'DOCTOR' ? DoctorTicket : Ticket;

  const user = useUserStore();
  const [yourReceptionistPosition, setYourReceptionistPosition] = useState<number | null>(null);
  const [yourDoctorPosition, setYourDoctorPosition] = useState<number | null>(null);

  const getQueuesReceptionistByUserId = async () => {
    const response = await QueueService.getQueuesReceptionistByUserId(Number(user.sub));
    return response.data;
  }

  const getQueuesDoctorByUserId = async () => {
    const response = await QueueService.getQueuesDoctorByUserId(Number(user.sub));
    return response.data;
  }

  const { data: queuesReceptionist } = useQuery({
    queryKey: ['queuesReceptionist'],
    queryFn: getQueuesReceptionistByUserId,
    enabled: !!user.sub,
  });

  const { data: queuesDoctor } = useQuery({
    queryKey: ['queuesDoctor'],
    queryFn: getQueuesDoctorByUserId,
    enabled: !!user.sub,
  });

  console.log('queuesReceptionist', queuesReceptionist);
  console.log('queuesDoctor', queuesDoctor);

  useEffect(() => {
    if (queuesReceptionist && headOfQueue) {
      //get the difference between the head of the queue and the user
      const userPosition = queuesReceptionist.queuePos - headOfQueue.queuePos;
      setYourReceptionistPosition(userPosition);
    }
  }, [queuesReceptionist, headOfQueue]);

  return (
    <div className='w-full max-w-xl flex flex-col h-full'>
        <h2 className='text-center text-2xl font-bold mb-4'>
          {queueType.charAt(0).toUpperCase() + queueType.slice(1).toLowerCase()} Queue
        </h2>
      <Card className='flex-shrink-0'>
        <CardHeader>
          <div className="relative flex w-full h-48 justify-center items-center">
            <img
              src={ticketImage}
              alt="Ticket"
              className="absolute inset-0 w-[500px] h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center pr-14 sm:pr-20 lg:pr-24">
              <span className="xs:text-5xl text-4xl font-bold text-white">
                {headOfQueue ? `${headOfQueue.queueType}-${headOfQueue.queuePos.toString().padStart(4, '0')}` : 'No Queue'}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className='text-center text-lg'>
            {queueType === 'RECEPTIONIST' ? (
              yourReceptionistPosition ? (
                yourReceptionistPosition > 0 ? (
                  <>
                    You have 
                    <span className='font-bold'> 
                      {yourReceptionistPosition === 1 ? ' 1 person ' : ` ${yourReceptionistPosition} people `}
                    </span>
                    before you
                  </>
                ) : (
                  "You're next in line"
                )
              ) : (
                "You're not in the queue"
              )
            ) : (
              yourDoctorPosition ? (
                yourDoctorPosition > 0 ? (
                  <>
                    You have 
                    <span className='font-bold'> 
                      {yourDoctorPosition === 1 ? ' 1 person ' : ` ${yourDoctorPosition} people `}
                    </span>
                    before you
                  </>
                ) : (
                  "You're next in line"
                )
              ) : (
                "You're not in the queue"
              )
            )}
          </p>
        </CardContent>
      </Card>
      <div className='mt-4 overflow-y-auto'>
        <h3 className='text-lg font-bold mb-2'>Next in {queueType.charAt(0).toUpperCase() + queueType.slice(1)} Queue</h3>
        <ul className='space-y-2 overflow-y-auto h-[212px]'>
            {queue?.slice(1).map((ticket, index) => (
                <li
                    key={ticket.userId}
                    className={`p-4 rounded-lg shadow-md ${
                        index % 2 === 0 ? (queueType === 'DOCTOR' ? 'bg-custom-yellow opacity-90' : 'bg-rose-400') : 'bg-gray-100'
                    }`}
                >
                    <p>User ID: {ticket.userId}</p>
                    <p>Queue Position: {ticket.queuePos}</p>
                </li>
            ))}
        </ul>
    </div>
    </div>
  );
};

export default QueueSection;
