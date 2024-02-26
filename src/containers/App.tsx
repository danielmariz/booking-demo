import { LocalizationProvider } from '@mui/x-date-pickers-pro'
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs'
import Booking from '@components/Booking'
import BookingsList from '@components/BookingsList';
import MainHeader from '@components/MainHeader';

function App() {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MainHeader />
      <div className='grid grid-cols-1 gap-6 place-content-center h-full w-full p-6 lg:grid-cols-3'>
        <div className='order-first lg:order-last'> 
          <Booking />
        </div>
        <div className='col-span-1 lg:col-span-2'>
          <BookingsList />
        </div>
      </div>
    </LocalizationProvider>
  )
}

export default App
