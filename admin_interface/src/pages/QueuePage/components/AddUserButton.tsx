import React from 'react';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { UserService } from '@/services/Client/UserService';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User } from '@/utils/types';
import { QueueService } from '@/services/Client/QueueService';
import { toast } from '@/components/ui/use-toast';

const addUserToQueueSchema = z.object({
    user: z.any().refine((user) => {
        return user !== null && user !== undefined;
    }, {
        message: 'User is required',
    }),
    queueType: z.enum(['doctor', 'receptionist'], {
        required_error: 'Queue type is required',
    }),
});

interface AddUserButtonProps {
    addUserToQueue: boolean;
    setAddUserToQueue: React.Dispatch<React.SetStateAction<boolean>>;
    userType: 'doctor' | 'receptionist';
}

const AddUserButton: React.FC<AddUserButtonProps> = ({ addUserToQueue, setAddUserToQueue, userType }) => {

    const queryClient = useQueryClient();

    const form = useForm<z.infer<typeof addUserToQueueSchema>>({
        resolver: zodResolver(addUserToQueueSchema),
    });

    const closeForm = () => {
        form.reset();
        setAddUserToQueue(false);
    }

    // Get users

    const getUsers = async () => {
        const response = await UserService.getUsers();
        return response.data;
    };

    const { data: users, isLoading } = useQuery<User[], Error>({
        queryKey: ['users'],
        queryFn: getUsers,
    });

    // Add user to receptionist queue

    const addUserToReceptionistQueue = async (data: z.infer<typeof addUserToQueueSchema>) => {
        const userId = data.user.id;
        const response = await QueueService.postReceptionistQueue(userId);

        return response;
    }

    const addUserToReceptionistQueueMutation = useMutation({
        mutationFn: addUserToReceptionistQueue,
        onSuccess: () => {
            toast({
                variant: 'success',
                title: 'User added to the Receptionist Queue',
                description: 'User has been added to the receptionist queue successfully',
            });
            queryClient.invalidateQueries('queues');
        },
        onError: (error: any) => {
            toast({
                variant: 'destructive',
                title: 'Error adding user to the Receptionist Queue',
                description: error.message,
            });
        },
    });

    // Add user to doctor queue
    const addUserToDoctorQueue = async (data: z.infer<typeof addUserToQueueSchema>) => {
        const userId = data.user.id;
        const response = await QueueService.postDoctorQueue(userId);

        return response;
    }

    const addUserToDoctorQueueMutation = useMutation({
        mutationFn: addUserToDoctorQueue,
        onSuccess: () => {
            toast({
                variant: 'success',
                title: 'User added to the Doctor Queue',
                description: 'User has been added to the doctor queue successfully',
            });
            queryClient.invalidateQueries('queues');
        },
        onError: (error: any) => {
            toast({
                variant: 'destructive',
                title: 'Error adding user to the Doctor Queue',
                description: error.message,
            });
        },
    });


    const handleAddUserToQueue = async (data: z.infer<typeof addUserToQueueSchema>) => {
        if (data.queueType === 'receptionist') {
            addUserToReceptionistQueueMutation.mutate(data);
        } else if (data.queueType === 'doctor') {
            addUserToDoctorQueueMutation.mutate(data);
        }
        closeForm();
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className='flex items-center space-x-4'>
            {!addUserToQueue && (
                <Button
                    onClick={() => setAddUserToQueue(true)}
                    className='px-4 py-2 text-lg'
                >
                    Add User to Queue
                </Button>
            )}
            {addUserToQueue && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleAddUserToQueue)} className='flex items-center space-x-3'>
                        {userType === 'receptionist' && (
                            <FormField control={form.control} name='queueType' render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange}>
                                            <SelectTrigger className='w-[150px]'>
                                                <SelectValue placeholder='Queue Type' />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value='doctor'>Doctor Queue</SelectItem>
                                                <SelectItem value='receptionist'>Receptionist Queue</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        )}
                        <FormField control={form.control} name='user' render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Select onValueChange={(value) => {
                                        const selectedUser = users?.find(user => user.id.toString() === value);
                                        field.onChange(selectedUser);
                                    }}>
                                        <SelectTrigger className='w-[150px]'>
                                            <SelectValue placeholder='Select User' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {users?.map(user => (
                                                <SelectItem key={user.id} value={user.id.toString()}>{user.email}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <Button variant={'outline'} type='submit' className='px-4 py-2 text-lg'>Add</Button>
                    </form>
                </Form>
            )}
            {addUserToQueue && (
                <Button
                    onClick={() => closeForm()}
                    className='px-4 py-2 text-lg'
                >
                    Close
                </Button>
            )}
        </div>
    );
};

export default AddUserButton;
