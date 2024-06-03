import { useEffect, useState } from 'react'
import { IconChevronsLeft, IconMenu2, IconX, IconLogout } from '@tabler/icons-react'
import { Layout, LayoutHeader } from '@/components/custom/layout'
import { Button } from '@/components/custom/button'
import Nav from './components/nav'
import { cn } from '@/lib/utils'
import { getFilteredLinks } from '@/data/sidelinks'
import LogoRed from '@/assets/Logo Red Larger (WB).png'
import LogoRedWhite from '@/assets/Logo Red White.png'
import { useTheme } from '@/components/theme-provider'
import { useUserStore } from '@/stores/useUserStore'
import { useToast } from '@/components/ui/use-toast'
import { useNavigate } from '@tanstack/react-router'

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  isCollapsed: boolean
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Sidebar2({
  className,
  isCollapsed,
  setIsCollapsed,
}: Readonly<SidebarProps>) {
  const [navOpened, setNavOpened] = useState(false)

  const user = useUserStore()
  const { toast } = useToast()
  const navigate = useNavigate()
  const token = user.token // Acessa o token do usuário

  const handleLogout = () => {
    user.logout()
    toast({
      variant: 'success',
      title: 'Logout successful',
      description: 'You have been successfully logged out',
    })
    navigate({to: '/login'})
  }

  //verifica se esta em light ou dark mode
    const { theme } = useTheme()

  /* Make body not scrollable when navBar is opened */
  useEffect(() => {
    if (navOpened) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [navOpened])

  // Obtém os links filtrados
  const filteredLinks = getFilteredLinks(user.roles, token)

  return (
    <aside
      className={cn(
        `fixed left-0 right-0 top- z-50 0 w-full border-r-2 border-r-muted transition-[width] md:bottom-0 md:right-auto md:h-svh ${isCollapsed ? 'md:w-14' : 'md:w-64'}`,
        className
      )}
    >
      {/* Overlay in mobile */}
      <div
        onClick={() => setNavOpened(false)}
        className={`absolute inset-0 transition-[opacity] delay-100 duration-700 ${navOpened ? 'h-svh opacity-50' : 'h-0 opacity-0'} w-full bg-black md:hidden`}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            setNavOpened(false)
          }
        }} 
        />

      <Layout>
        {/* Header */}
        <LayoutHeader className='sticky top-0 justify-between px-4 py-3 md:px-4'>
            <div className={`flex items-center ${!isCollapsed ? 'gap-2' : ''}`}>
                {theme === 'light' && (
                    <img 
                    src={LogoRed}
                    alt='Shadcn Admin Logo'
                    className={`transition-all ${isCollapsed ? 'h-8 w-8' : 'h-10 w-10'}`}
                    />
                )}
                {theme === 'dark' && (
                    <img 
                    src={LogoRedWhite}
                    alt='Shadcn Admin Logo'
                    className={`transition-all ${isCollapsed ? 'h-6 w-6' : 'h-10 w-10'}`}
                    />
                )}
                <div
                className={`flex flex-col justify-end truncate ${isCollapsed ? 'invisible w-0' : 'visible w-auto'}`}
                >
                    <span className='font-medium'>{user.token ? user.name : 'Admin Interface'}</span>
                    <span className='text-xs'>
                    {user.token ? user.email : 'Doctor and Receptionist Interface'}
                    </span>
                </div>
                {user.token && (
                    <Button
                    variant='ghost'
                    size='icon'
                    aria-label='Logout'
                    className='pl-4'
                    onClick={() => handleLogout()}
                    >
                    <IconLogout size={18} />
                    </Button>
                )}
            </div>

          {/* Toggle Button in mobile */}
          <Button
            variant='ghost'
            size='icon'
            className='md:hidden'
            aria-label='Toggle Navigation'
            aria-controls='sidebar-menu'
            aria-expanded={navOpened}
            onClick={() => setNavOpened((prev) => !prev)}
          >
            {navOpened ? <IconX size={18} /> : <IconMenu2 size={18} />}
          </Button>
        </LayoutHeader>

        {/* Navigation links */}
        <Nav
          id='sidebar-menu'
          className={`h-full flex-1 overflow-auto ${navOpened ? 'max-h-screen' : 'max-h-0 py-0 md:max-h-screen md:py-2'}`}
          closeNav={() => setNavOpened(false)}
          isCollapsed={isCollapsed}
          links={filteredLinks} // Passa os links filtrados
        />

        {/* Scrollbar width toggle button */}
        <Button
          onClick={() => setIsCollapsed((prev) => !prev)}
          size='icon'
          variant='outline'
          className='absolute -right-5 top-1/2 hidden rounded-full md:inline-flex'
        >
          <IconChevronsLeft
            stroke={1}
            className={`h-5 w-5 ${isCollapsed ? 'rotate-180' : ''}`}
          />
        </Button>
      </Layout>
    </aside>
  )
}
