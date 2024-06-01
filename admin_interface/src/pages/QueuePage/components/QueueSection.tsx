import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import Ticket from '@/assets/ticket.png';
import DoctorTicket from '@/assets/ticket-doctor.png';

interface QueueSectionProps {
  queue: any[];
  headOfQueue: any;
  userType: 'doctor' | 'receptionist';
  handleDeleteHead: (queueType: 'doctor' | 'receptionist') => void;
  queueType: 'doctor' | 'receptionist';
  bgColor: string;
}

const QueueSection: React.FC<QueueSectionProps> = ({
  queue,
  headOfQueue,
  userType,
  handleDeleteHead,
  queueType,
  bgColor,
}) => {
  const ticketImage = queueType === 'doctor' ? DoctorTicket : Ticket;

  return (
    <div className='w-full max-w-xl flex flex-col h-full'>
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
                {headOfQueue ? `P-${headOfQueue.queuePos.toString().padStart(4, '0')}` : 'No Queue'}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className='text-center text-lg'>
            Current User ID: {headOfQueue ? headOfQueue.userId : 'No Queue'}
          </p>
          <p className='text-center text-lg'>
            Queue Position: {headOfQueue ? headOfQueue.queuePos : 'N/A'}
          </p>
        </CardContent>
        <CardFooter className='flex justify-center space-x-4'>
          <Button
            onClick={() => handleDeleteHead(queueType)}
            className={`px-4 py-2 text-lg ${bgColor}`}
            disabled={userType !== queueType}
          >
            Next in {queueType.charAt(0).toUpperCase() + queueType.slice(1)} Queue
          </Button>
        </CardFooter>
      </Card>
      <div className='mt-4 overflow-y-auto'>
        <h3 className='text-lg font-bold mb-2'>Next in {queueType.charAt(0).toUpperCase() + queueType.slice(1)} Queue</h3>
        <ul className='space-y-2 max-h-96 overflow-y-auto'>
          {queue?.slice(1).map((ticket, index) => (
            <li
              key={ticket.userId}
              className={`p-4 rounded-lg shadow-md ${
                index % 2 === 0 ? (queueType === 'doctor' ? 'bg-custom-yellow opacity-90' : 'bg-rose-400') : 'bg-gray-100'
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
