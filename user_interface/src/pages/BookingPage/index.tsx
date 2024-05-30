import { Separator } from '@/components/ui/separator'
import { Layout, LayoutBody} from '@/components/custom/layout'
import CustomCalendar from "./components/CustomCalendar"



export default function BookingPage() {
    return (
        <Layout>
          <LayoutBody className='space-y-4 mt-24'>
                <div className='flex items-center text-center justify-center space-y-2'>
                    <div className='space-y-1'>
                        <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
                            Booking Appointment
                        </h1>
                        <p className='text-sm text-muted-foreground'>
                            Book an appointment for the pet owner you are adding. 
                            Click on the the day you want to book the appointment for.
                        </p>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <Separator className='w-1/2'/>
                </div>  
          <div className='flex justify-center pt-4 p-1'>
                <div className='w-full max-w-5xl'>
                    <CustomCalendar />
                </div>
            </div>
          </LayoutBody>
        </Layout>
    );
}