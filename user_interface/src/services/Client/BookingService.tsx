import config from '@/config';
import { createClient } from './client';

const client = createClient(config.API_APPOINTMENT_URL);

const BookingService = {

    async getBookings() {
        return await client.get('');
    },

    async postBooking(data: any) {
        return await client.post('', data);
    },

    async getBookingById(bookingId: string) {
        return await client.get(`/${bookingId}`);
    },

    async updateBooking(bookingId: string, data: any) {
        return await client.put(`/${bookingId}`, data);
    },

    async deleteBooking(bookingId: string) {
        return await client.delete(`/${bookingId}`);
    },

    async getBookingByPet(petId: string) {
        return await client.get(`/pet/${petId}`);
    },

    async getBookingByDate(date: string) {
        return await client.get(`/date/?date=${date}`);
    },

    async getBookingByType(type: string) {
        return await client.get(`/type/?type=${type}`);
    }
};

export { BookingService };