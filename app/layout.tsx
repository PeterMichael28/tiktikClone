import Navbar from '@/components/Navbar';
import './globals.css'
import Sidebar from '@/components/Sidebar';



export const metadata = {
  title: 'Tiktik Clone',
  description: 'Cloned by michael peter',
}

export const base_url = 'http://localhost:3000'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en">
      <body>
          <div className='xl:w-[1200px] m-auto overflow-hidden h-[100vh]'>
       
        <Navbar/>
       
        <div className='flex gap-6 md:gap-20'>
          <div className='h-[92vh] overflow-hidden lg:hover:overflow-auto'>
           < Sidebar />
          </div>

          <div className='flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1 mt-4'>
             { children }
          </div>
        </div>
            
        </div>
      
       
        </body>
    </html>
  )
}
