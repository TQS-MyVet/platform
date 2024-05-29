import config from '@/config';
import { createClient } from './client';

const client = createClient(config.API_QUEUE_URL);

const QueueService = {

    async getQueues() {
        return await client.get('');
    },

    async postReceptionistQueue(userId: number) {
        return await client.post(`/receptionist/${userId}`);
    },

    async postDoctorQueue(userId: number) {
        return await client.post(`/doctor/${userId}`);
    },

    async getQueuesReceptionistByUserId(userId: number) {
        return await client.get(`/receptionist/${userId}`);
    },

    async getQueuesDoctorByUserId(userId: number) {
        return await client.get(`/doctor/${userId}`);
    },

    async deleteFirstOfTheQueueReceptionist() {
        return await client.delete('/receptionist');
    },

    async deleteFirstOfTheQueueDoctor() {
        return await client.delete('/doctor');
    }

};

export { QueueService };