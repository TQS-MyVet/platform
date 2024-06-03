import { Separator } from '@/components/ui/separator'
import { Layout, LayoutBody} from '@/components/custom/layout'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import { Button } from '@/components/custom/button'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { UserService } from '@/services/Client/UserService';
import { accountEditSchema, AccountEditFormValues } from './components/schema';
import { User } from '@/utils/types';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { useUserStore } from '@/stores/useUserStore';


export default function ProfilePage() {

    const user = useUserStore();
    const { toast } = useToast();

    const form = useForm<AccountEditFormValues>({
        resolver: zodResolver(accountEditSchema),
        defaultValues: {
        email: user.email,
        name: user.name,
        phone: user.phone,
        password: '',
        },
    });

    const updateUser = async (data: AccountEditFormValues) => {
        const response = await UserService.updateUser(user.sub, data);
        return response.data;
      };
    
      const updateMutation = useMutation({
        mutationFn: updateUser,
        onSuccess: () => {
          toast({
            variant: 'success',
            title: 'User updated successfully',
            description: 'The user has been updated successfully',
          });
        },
        onError: (error: any) => {
          toast({
            variant: 'destructive',
            title: 'Error updating user',
            description: error.message,
          });
        },
      });

      const onSubmit = (data: AccountEditFormValues) => {
        console.log('Form data:', data);
        updateMutation.mutate(data);
      };

    return (
        <Layout>
          <LayoutBody className='space-y-4 mt-24'>
                <div className='flex items-center text-center justify-center space-y-2'>
                    <div className='space-y-1'>
                        <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
                            Your Profile
                        </h1>
                        <p className='text-sm text-muted-foreground'>
                            View and edit your profile information here.
                        </p>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <Separator className='w-1/2'/>
                </div>  
          <div className='flex justify-center pt-4 p-1'>
                <div className='w-1/4 max-w-5xl'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="space-y-4">
                            <FormField control={form.control} name="name" render={({ field }) => (
                                <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Name" />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="email" render={({ field }) => (
                                <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Email" />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="phone" render={({ field }) => (
                                <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Phone" />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="password" render={({ field }) => (
                                <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input {...field} type="password" placeholder="Password" />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )} />
                            </div>
                            <div className="mt-4 flex justify-center">
                            <Button variant="outline" onClick={() => form.reset()}>Cancel</Button>
                            <Button type="submit" className="ml-4">Save</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
          </LayoutBody>
        </Layout>
    );
}