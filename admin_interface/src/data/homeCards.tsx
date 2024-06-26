import CreateAccount from '@/assets/create-account.jpg';
import AllAccounts from '@/assets/all-accounts.jpg';
import BookAppointment from '@/assets/book-appointment.jpg';
import QueueManagement from '@/assets/queue-management.jpg';

export const homeCardsReceptionist = [
    {
        link: "/account",
        image: CreateAccount,
        alt: "Create Account Background",
        title: "Create Account",
      },
      {
        link: "/accounts",
        image: AllAccounts,
        alt: "All Accounts Background",
        title: "All Accounts",
      },
      {
        link: "/booking",
        image: BookAppointment,
        alt: "Book Appointment Background",
        title: "Book Appointment",
      },
      {
        link: "/queue",
        image: QueueManagement,
        alt: "Queue Management Background",
        title: "Queue Management",
      },
    ];

export const homeCardsDoctor = [
    {
        link: "/queue",
        image: QueueManagement,
        alt: "Queue Management Background",
        title: "Queue Management",
    },
    {
      link: "/accounts",
      image: AllAccounts,
      alt: "All Accounts Background",
      title: "All Accounts",
    },
    {
      link: "/petAppointments",
      image: BookAppointment,
      alt: "Record Appointment Results Background",
      title: "Record Appointment Results",
    }
  ];