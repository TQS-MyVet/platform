// src/components/columns.ts
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { Appointment } from '../data/schema';
import { Checkbox } from '@/components/ui/checkbox';

export const columns: ColumnDef<Appointment>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Appointment ID' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Title' />
    ),
    cell: ({ row }) => (
      <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
        {row.getValue('title')}
      </span>
    ),
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Type' />
    ),
    cell: ({ row }) => (
      <div className='flex w-[100px] items-center'>
        <span>{row.getValue('type')}</span>
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'doctor',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Doctor' />
    ),
    cell: ({ row }) => (
      <div className='flex items-center'>
        <span>{row.getValue('doctor')}</span>
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'startDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Start Date' />
    ),
    cell: ({ row }) => (
      <span>{new Date(row.getValue('startDate')).toLocaleString()}</span>
    ),
  },
  {
    accessorKey: 'endDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='End Date' />
    ),
    cell: ({ row }) => (
      <span>{new Date(row.getValue('endDate')).toLocaleString()}</span>
    ),
  },
  {
    accessorKey: 'pet',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Pet' />
    ),
    cell: ({ row }) => (
      <div className='flex items-center'>
        <span>{row.getValue('pet')}</span>
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'docNotes',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Doc Notes' />
    ),
    cell: ({ row }) => (
      <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
        {row.getValue('docNotes')}
      </span>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
