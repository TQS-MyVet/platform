import { Separator } from '@/components/ui/separator';

const ticketsQueue1 = [
  { id: 1, name: 'Ticket 1' },
  { id: 2, name: 'Ticket 2' },
  { id: 3, name: 'Ticket 3' },
  { id: 7, name: 'Ticket 7' },
  { id: 8, name: 'Ticket 8' },
  { id: 9, name: 'Ticket 9' },
  { id: 10, name: 'Ticket 10' },
  { id: 11, name: 'Ticket 11' },
];

const ticketsQueue2 = [
  { id: 4, name: 'Ticket 4' },
  { id: 5, name: 'Ticket 5' },
  { id: 6, name: 'Ticket 6' },
  { id: 12, name: 'Ticket 12' },
  { id: 13, name: 'Ticket 13' },
  { id: 14, name: 'Ticket 14' },
  { id: 15, name: 'Ticket 15' },
  { id: 16, name: 'Ticket 16' },
  { id: 17, name: 'Ticket 17' },
  { id: 18, name: 'Ticket 18' },
];

interface QueueProps {
  tickets: { id: number; name: string }[];
  bgColor?: string;
}

function Queue({ tickets, bgColor }: QueueProps) {
  const firstTicket = tickets[0];

  return (
    <div className="p-4 flex flex-col h-full">
      {firstTicket && (
        <div className={`mb-4 p-8 border rounded-lg shadow-lg ${bgColor} text-white text-2xl font-bold w-full text-center`}>
          {firstTicket.name}
        </div>
      )}
      <div className="overflow-y-auto flex-grow">
        <Separator className={`shadow-xl ${bgColor}`} />
        <div className="text-lg justify-center flex font-semibold p-4">
            Queue Length: {tickets.length}
        </div>
        <ul className='pr-1'>
          {tickets.map((ticket) => (
            <li
              key={ticket.id}
              className={`p-4 mb-4 border rounded-lg shadow-md ${
                firstTicket.id === ticket.id
                ? `${bgColor} text-white`
                : 'bg-white text-black'
              }`}
            >
              <div className="text-lg font-semibold">{ticket.name}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function DigitalSignagePage() {
  return (
    <div className="h-screen flex">
      <div className="w-1/2 bg-gray-100 border-r flex flex-col">
        <div className="bg-primary text-white py-4">
          <h2 className="text-center text-2xl font-bold">Reception Queue</h2>
        </div>
        <div className="flex-grow overflow-y-auto">
          <Queue tickets={ticketsQueue1} bgColor="bg-primary" />
        </div>
      </div>
      <div className="w-1/2 bg-gray-200 flex flex-col">
        <div className="bg-custom-yellow text-white py-4">
          <h2 className="text-center text-2xl font-bold">Doctor Queue</h2>
        </div>
        <div className="flex-grow overflow-y-auto">
          <Queue tickets={ticketsQueue2} bgColor="bg-custom-yellow" />
        </div>
      </div>
    </div>
  );
}
