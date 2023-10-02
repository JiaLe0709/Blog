import Link from 'next/link'
import Logo from '@/components/Common/Logo'

const Page404 = ({ statusCode }) => {
  return (
      <div className='py-6 sm:py-8 lg:py-12'>
      <div className='max-w-screen-2xl px-4 md:px-8 mx-auto'>
        <div className='flex flex-col items-center'>
          <div className='inline-flex items-center gap-2.5 mb-8'>
            <Logo/>
          </div>

          <p className='text-sm md:text-base font-semibold uppercase mb-4'>
          Some errors have occurred
          </p>
          <h1 className='text-2xl md:text-3xl font-bold text-center mb-2'>
            {statusCode
              ? `${statusCode} Page Not Found`
              : `${statusCode} Error`}
          </h1>

          <p className='max-w-screen-md md:text-lg text-center mb-12'>
          Please try to refresh the page, or return to the home page and search, if you have any questions, contact me.
          </p>

          <Link
            href='/'
            scroll={false}
            className='inline-block bg-gray-200 dark:bg-neutral-800 hover:bg-gray-300 dark:hover:bg-neutral-800 text-sm md:text-base font-semibold text-center rounded-lg outline-none px-8 py-3'
          >
            Home
          </Link>
        </div>
      </div>
    </div>
      
  )
}

export default Page404