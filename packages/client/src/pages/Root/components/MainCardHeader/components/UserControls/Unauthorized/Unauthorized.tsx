import { FC, useCallback } from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { ROUTE_PATHS } from '../../../../../../../utils/routes'

const Unauthorized: FC = () => {
  const navigate = useNavigate()

  const handleSignupClick = useCallback(() => {
    navigate(ROUTE_PATHS.signup)
  }, [])

  const handleLoginClick = useCallback(() => {
    navigate(ROUTE_PATHS.login)
  }, [])

  return (
    <>
      <Button
        onClick={handleSignupClick}
        color="secondary"
        variant="outlined"
        sx={{ color: 'white' }}>
        Зарегистрироваться
      </Button>
      <Button
        onClick={handleLoginClick}
        color="secondary"
        variant="contained"
        sx={{ ml: 1, color: 'white' }}>
        Войти
      </Button>
    </>
  )
}

export default Unauthorized
