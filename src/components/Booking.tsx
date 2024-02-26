// Utils
import { useEffect, useState } from 'react'
import dayjs, { type Dayjs } from 'dayjs'
import { v4 as uuidv4 } from 'uuid'
import { useBookingsStore } from '@utils/store'
// Components
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import Textarea from '@ui/Textarea'
import Input from '@components/ui/Input'
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker'
import { type DateRange } from '@mui/x-date-pickers-pro/internals/models/range'
import Box from '@ui/Box'
import { type FieldChangeHandlerContext } from '@mui/x-date-pickers/internals'

type BookingFormEvent = React.FormEvent<HTMLFormElement> & {
  target: HTMLFormElement
}
export interface DateRangeProps extends Dayjs {
  $d: Date
}
const defaultMaxDate = dayjs().add(2, 'month') as DateRangeProps
const defaultMinDate = dayjs(new Date()) as DateRangeProps

export default function Booking () {
  // store events
  const edit = useBookingsStore(state => state.edit)
  const update = useBookingsStore(state => state.update)
  // store data
  const bookings = useBookingsStore(state => state.bookins)
  const editing = useBookingsStore(state => state.editing)
  // local state
  const [dateRange, setDateRange] = useState<DateRange<DateRangeProps>>([null, null])
  const [maxDate, setMaxDate] = useState<DateRangeProps>(defaultMaxDate)
  const [minDate, setMinDate] = useState<DateRangeProps>(defaultMinDate)
  const [guests, setGuests] = useState<number>(1)
  const [description, setDescription] = useState<string>('')

  useEffect(() => {
    const editingDateRange = editing
      ? [
          dayjs(editing.startDate),
          dayjs(editing.endDate)
        ]
      : [null, null]
    setDateRange(editingDateRange as DateRange<DateRangeProps>)
    setGuests(editing?.guests ?? 1)
    setDescription(editing?.description ?? '')
    if (editing) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth' // Optional: Smooth scrolling behavior
      })
    }
  }, [editing])

  /**
     * Disable booked dates accordingly.
     * @param {DateRangeProps} day The date to check availability.
     * @returns {boolean}
     * @description This function is necessary to avoid double overlapping bookings by blocking all dates already booked
     */
  const disableBookedDates = (day: DateRangeProps) => {
    if (!bookings) { return false }

    const date = day.$d

    for (let i = 0; i < bookings.length; i++) {
      const { startDate, endDate, id } = bookings[i]
      if (editing && id === editing.id) {
        return false
      } else if (date >= new Date(startDate) && date <= new Date(endDate)) {
        return true
      }
    }

    return false
  }

  /**
     * Finds the closest next start booked date after the provided start date and sets the max date accordingly.
     * @param {DateRangeProps} startDate The start date to check availability ahead.
     * @returns {void}
     * @description This function is necessary to avoid double overlapping bookings by blocking all dates ahead from next booked date
     */
  const checkAvailableDatesAhead = (startDate: DateRangeProps) => {
    const closestNextStartDate = bookings.find(booking => new Date(booking.startDate) > startDate.$d)
    if (closestNextStartDate) { setMaxDate(dayjs(closestNextStartDate?.startDate).subtract(1, 'day') as DateRangeProps) }
  }

  /**
     * Finds the closest previous end booked date after the provided start date and sets the min date accordingly.
     * @param {DateRangeProps} endDate The end date to check availability behind.
     * @returns {void}
     * @description This function is necessary to avoid double overlapping bookings by blocking all dates behind from previous booked date
     */
  const checkAvailableDatesBehind = (endDate: DateRangeProps) => {
    const findEndDateInReverse = () => {
      for (let i = bookings.length - 1; i >= 0; i--) {
        if (new Date(bookings[i].endDate) < endDate.$d) {
          return bookings[i]
        }
      }
      return null
    }
    const closestPreviousEndDate = findEndDateInReverse()
    if (closestPreviousEndDate) { setMinDate(dayjs(closestPreviousEndDate?.startDate).add(1, 'day') as DateRangeProps) }
  }

  const dateRangeChangeHandler = (value: DateRange<DateRangeProps>, context: FieldChangeHandlerContext<Array<string | null>>) => {
    // prevent typed disabled dates to be set
    if (context.validationError[0] !== null || context.validationError[1] !== null) {
      setDateRange([null, null])
      return
    }

    const [startDate, endDate] = value
    // Block ahead booked dates
    if (startDate && !endDate && (bookings.length > 0)) {
      checkAvailableDatesAhead(startDate)
    }

    // Block behind booked dates
    if (!startDate && endDate && (bookings.length > 0)) {
      checkAvailableDatesBehind(endDate)
    }

    // Set date range and reset min and max dates
    if (startDate && endDate) {
      setDateRange(value)
      setMaxDate(defaultMaxDate)
      setMinDate(defaultMinDate)
    }
  }

  const submitHandler = (e: BookingFormEvent) => {
    e.preventDefault()

    const [startDate, endDate] = dateRange as DateRange<DateRangeProps>

    update({
      id: editing ? editing.id : uuidv4(),
      startDate: startDate!.$d,
      endDate: endDate!.$d,
      description,
      guests
    })

    // reset the dates and form
    resethandler(e)
  }

  const resethandler = (e: BookingFormEvent) => {
    e.preventDefault()
    if (editing) {
      // reset editing booking
      edit(null)
    } else {
      // reset state
      setDateRange([null, null])
      setDescription('')
      setGuests(1)
    }
    e.target.reset()
  }

  const isDisabled = dateRange.includes(null)

  return (
        <Box>
            <form data-testid='booking-form' onSubmit={submitHandler} onReset={resethandler}>
                <fieldset className='space-y-4'>
                    <legend data-testid='form-title'>{editing ? 'Update booking' : 'Create a booking'}</legend>
                    <DateRangePicker label='Dates'
                        localeText={{ start: 'Check-in', end: 'Check-out' }}
                        disablePast={true}
                        value={dateRange ?? [null, null]}
                        onChange={dateRangeChangeHandler}
                        maxDate={maxDate}
                        minDate={minDate}
                        shouldDisableDate={disableBookedDates}
                        slotProps={{
                          actionBar: {
                            actions: ['clear']
                          }
                        }}
                    />
                    <InputLabel htmlFor='guests'>Guests</InputLabel>
                    <Input data-testid='booking-guests' id='guests' type='number' aria-label='Guests quantity' onChange={(e) => { setGuests(Number(e.currentTarget.value)) }} value={guests} min={1} max={10} />
                    <Textarea data-testid='booking-description' aria-label="Booking description" minRows={3} placeholder="Add notes to your booking" value={description} onChange={(e) => { setDescription(e.currentTarget.value) }} />
                    <div className='space-x-2'>
                        <Button id='booking-submit' type="submit" className='mt-2' variant="contained" disabled={isDisabled}>{`${editing ? 'Update' : 'Request'} booking`}</Button>
                        {editing && <Button id='booking-reset' type="reset" className='mt-2' variant="outlined">Cancel</Button>}
                    </div>
                </fieldset>
            </form>
        </Box>
  )
}
