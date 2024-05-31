import config from '@/config';
import { createClient } from './client';

const client = createClient(config.API_USER_URL);

const UserService = {

    async getUsers() {
        return await client.get('');
    },

    async postUser(data: any) {
        return await client.post('', data);
    },

    async getUserPets(userId: string) {
        return await client.get(`/${userId}/pets`);
    },

    async getUserByName(name: string) {
        return await client.get('/name?name=' + name);
    }, 

    async getUserById(userId: string) {
        return await client.get(`/${userId}`);
    },

    async updateUser(userId: string, data: any) {
        return await client.put(`/${userId}`, data);
    },

    async deleteUser(userId: string) {
        return await client.delete(`/${userId}`);
    },

};

export { UserService };
