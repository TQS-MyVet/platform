import { Separator } from '@/components/ui/separator'
import { Layout, LayoutBody} from '@/components/custom/layout'
import CustomCalendar from "./components/CustomCalendar"



export default function BookingPage() {
    return (
        <Layout>
          <LayoutBody className='space-y-4'>
                <div className='flex items-center justify-between space-y-2'>
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
                <Separator />
            <div className='flex justify-center pt-20 p-1'>
                <div className='w-full max-w-5xl'>
                    <CustomCalendar />
                </div>
            </div>
          </LayoutBody>
        </Layout>
    );
}