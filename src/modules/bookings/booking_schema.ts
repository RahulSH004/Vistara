import {z} from 'zod'

export const bookingschema = z.object({

    roomId: z.string(),
    checkInDate : z.coerce.date(),
    checkOutDate: z.coerce.date(),
    guests: z.number().positive('only postive value')
}) 