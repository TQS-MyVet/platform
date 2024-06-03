import { create } from 'zustand';
import { parseJWT } from '@/utils/jwt'
import { Pet } from '@/utils/types';

interface UserState {
    token: string;
    name: string;
    email: string;
    phone: string;
    roles: string[];
    sub: string;
    pets: Pet[];
}

type UserActions = {
    login: (token: string) => void;
    logout: () => void;
    setUserInformation: (data: any) => void;
};

export const useUserStore = create<UserState & UserActions>((set) => ({
    token: '',
    name: '',
    email: '',
    phone: '',
    roles: [],
    pets: [],
    sub: '',
    login: (token) => {
        const user = parseJWT(token);
        console.log(user);
        set({
            token: token,
            ...user,
        });
    },
    setUserInformation: (data: any) => {
        set({
            name: data.name,
            email: data.email,
            phone: data.phone,
            roles: data.roles,
            pets: data.pets,
        });
    },
    logout: () => {
        set({
            token: '',
            name: '',
            email: '',
            phone: '',
            roles: [],
            pets: [],
        });
    },
}));


