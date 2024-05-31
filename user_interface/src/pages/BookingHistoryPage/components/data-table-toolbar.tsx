import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/custom/button'
import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from '../components/data-table-view-options'
import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { DataTableDateFilter } from './data-table-date-filter'
import React from 'react'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const [resetDate, setResetDate] = React.useState(false)

  const handleReset = () => {
    table.resetColumnFilters()
    setResetDate(true)
    setTimeout(() => setResetDate(false), 0) // Reset the state back to false
  }

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder='Filter tasks...'
          value={(table.getColumn('docNotes')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('docNotes')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
        <div className='flex gap-x-2'>
          {table.getColumn('type') && (
            <DataTableFacetedFilter
              column={table.getColumn('type')}
              title='Type'
              options={[
                { value: 'Clinical analysis', label: 'Clinical analysis' },
                { value: 'Anesthesia/Analgesia', label: 'Anesthesia/Analgesia' },
                { value: 'Soft Tissue Surgery', label: 'Soft Tissue Surgery' },
                { value: 'Orthopedic Surgery', label: 'Orthopedic Surgery' },
                { value: 'Dental Surgery', label: 'Dental Surgery' },
                { value: 'Vaccination', label: 'Vaccination' },
                { value: 'Consultation', label: 'Consultation' },
                { value: 'other', label: 'Other' },
              ]}
            />
          )}
          {table.getColumn('doctor') && (
            <DataTableFacetedFilter
              column={table.getColumn('doctor')}
              title='doctor'
              options={[
                { value: 'Dr. Smith', label: 'Dr. Smith' },
                { value: 'Dr. Johnson', label: 'Dr. Johnson' },
                { value: 'Dr. Williams', label: 'Dr. Williams' },
                { value: 'Dr. Brown', label: 'Dr. Brown' },
                { value: 'Dr. Jones', label: 'Dr. Jones' },
              ]}
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
