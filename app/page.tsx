import Navbar from './navbar'
import Content from './content'

export default function Home() {

  return (
    <div className='bg-inherit h-svh'>
      

      <div className='sticky bg-inherit top-0 z-100'>
        <Navbar />
      </div>
      <div className='transition-all max-sm:w-4/5 max-md:w-3/4 max-lg:w-2/3 max-xl:w-2/3 max-w-screen-lg  mx-auto'>
        <Content />
      </div>
      
    </div>
  )
}
