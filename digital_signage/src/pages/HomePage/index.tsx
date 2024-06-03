import { Separator } from '@/components/ui/separator';
import { QueueService } from '@/services/Client/QueueService';
import { useQuery} from '@tanstack/react-query';
import { GetQueue } from '@/utils/types';

interface QueueProps {
  tickets?: GetQueue[];
  bgColor?: string;
}

function Queue({ tickets, bgColor }: QueueProps) {
  const firstTicket = tickets?.[0];

  return (
    <div className="p-4 flex flex-col h-full">
      {firstTicket && (
        <div className={`mb-4 p-8 border rounded-lg shadow-lg ${bgColor} text-white text-2xl font-bold w-full text-center`}>
          {firstTicket ? `${firstTicket.queueType}-${String(firstTicket.queuePos).padStart(4, '0')}` : 'No Queue'}        </div>
      )}
      {!firstTicket && (
        <div className={`mb-4 p-8 border rounded-lg shadow-lg ${bgColor} text-white text-2xl font-bold w-full text-center`}>
          No Queue
        </div>
      )}
      <div className="overflow-y-auto flex-grow">
        <Separator className={`shadow-xl ${bgColor}`} />
        <div className="text-lg justify-center flex font-semibold p-4">
            Queue Length: {tickets?.length}
        </div>
        <ul className='pr-1'>
          {tickets?.map((ticket, index) => (
            <li
              key={index}
              className={`p-4 mb-4 border rounded-lg shadow-md ${
                index === 0
                ? `${bgColor} text-white`
                : 'bg-white text-black'
              }`}
            >
              <div className="text-lg flex justify-center font-semibold">
                {ticket.queueType}-{String(ticket.queuePos).padStart(4, '0')}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function DigitalSignagePage() {

  const getQueue = async () => {
    const response = await QueueService.getQueues();
    return response.data;
  }

  const { data: queues, isLoading } = useQuery<GetQueue[], Error>({
    queryKey: ['queues'],
    queryFn: getQueue,
    refetchInterval: 1000,
  });

  console.log(queues);

  const receptionistQueue = queues?.[0];
  const doctorQueue = queues?.[1];

  return (
    <div className="h-screen flex">
      <div className="w-1/2 bg-gray-100 border-r flex flex-col">
        <div className="bg-primary text-white py-4">
          <h2 className="text-center text-2xl font-bold">Reception Queue</h2>
        </div>
        <div className="flex-grow overflow-y-auto">
          <Queue tickets={receptionistQueue} bgColor="bg-primary" />
        </div>
      </div>
      <div className="w-1/2 bg-gray-200 flex flex-col">
        <div className="bg-custom-yellow text-white py-4">
          <h2 className="text-center text-2xl font-bold">Doctor Queue</h2>
        </div>
        <div className="flex-grow overflow-y-auto">
          <Queue tickets={doctorQueue} bgColor="bg-custom-yellow" />
        </div>
      </div>
    </div>
  );
}
