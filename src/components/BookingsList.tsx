import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from "@mui/material/ListItemText";
import { DateRangeIcon } from "@mui/x-date-pickers";
import { useBookingsStore } from "@utils/store";
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@utils/constants';
import Box from '@ui/Box';

const BookingsList = () => {
    const bookings = useBookingsStore(state => state.bookins)
    const remove = useBookingsStore(state => state.remove)
    const edit = useBookingsStore(state => state.edit)

    const formatDate = (value:Date) => dayjs(value).format(DATE_FORMAT)

    return (
        <Box className='space-y-4'>
            <h2>My Bookings</h2>
            {
                bookings?.length 
                ? <List className='space-y-4' data-testid='bookings-list'>
                    {
                        bookings.map((booking, index) => (
                            <ListItem data-testid={`booking-details-${index}`}
                                key={booking.id}
                                secondaryAction={
                                    <div className='space-x-2'> 
                                        <IconButton edge="start" aria-label="edit" onClick={() => {edit(booking.id)}}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton edge="end" aria-label="delete" onClick={() => {remove(booking.id)}}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        <DateRangeIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`Guests ${booking.guests} - Dates: ${formatDate(booking.startDate)} - ${formatDate(booking.endDate)}`}
                                    secondary={booking?.description}
                                />
                            </ListItem>
                        ))
                    }
                </List>
                : <p data-testid='bookings-empty-message'>No bookings yet, try creating one!</p>
            }
        </Box>
    )
}

export default BookingsList