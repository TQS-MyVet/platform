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

export default function QueuePage() {
  const [ticketNumber, setTicketNumber] = useState("P-0023");

  const handleNext = () => {
    const nextNumber = parseInt(ticketNumber.split('-')[1]) + 1;
    const nextTicket = `P-${String(nextNumber).padStart(4, '0')}`;
    setTicketNumber(nextTicket);
  };

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
        <div className='flex justify-center pt-32 p-1'>
          <div className='w-full max-w-xl'>
            <Card>
              <CardHeader>
              <div className="relative flex w-full h-48 justify-center items-center">
                <img
                    src={Ticket} // Substitua pela URL da sua imagem de ticket
                    alt="Ticket"
                    className="absolute inset-0 w-[500px] h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center pr-14 sm:pr-20 lg:pr-24">
                    <span className="xs:text-5xl text-4xl lg:text-6xl font-bold text-white">
                    {ticketNumber}
                    </span>
                </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className='text-center text-lg'>
                  Current Ticket Number
                </p>
              </CardContent>
              <CardFooter className='flex justify-center'>
                <Button onClick={handleNext} className='px-4 py-2 text-lg'>
                  Next
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </LayoutBody>
    </Layout>
  );
}
