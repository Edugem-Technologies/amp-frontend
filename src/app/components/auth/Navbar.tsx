import { User } from '@/types/auth/user'
import { logout } from '@/utils/logout'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Navbar = ({ user }: { user?: User }) => {
  const router = useRouter()


  const logoutUser = async () => {
    await logout(router)
  }

  return (
    <nav className='d-flex justify-content-center align-items-center'>
      <div className='nav-link'>
        <Link href={'/'} className='text-decoration-none'>Home</Link>
      </div>
      <div className='nav-link'>
        <Link href={'/profile'} className='text-decoration-none'>Profile</Link>
      </div>
      <div className='nav-link'>
        {user ?
          <button className='btn btn-dark btn-md' onClick={logoutUser}>Logout</button> :
          <Link href={'/login'} className='text-decoration-none'>Login</Link>
        }
      </div>
    </nav>
  )
}

export default Navbar