import { useEffect, useState } from 'react'
import { SunIcon, MoonIcon } from '@heroicons/react/outline'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  return (
    <>
      <Button
        variant='ghost'
        aria-label='ThemeSwitcher'
        onClick={() =>
          setTheme(
            theme === 'light' ? 'dark' : 'light'
          )
        }
        className='p-2 ml-1 cursor-pointer rounded-lg '
      >
        {hasMounted && theme === 'dark' ? (
          <MoonIcon className='h-5 w-5' />
        ) : (
          <SunIcon className='h-5 w-5' />
        )}
      </Button>
    </>
  )
}

export default ThemeSwitcher