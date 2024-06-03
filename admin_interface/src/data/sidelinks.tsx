import {
  LogIn,
  Home,
  UserPlus,
  CalendarPlus,
  Dog,
  UsersRound,
  UserCog
} from 'lucide-react'
import { useUserStore } from '@/stores/useUserStore'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
  roles?: string[] // Adiciona a propriedade roles para NavLink
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const sidelinks: SideLink[] = [
  {
    title: 'Home',
    label: '',
    href: '/',
    icon: <Home size={18} />,
  },
  {
    title: 'Login',
    label: '',
    href: '/login',
    icon: <LogIn size={18} />,
  },
  {
    title: "Account's Management",
    label: '',
    href: '',
    roles: ['RECEPTIONIST'], // Apenas para usuários com role DOCTOR
    icon: <UserCog size={18} />,
    sub: [
      {
        title: 'Create Account',
        label: '',
        href: '/account',
        icon: <UserPlus size={18} />,
        roles: ['RECEPTIONIST'], 
      },
      {
        title: 'All Accounts',
        label: '',
        href: '/accounts',
        icon: <UsersRound size={18} />,
        roles: ['RECEPTIONIST'], // Apenas para usuários com role DOCTOR
      },
    ],
  },
  {
    title: 'Booking Appointment',
    label: '',
    href: '/booking',
    icon: <CalendarPlus size={18} />,
    roles: ['RECEPTIONIST', 'DOCTOR'], // Apenas para usuários com role DOCTOR
  },
  {
    title: 'Queue Management',
    label: '',
    href: '/queue',
    icon: <Dog size={18} />,
    roles: ['RECEPTIONIST', 'DOCTOR'], // Apenas para usuários com role DOCTOR
  },
]

export function getFilteredLinks(userRoles: string[]): SideLink[] {
  return sidelinks
    .filter(link => !link.roles || link.roles.some(role => userRoles.includes(role)))
    .map(link => ({
      ...link,
      sub: link.sub?.filter(subLink => !subLink.roles || subLink.roles.some(role => userRoles.includes(role))),
    }))
}