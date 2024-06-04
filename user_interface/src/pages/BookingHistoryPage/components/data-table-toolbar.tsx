import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/custom/button'
import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from '../components/data-table-view-options'
import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { DataTableDateFilter } from './data-table-date-filter'
import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { UserService } from '@/services/Client/UserService'
import { User } from '@/utils/types'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const [resetDate, setResetDate] = React.useState(false)
  const [doctors, setDoctors] = React.useState<User[]>([])

  const handleReset = () => {
    table.resetColumnFilters()
    setResetDate(true)
    setTimeout(() => setResetDate(false), 0) // Reset the state back to false
  }

  const getUsers = async () => {
    const users = (await UserService.getUsers()).data as User[]
    return users
  }

  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })

  useEffect(() => {
    if (users) {
      const doctors = users?.filter(user => user.roles.includes('DOCTOR'));
      setDoctors(doctors)
    }
  }, [users])


  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder='Filter tasks...'
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('title')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
        <div className='flex gap-x-2'>
          {table.getColumn('type') && (
            <DataTableFacetedFilter
              column={table.getColumn('type')}
              title='Type'
              options={[
                { value: 'clinicalAnalysis', label: 'Clinical analysis' },
                { value: 'anesthesia', label: 'Anesthesia/Analgesia' },
                { value: 'softSurgery', label: 'Soft Tissue Surgery' },
                { value: 'orthopedicSurgery', label: 'Orthopedic Surgery' },
                { value: 'dentalSurgery', label: 'Dental Surgery' },
                { value: 'vaccination', label: 'Vaccination' },
                { value: 'consultation', label: 'Consultation' },
                { value: 'other', label: 'Other' },
              ]}
            />
          )}
          {table.getColumn('doctor') && (
            <DataTableFacetedFilter
              column={table.getColumn('doctor')}
              title='doctor'
              options={doctors.map((doctor) => ({
                value: doctor.name,
                label: doctor.name,
              }))}
            />
          )}
          {table.getColumn('startDate') && (
            <DataTableDateFilter
              column={table.getColumn('startDate')}
              title='Start Date'
              resetDate={resetDate}
              onReset={() => setResetDate(false)}
            />
          )}
        </div>
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={handleReset}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
