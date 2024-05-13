import {
  CircleAlert,
  LayoutDashboard,
  MessagesSquare,
  Route,
  Settings,
  LogIn,
  Home,
  UserPlus,
  CalendarPlus,
  Dog,
} from 'lucide-react'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
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
    title: 'Account Creation',
    label: '',
    href: '/account',
    icon: <UserPlus size={18} />,
  },
  {
    title: 'Booking Appointment',
    label: '',
    href: '/booking',
    icon: <CalendarPlus size={18} />,
  },
  {
    title: 'Queue Management',
    label: '',
    href: '/queue',
    icon: <Dog size={18} />,
  },
]
