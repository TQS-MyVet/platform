import * as React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { CalendarIcon } from 'lucide-react'
import { Button } from '@/components/custom/button'
import { format } from 'date-fns'
import { Column } from '@tanstack/react-table'
import { cn } from '@/lib/utils'

interface DataTableDateFilterProps<TData> {
  column: Column<TData, any>
  title?: string
  resetDate: boolean
  onReset: () => void
}

export function DataTableDateFilter<TData>({ column, title, resetDate, onReset }: DataTableDateFilterProps<TData>) {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null)

  React.useEffect(() => {
    if (selectedDate) {
      column.setFilterValue(format(selectedDate, 'yyyy-MM-dd'))
    } else {
      column.setFilterValue(undefined)
    }
  }, [selectedDate])

  React.useEffect(() => {
    if (resetDate) {
      setSelectedDate(null)
      onReset()
    }
  }, [resetDate])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? format(selectedDate, 'PPP') : 'Pick a date'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
