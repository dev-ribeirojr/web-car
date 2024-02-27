import { Link } from 'react-router-dom';
import Logo from '../../../../assets/logo.svg'
import { icons } from '../../../../assets/icons';
import { useContexts } from '../../../../contexts/useContexts';

export function Header() {

  const { signed, loadingAuth } = useContexts()

  return (
    <header className='w-full flex items-center justify-center h-16 bg-white drop-shadow mb-4'>
      <nav className='flex w-full max-w-7xl items-center justify-between px-4 mx-auto'>
        <Link to="/"><img src={Logo} alt='Logo do site' /></Link>

        {!loadingAuth && signed && (
          <Link to="/dashboard">
            <div className='border-2 rounded-full p-1'>
              {icons.user}
            </div>
          </Link>
        )}
        {!loadingAuth && !signed && (
          <Link to="/auth">{icons.login}</Link>
        )}

      </nav>
    </header>
  )
}