import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/custom/button';
import { Input } from '@/components/ui/input';
import { accountEditSchema, AccountEditFormValues } from './schema';
import { User } from '@/utils/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserService } from '@/services/Client/UserService';
import { useToast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

type EditUserDialogProps = {
  user: User;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export default function EditUserDialog({ user, isOpen, setIsOpen }: EditUserDialogProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

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
    const response = await UserService.updateUser(user.id.toString(), data);
    return response.data;
  };

  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries('users');
      setIsOpen(false);
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>Edit the details of the user below:</DialogDescription>
        </DialogHeader>
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
            <div className="mt-4 flex justify-end">
              <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button type="submit" className="ml-4">Save</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
