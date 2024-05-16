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