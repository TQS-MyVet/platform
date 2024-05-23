import config from '@/config';
import { createClient } from './client';

const client = createClient(config.API_USER_URL);

const UserService = {
};

export { UserService };
