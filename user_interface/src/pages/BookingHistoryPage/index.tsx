import { Layout, LayoutBody} from '@/components/custom/layout'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { tasks } from './data/tasks'
import { Separator } from '@/components/ui/separator'

export default function Tasks() {
  return (
    <Layout>
      <LayoutBody className='flex flex-col mt-24' fixedHeight>
        <div className='flex items-center justify-center text-center space-y-2'>
          <div>
            <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
              Booking's History
            </h1>
            <p className='text-muted-foreground'>
              View your booking's history. All your booking's information is here.
            </p>
          </div>
        </div>
        <div className='flex justify-center pt-4'>
          <Separator className='w-1/2' />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={tasks} columns={columns} />
        </div>
      </LayoutBody>
    </Layout>
  )
}
