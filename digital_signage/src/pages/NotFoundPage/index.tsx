import { useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/custom/button'

export default function NotFoundPage() {
    
  const navigate = useNavigate()
  return (
    <div className='h-svh'>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        <h1 className='text-[7rem] font-bold leading-tight'>404</h1>
        <span className='font-medium'>Oops! Page Not Found!</span>
        <p className='text-center text-muted-foreground'>
          It seems like the page you're looking for <br />
          does not exist or might have been removed.
        </p>
        <div className='mt-6 flex gap-4'>
          <Button onClick={() => navigate({to: '/'})}>Back to Home</Button>
        </div>
      </div>
    </div>
  )
}
