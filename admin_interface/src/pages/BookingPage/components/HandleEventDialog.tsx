import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription} from "@/components/ui/dialog";
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { useToast } from "@/components/ui/use-toast"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import { appointmentSchema, AppointmentFormValues } from './schema';
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '@/pages/BookingPage/components/css/DatePicker.css'
import { Appointment, User } from '@/utils/types';
import { UserService } from '@/services/Client/UserService';
import { useQuery } from '@tanstack/react-query';


interface HandleEventDialogProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    selectedDates: Date[];
    setSavedEvents: (events: any) => void;
    savedEvents: Appointment[];
}

export default function HandleEventDialog({ isOpen, setIsOpen, selectedDates, setSavedEvents, savedEvents } : HandleEventDialogProps) { 

    // const { toast } = useToast();

    const form = useForm<AppointmentFormValues>({
        resolver: zodResolver(appointmentSchema),
        defaultValues: {
            title: '',
            type: '',
            doctor: '',
            owner: Object.assign({}),
            start: selectedDates[0],
            estimatedDuration: '',
        }
    });

    const handleClose = () => {
        form.reset();
        setIsOpen(false);
    };

    // Get all the accounts
    const getUsers = async () => {
        const response = await UserService.getUsers();
        console.log(response.data);
        return response.data;
    };

    const { data: users, isLoading} = useQuery<User[], Error>({
        queryKey: ['users'],
        queryFn: getUsers,
    });

    function onAppoitmentSubmit(data: any){

        const estimatedDuration = data.estimatedDuration.split(':');
        const estimatedDurationInMinutes = parseInt(estimatedDuration[0]) * 60 + parseInt(estimatedDuration[1]);
        const endDate = new Date(data.start);
        endDate.setMinutes(endDate.getMinutes() + estimatedDurationInMinutes);

        //add event to the list of events
        const newEvent = {
            title: data.title,
            type: data.type,
            doctor: data.doctor,
            owner: data.owner,
            petName: data.petName,
            start: data.start,
            end: endDate,
        };

        console.log(newEvent);

        setIsOpen(false);
        setSavedEvents([...savedEvents, newEvent]);
        
    }

    const getMinTime = (date: Date) => {
        const minTime = new Date(date);
        minTime.setHours(0, 0, 0, 0);
        return minTime;
    };

    const getMaxTime = (date: Date) => {
        const maxTime = new Date(date);
        maxTime.setHours(23, 59, 59, 999);
        return maxTime;
    };

    if(isLoading) return <div>Loading...</div>;

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Add Appointment
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onAppoitmentSubmit)} className='space-y-4'>
                            <div className="grid grid-cols-2 gap-4">
                                <FormField control={form.control} name='title' render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-black'>Appointment's Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Dog Surgery' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name='type' render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-black'>Type of Appointment</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder='Type' />
                                                </SelectTrigger>
                                                <SelectContent >
                                                    <SelectGroup>
                                                        <SelectItem value='clinicalAnalysis'>Clinical analysis</SelectItem>
                                                        <SelectItem value='anesthesia'>Anesthesia/Analgesia</SelectItem>
                                                        <SelectItem value='softSurgery'>Soft Tissue Surgery</SelectItem>
                                                        <SelectItem value='orthopedicSurgery'>Orthopedic Surgery</SelectItem>
                                                        <SelectItem value='dentalSurgery'>Dental Surgery</SelectItem>
                                                        <SelectItem value='vaccination'>Vaccination</SelectItem>
                                                        <SelectItem value='consultation'>Consultation</SelectItem>
                                                        <SelectItem value='other'>Other</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>                                        
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name='doctor' render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-black'>Doctor</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Dr. John Doe' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name='owner' render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-black'>Owner</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={(value) => {
                                                    const selectedUser = users?.find(user => user.id.toString() === value);
                                                    field.onChange(selectedUser);
                                                }}>                                                
                                                <SelectTrigger>
                                                    <SelectValue placeholder='Owner' />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {users?.map(user => (
                                                        <SelectItem key={user.id} value={user.id.toString()}>{user.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name='start' render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-black'>Start Date</FormLabel>
                                        <FormControl>
                                            <DatePicker
                                                selected={field.value}
                                                onChange={(date: Date) => {
                                                    // Cria uma nova data que combina a data e o mês de selectedDates[0] com a hora e os minutos de 'date'
                                                    const newDate = new Date(selectedDates[0]);
                                                    newDate.setHours(date.getHours());
                                                    newDate.setMinutes(date.getMinutes());
                                            
                                                    field.onChange(newDate);
                                                }}                                                
                                                showTimeSelect
                                                showTimeSelectOnly
                                                timeIntervals={15}
                                                timeCaption="Time"
                                                placeholderText='Select date'
                                                dateFormat="MMMM d, yyyy HH:mm"
                                                className="input pl-3 w-full h-[40px] border rounded-lg"
                                                minTime={getMinTime(selectedDates[0])}
                                                maxTime={getMaxTime(selectedDates[1])}
                                                />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name='estimatedDuration' render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-black'>Estimated Duration</FormLabel>
                                        <FormControl>
                                            <Input type='time' className='justify-center' placeholder='30' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>
                            <div className='flex pt-4 justify-around'>
                                <Button type='submit'>Submit</Button>
                                <Button variant={'outline'} onClick={handleClose}>Cancelar</Button>
                            </div>
                        </form>
                    </Form>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
}