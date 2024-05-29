import { useState } from 'react';
import {
  IconAdjustmentsHorizontal,
  IconSortAscendingLetters,
  IconSortDescendingLetters,
} from '@tabler/icons-react';
import { Layout, LayoutBody } from '@/components/custom/layout';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

// query
import { useQuery } from '@tanstack/react-query';
import { UserService } from '@/services/Client/UserService';
import { User } from '@/utils/types';
import { Dog } from 'lucide-react';
import UserInfoDialog from './components/UserInfoDialog';
import EditUserDialog from './components/EditUserDialog';


const animalsText = new Map<string, string>([
  ['dog', 'Dog'],
  ['cat', 'Cat'],
  ['bird', 'Bird'],
  ['rabbit', 'Rabbit'],
  ['rodent', 'Rodent'],
  ['reptile', 'Reptile'],
  ['allAnimals', 'All Animals'],
  ['snail', 'Snail'],
]);

export default function Apps() {
  const [sort, setSort] = useState('ascending');
  const [searchTerm, setSearchTerm] = useState('');
  const [animals, setAnimals] = useState('allAnimals');
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Get all the accounts
  const getUsers = async () => {
    const response = await UserService.getUsers();
    console.log(response.data);
    return response.data;
  };

  const { data: users, isSuccess } = useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const filteredUsers = users
    ?.sort((a, b) =>
      sort === 'ascending'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    )
    .filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((user) => animals === 'allAnimals' || (user.pets && user.pets.some((pet) => pet.species === animals)));

  const handleOpenDialog = (user: User) => {
    setSelectedUser(user);
    setIsInfoDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedUser(null);
    setIsInfoDialogOpen(false);
  };

  const handleOpenEditDialog = () => {
    setIsEditDialogOpen(true);
    setIsInfoDialogOpen(false); // Fecha o diálogo de informações
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
  };

  return (
    <Layout fadedBelow fixedHeight>
      {/* ===== Content ===== */}
      <LayoutBody className='flex flex-col' fixedHeight>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>
            All Accounts
          </h1>
          <p className='text-muted-foreground'>
            Here&apos;s a list of all the accounts the vet clinic has.
          </p>
        </div>
        <div className='my-4 flex items-end justify-between sm:my-0 sm:items-center'>
          <div className='flex flex-col gap-4 sm:my-4 sm:flex-row'>
            <Input
              placeholder='Filter accounts...'
              className='h-9 w-40 lg:w-[250px]'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={animals} onValueChange={setAnimals}>
              <SelectTrigger className='w-36'>
                <SelectValue>
                  {animalsText.get(animals)}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='allAnimals'>All Animals</SelectItem>
                <SelectItem value='dog'>Dog</SelectItem>
                <SelectItem value='cat'>Cat</SelectItem>
                <SelectItem value='bird'>Bird</SelectItem>
                <SelectItem value='rabbit'>Rabbit</SelectItem>
                <SelectItem value='rodent'>Rodent</SelectItem>
                <SelectItem value='reptile'>Reptile</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className='w-16'>
              <SelectValue>
                <IconAdjustmentsHorizontal size={18} />
              </SelectValue>
            </SelectTrigger>
            <SelectContent align='end'>
              <SelectItem value='ascending'>
                <div className='flex items-center gap-4'>
                  <IconSortAscendingLetters size={16} />
                  <span>Ascending</span>
                </div>
              </SelectItem>
              <SelectItem value='descending'>
                <div className='flex items-center gap-4'>
                  <IconSortDescendingLetters size={16} />
                  <span>Descending</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Separator className='shadow' />
        <div className='no-scrollbar grid gap-4 overflow-y-scroll pb-16 pr-4 pt-4 md:grid-cols-2 lg:grid-cols-3'>
          {isSuccess && filteredUsers?.map((user) => (
            <div key={user.id} className='rounded-lg border p-4 hover:shadow-md' onClick={() => handleOpenDialog(user)}>
              <div className='mb-8 flex items-center justify-between'>
                <div className={`flex size-10 items-center justify-center rounded-lg bg-muted p-2`}>
                  <Dog />
                </div>
                <div>
                  {/* {user.Pets.map((pet) => renderAnimalButton(pet.species))} */}
                </div>
              </div>
              <div className='flex flex-row items-center justify-between'>
                <div className='flex justify-center flex-col'>
                  <h2 className='mb-1 text-start xl:text-start md:text-center font-semibold'>{user.name}</h2>
                  <p className='line-clamp-2 lg:text-start text-center justify-start text-gray-500'>{user.email}</p>
                </div>
                <div>
                  Tlm: <span className='font-semibold'>{user.phone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </LayoutBody>
      {selectedUser && (
        <>
          <UserInfoDialog
            account={selectedUser}
            isInfoDialogOpen={isInfoDialogOpen}
            setIsInfoDialogOpen={handleCloseDialog}
            openEditDialog={handleOpenEditDialog} // Passa a função para abrir o EditUserDialog
          />
          <EditUserDialog
            user={selectedUser}
            isOpen={isEditDialogOpen}
            setIsOpen={handleCloseEditDialog}
          />
        </>
      )}
    </Layout>
  );
}
