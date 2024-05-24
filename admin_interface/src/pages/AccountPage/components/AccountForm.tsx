import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/custom/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AccountChangeFormValues, accountSchema } from './schema'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

// Calendar
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { CreateUser, CreatePet } from '@/utils/types'

//Query
import { useMutation } from '@tanstack/react-query';
import { UserService } from '@/services/Client/UserService'
import { PetService } from '@/services/Client/PetService'

//React 
import { useEffect } from 'react'


export function AccountForm() {
    const { toast } = useToast()

  const form = useForm<AccountChangeFormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
        ownerName: '',
        phone: '',
        email: '',
        petName: '',
        petGenre: '',
        petBirthdate: new Date(),
        petSpecies: '',
    }
  });

  //Post User

  const postUser = async (user: CreateUser) => {
    return await UserService.postUser(user);
  }

  const {mutate, data: userResponse} = useMutation({
    mutationFn: postUser,
    onError: (error) => {
        console.log('Error: ', error);
        toast({
            variant: 'destructive',
            title: 'Error!',
            description: 'An error occurred while creating the account for the owner of the pet.',
        });

    },
    onSuccess: () => {
        console.log('Sou Foda!');
        toast({
            variant: 'success',
            title: 'Account Created!',
            description: 'The account for the owner of the pet has been created successfully.',
        });
    }
  })

  function onSubmit(data: any) {

    const user: CreateUser = {
        name: data.ownerName,
        email: data.email,
        phone: data.phone,
      };

      mutate(user);
    }

    //Post Pet

    const postPet = async (pet: CreatePet) => {
        return await PetService.postPet('userId', pet);
    }

    const {mutate: mutatePet, data: petResponse} = useMutation({
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

    useEffect(() => {
        if(userResponse){
            const pet: CreatePet = {
                name: form.getValues('petName'),
                sex: form.getValues('petGenre'),
                birthdate: form.getValues('petBirthdate').toISOString(),
                species: form.getValues('petSpecies'),
            }
            mutatePet(pet);
        }
    }, [userResponse])



  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div className="grid grid-cols-2 gap-4">
            <FormField control={form.control} name='ownerName' render={({ field }) => (
            <FormItem>
                <FormLabel>Owner's name</FormLabel>
                <FormControl>
                <Input placeholder='Dona Lurdes' {...field} />
                </FormControl>
                <FormDescription>
                    Enter the name of the owner of the pet you are adding.
                </FormDescription>
                <FormMessage />
            </FormItem>
            )} />
            <FormField control={form.control} name='email' render={({ field }) => (
            <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                <Input type='email' placeholder='example@email.com' {...field} />
                </FormControl>
                <FormDescription>
                    Enter the email of the owner of the pet.
                </FormDescription>
                <FormMessage />
            </FormItem>
            )} />
            <FormField control={form.control} name='phone' render={({ field }) => (
            <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                <Input placeholder='912345678' {...field} />
                </FormControl>
                <FormDescription>
                    Enter the phone number of the owner of the pet. This field is important for contacting the owner.
                </FormDescription>
                <FormMessage />
            </FormItem>
            )} />
            <FormField control={form.control} name='petName' render={({ field }) => (
            <FormItem>
                <FormLabel>Pet's Name</FormLabel>
                <FormControl>
                    <Input placeholder='Bobby' {...field} />
                </FormControl>
                <FormDescription>
                Enter your current password to confirm your identity.
                </FormDescription>
                <FormMessage />
            </FormItem>
            )} />
        </div>
        <div className="grid grid-cols-3 gap-4">
            <FormField control={form.control} name='petGenre' render={({ field }) => (
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
                <FormDescription>
                    Select the genre of the pet you are adding.
                </FormDescription>
                <FormMessage />
            </FormItem>
            )} />
            <FormField control={form.control} name='petSpecies' render={({ field }) => (
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
                <FormDescription>
                    Select the species of the pet you are adding.
                </FormDescription>
                <FormMessage />
            </FormItem>
            )} />
            <FormField
            control={form.control}
            name="petBirthdate"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                    <PopoverTrigger asChild>
                    <FormControl>
                        <Button
                        variant={"outline"}
                        className={cn(
                            "w-[240px] pl-3 text-left font-normal",
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
                <FormDescription>
                    Pet's date of birth is used to calculate its age.
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <div className='flex justify-center w-full space-x-4'>
            <Button type='submit'>Create Account</Button>
        </div>
      </form>
        <Label className='text-center pt-4 flex flex-col justify-center text-muted-foreground text-sm'>
            By creating an account, a email will be sent to the owner of the pet with a random password. 
            <br />
            <span className='text-ellipsis font-bold underline'>
                The owner can change the password later.
            </span>
        </Label>
    </Form>
  );
}