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
    birthdate: string;
    species: string;
}