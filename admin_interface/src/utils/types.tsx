export interface Appointment{
    id: number;
    start: Date;
    end: Date;
    type: string;
    doctor: string;
    owner: string;
    petName: string;
    title: string;
}

export interface CreateUser{
    name: string;
    email: string;
    phone: string;
}

export interface CreatePet{
    name: string;
    sex: string;
    birthdate: Date;
    species: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    roles: string[];
    pets: Pet[];
}

export interface Pet {
    id: number;
    name: string;
    sex: string;
    birthdate: string;
    species: string;
    UserId: number;
}

export interface Queue {
    userId: number;
    queueType: string;
    queuePos: number;
}