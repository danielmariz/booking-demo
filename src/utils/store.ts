import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

const removeItemById = (list: Booking[], idToRemove: Booking['id']) => {
  // Find the index of the item with the specified ID
  const indexToRemove = list.findIndex(item => item.id === idToRemove)

  // If the index is found, remove the item using splice
  if (indexToRemove !== -1) {
    list.splice(indexToRemove, 1)
  }

  return list
}

export const useBookingsStore = create<BookinsState>()(
  devtools(
    persist(
      (set) => ({
        bookins: [],
        editing: null,
        update: (data) => {
          set((store) => {
            if (store.editing) {
              let updatedList = [...store.bookins]
              const updatingBookingIndex = store.bookins.findIndex(booking => booking.id === data.id)
              // prevent any issue
              if (updatingBookingIndex !== -1) {
                updatedList = [
                  ...updatedList.slice(0, updatingBookingIndex),
                  data,
                  ...updatedList.slice(updatingBookingIndex + 1)
                ]
              }
              return {
                bookins: updatedList
              }
            } else {
              return { bookins: [...store.bookins, data].sort((a, b) => +new Date(a.startDate) - +new Date(b.startDate)) }
            }
          })
        },
        remove: (bookingId) => {
          set((store) => ({
            bookins: [...removeItemById(store.bookins, bookingId)]
          }))
        },
        edit: (bookingId) => {
          set((store) => {
            const bookingToEdit = bookingId ? store.bookins.find(booking => booking.id === bookingId) : null
            return {
              editing: bookingToEdit
            }
          })
        }
      }),
      {
        name: 'bookins-storage'
      }
    )
  )
)
