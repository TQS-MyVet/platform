import { useState } from 'react'
import {
  IconAdjustmentsHorizontal,
  IconSortAscendingLetters,
  IconSortDescendingLetters,
} from '@tabler/icons-react'
import { Layout, LayoutBody} from '@/components/custom/layout'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/custom/button'
import { apps } from '@/data/accounts'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


const animalsText = new Map<string, string>([
  ['dog', 'Dog'],
  ['cat', 'Cat'],
  ['bird', 'Bird'],
  ['rabbit', 'Rabbit'],
  ['rodent', 'Rodent'],
  ['reptile', 'Reptile'],
  ['allAnimals', 'All Animals'],
  ['snail', 'Snail'],
])


export default function Apps() {
  const [sort, setSort] = useState('ascending')
  const [searchTerm, setSearchTerm] = useState('')
  const [animals, setAnimals] = useState("allAnimals")

  function renderAnimalButton(animal: string) {
    let color;
    switch (animal) {
      case 'dog':
        color = 'blue';
        break;
      case 'cat':
        color = 'green';
        break;
      case 'bird':
        color = 'yellow';
        break;
      case 'rabbit':
        color = 'red';
        break;
      case 'rodent':
        color = 'purple';
        break;
      case 'reptile':
        color = 'indigo';
        break;
      default:
        console.log('No animal found');
        return null;
    }
  
    return (
      <Button
        variant='outline'
        size='sm'
        className={`border mr-2 border-${color}-300 bg-${color}-50 hover:bg-${color}-100 dark:border-${color}-700 dark:bg-${color}-950 dark:hover:bg-${color}-900`}
      >
        {animalsText.get(animal)}
      </Button>
    );
  }

  const filteredApps = apps
    .sort((a, b) =>
      sort === 'ascending'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    )
    .filter((app) => app.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((app) => animals === 'allAnimals' || app.animals.includes(animals))

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
        <div className='no-scrollbar grid gap-4 overflow-y-scroll pb-16 pt-4 md:grid-cols-2 lg:grid-cols-3'>
          {filteredApps.map((app) => (
            <Dialog key={app.name}>
              <DialogTrigger>
                <div
                  className='rounded-lg border p-4 hover:shadow-md'
                >
                  <div className='mb-8 flex items-center justify-between'>
                    <div
                      className={`flex size-10 items-center justify-center rounded-lg bg-muted p-2`}
                    >
                      {app.logo}
                    </div>
                    <div>
                    {app.animals.map((animal) => renderAnimalButton(animal))}
                    </div>
                  </div>
                  <div className='flex justify-center flex-col'>
                    <h2 className='mb-1 lg:text-start text-center font-semibold'>{app.name}</h2>
                    <p className='line-clamp-2 lg:text-start text-center justify-start text-gray-500'>{app.desc}</p>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{app.name}</DialogTitle>
                </DialogHeader>
                <DialogDescription>{app.desc}</DialogDescription>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </LayoutBody>
    </Layout>
  )
}
