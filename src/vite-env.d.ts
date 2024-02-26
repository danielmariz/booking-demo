/// <reference types="vite/client" />

interface Booking {
  id: string
  startDate: Date
  endDate: Date
  guests: number
  description?: string
}

interface BookinsState {
  bookins: Booking[]
  editing: Booking | null
  remove: (bookingId: Booking['id']) => void
  edit: (bookingId: Booking['id'] | null) => void
  update: (data: Booking) => void
}
