import { Link } from 'react-router-dom'
import Logo from '../../assets/logo.svg'
import { Container } from '../../components/ui'
import { Login, Register } from './modules'
import { useEffect } from 'react'
import { useAuth } from './useAuth'
import { useContexts } from '../../contexts/useContexts'

export function Auth() {
  const { login, handleRegisterOrLogin } = useAuth()
  const { handleLogOut } = useContexts()

  useEffect(() => {
    handleLogOut()
  }, [])

  return (
    <Container>
      <div className='w-full min-h-screen flex justify-center items-center flex-col gap-4'>
        <Link to="/" className='mb-6 max-w-sm w-full'>
          <img src={Logo} alt='Logo do site' className='w-full' />
        </Link >
        {login ? (<Login />) : (<Register />)}
        <div className='flex gap-2'>
          <p>{login ? "sou novo por aqui!" : "ja possuo uma conta!"}</p>
          <button
            onClick={handleRegisterOrLogin}
            className='text-zinc-600'
          >
            {login ? "criar uma conta" : "fazer login"}
          </button>
        </div>

      </div>


    </Container >
  )
}
