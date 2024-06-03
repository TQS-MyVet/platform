import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogPortal,
  } from '@/components/ui/dialog';
  import { Button } from '@/components/ui/button';
  import { User, CreatePet } from '@/utils/types';
  import { useMutation, useQueryClient } from '@tanstack/react-query';
  import { UserService } from '@/services/Client/UserService';
  import { PetService } from '@/services/Client/PetService';
  import { useState } from 'react';
  import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  import { Separator } from '@/components/ui/separator';
  import { Input } from '@/components/ui/input';
  //Calendar
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  import { DiamondPlus, DiamondMinus, CalendarIcon } from 'lucide-react';
  import { format } from "date-fns"
  import { cn } from "@/lib/utils"
  import { useToast } from "@/components/ui/use-toast"
  import { Calendar } from "@/components/ui/calendar"
  import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from '@/components/ui/form'
import { AddPetFormValues, AddPetSchema } from './addPetSchema';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form'
  
  interface UserInfoDialogProps {
    account: User;
    isInfoDialogOpen: boolean;
    setIsInfoDialogOpen: (isOpen: boolean) => void;
    openEditDialog: () => void; // Passa a função para abrir o EditUserDialog
  }

  
  const UserInfoDialog: React.FC<UserInfoDialogProps> = ({ account, isInfoDialogOpen, setIsInfoDialogOpen, openEditDialog }) => {
    const queryClient = useQueryClient();
    const [isAddingPet, setIsAddingPet] = useState(false);

    const { toast } = useToast();

    const form = useForm<AddPetFormValues>({
        resolver: zodResolver(AddPetSchema),
        defaultValues: {
          name: '',
          sex: '',
          birthdate: new Date(),
          species: '',
        },
    });
  
    const deleteAccount = async () => {
      const response = await UserService.deleteUser(account.id.toString());
      return response.data;
    };
  
    const deleteMutation = useMutation({
      mutationFn: deleteAccount,
      onSuccess: () => {
        queryClient.invalidateQueries('users');
      },
    });
  
    const handleAddPet = () => {
      setIsAddingPet(!isAddingPet);
    };

    //add pet
    const postPet = async (pet: CreatePet) => {

      const postPet = {
        ...pet,
        birthdate: pet.birthdate.toISOString(),
      };
      
      return await PetService.postPet('userId', postPet);
    }

    const {mutate: mutatePet} = useMutation({
        mutationFn: postPet,
        onError: (error) => {
            console.log('Error: ', error);
            toast({
                variant: 'destructive',
                title: 'Error!',
                description: 'An error occurred while creating the pet.',
            });
    
        },
        onSuccess: () => {
            console.log('Sou Foda!');
            toast({
                variant: 'success',
                title: 'Pet Created!',
                description: 'The pet has been created successfully.',
            });
        }
      })
  
    const handleSavePet = async (data: CreatePet) => {
      setIsAddingPet(false);
      console.log(data);
      mutatePet(data);
    };
  
    return (
      <Dialog open={isInfoDialogOpen} onOpenChange={setIsInfoDialogOpen}>
        <DialogPortal>
          <DialogContent className="max-w-md mx-auto p-6 rounded-lg shadow-lg">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-800">Account Number: {account.id}</DialogTitle>
            </DialogHeader>
            <div className="mt-4 text-gray-600">
              <div className="space-y-2 text-lg">
                <div><strong className="text-gray-700">Name:</strong> {account.name}</div>
                <div><strong className="text-gray-700">Email:</strong> {account.email}</div>
                <div><strong className="text-gray-700">Phone:</strong> {account.phone}</div>
                <div><strong className="text-gray-700">Roles:</strong> {account.roles.join(', ')}</div>
              </div>
              <Separator className="mt-4 shadow" />
              {account.pets.length > 0 ? (
                <Accordion type='single' collapsible className='w-full'>
                  {account.pets.map((pet) => (
                    <AccordionItem value={pet.id.toLocaleString()} key={pet.id}>
                      <AccordionTrigger className="flex justify-between px-4 py-2">
                        <span>{pet.name}</span>
                        <span>{pet.species}</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 py-2">
                        <div><strong className="text-gray font-semibold text-sm">Name:</strong> {pet.name}</div>
                        <div><strong className="text-gray font-semibold text-sm">Species:</strong> {pet.species}</div>
                        <div><strong className="text-gray font-semibold text-sm">Sex:</strong> {pet.sex}</div>
                        <div><strong className="text-gray font-semibold text-sm">Birthdate:</strong> {new Date(pet.birthdate).toLocaleDateString()}</div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center mt-4 text-lg text-gray-600">No pets found</div>
              )}
              <Button variant={'outline'} onClick={handleAddPet} className="mt-4 w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 flex items-center justify-center">
                { isAddingPet ? (
                    <div className="flex items-center">
                        <DiamondMinus className="mr-2"/>
                        Close
                    </div>
                ) : (
                    <div className='flex items-center'>
                        <DiamondPlus className="mr-2"/>
                        Add Pet
                    </div>
                )}
              </Button>
              {isAddingPet && (
                <div className="mt-4">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSavePet)} className='space-y-3'>
                        <FormField control={form.control} name='name' render={({ field }) => (
                            <FormItem>
                                <FormLabel>Pet's Name</FormLabel>
                                <FormControl>
                                    <Input placeholder='Bobby' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )} />
                            <FormField control={form.control} name='sex' render={({ field }) => (
                        <FormItem>
                            <FormLabel>Pet's Genre</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Genre' />
                                    </SelectTrigger>
                                    <SelectContent >
                                        <SelectGroup>
                                            <SelectItem value='male'>Male</SelectItem>
                                            <SelectItem value='female'>Female</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )} />
                        <FormField control={form.control} name='species' render={({ field }) => (
                            <FormItem>
                                <FormLabel>Pet's Species</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Species' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="dog">Dog</SelectItem>
                                                <SelectItem value="cat">Cat</SelectItem>
                                                <SelectItem value="bird">Bird</SelectItem>
                                                <SelectItem value="fish">Fish</SelectItem>
                                                <SelectItem value="reptile">Reptile</SelectItem>
                                                <SelectItem value="rodent">Rodent</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                        )} />
                        <FormField
                        control={form.control}
                        name="birthdate"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Date of birth</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                <FormControl className='ml-4'>
                                    <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[296px] pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                    >
                                    {field.value ? (
                                        format(field.value, "PPP")
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                    date > new Date() || date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div className="flex justify-center space-x-2 pt-2">
                            <Button variant={'outline'} onClick={() => setIsAddingPet(false)}>Cancel</Button>
                            <Button type='submit'>Save</Button>
                        </div>
                    </form>
                  </Form>
                </div>
              )}
              {!isAddingPet && (
                <div className="flex pt-6 justify-center space-x-4">
                    <Button variant={'outline'} onClick={openEditDialog} className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
                    Edit
                    </Button>
                    <Button onClick={() => deleteMutation.mutate()} className="px-4 py-2">
                    Delete
                    </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    );
  };
  
  export default UserInfoDialog;
  