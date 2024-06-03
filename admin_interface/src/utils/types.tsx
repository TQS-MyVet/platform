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

export interface CalendarAppointments{
    id: number;
    start: Date;
    end: Date;
    type: string;
    doctor: User;
    pet: Pet;
    title: string;
    docNotes: string;
}

export interface GetAppointment{
    id: number;
    startDate: string;
    endDate: string;
    type: string;
    doctor: User;
    docNotes: string;
    pet: Pet;
    title: string;
}

export interface PostAppointment{
    title: string;
    type: string;
    doctorId: number;
    petId: number;
    startDate: string;
    endDate: string;
    docNotes: string;
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

export interface PostPet{
    name: string
    sex: string
    birthdate: string
    species: string
    userId: number
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
    userId?: number;
}

export interface Queue {
    userId: number;
    queueType: string;
    queuePos: number;
}