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
        <Link href={'/'}>Home</Link>
      </div>
      <div className='nav-link'>
        <Link href={'/about'}>About</Link>
      </div>
      <div className='nav-link'>
        {user ?
          <button className='btn btn-dark' onClick={logoutUser}>Logout</button> :
          <Link href={'/login'}>Login</Link>
        }
      </div>
    </nav>
  )
}

export default Navbar