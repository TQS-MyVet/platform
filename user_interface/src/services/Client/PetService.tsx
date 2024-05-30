import config from '@/config';
import { createClient } from './client';

const client = createClient(config.API_PET_URL);

const PetService = {

    async getPets() {
        return await client.get('/');
    },

    async postPet(userId: string, data: any) {
        return await client.post(`/${userId}`, data);
    },

    async getPetById(petId: string) {
        return await client.get(`/${petId}`);
    },

    async updatePet(petId: string, data: any) {
        return await client.put(`/${petId}`, data);
    },

    async deletePet(petId: string) {
        return await client.delete(`/${petId}`);
    },

};

export { PetService };