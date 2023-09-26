import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ErrorType } from '@/api/getApiError'
import { UserContextProvider } from '@/providers/userProvider/UserProvider'
import { activePage, urls } from '@/utils/navigation'
import { UserType } from '@components/types'
import Preloader from '@components/Preloader/Preloader'
import AppRouters from './routers'
import { getUserInfo } from './api/auth'

function App() {
  const [getUserError, setGetUserError] = useState<ErrorType | null>()
  const [userInfo, setUserInfo] = useState<UserType>({} as UserType)
  const [isFetcing, setIsFetching] = useState(true)
  const navigate = useNavigate()
  /*
  //TODO эта часть может понадобиться в дальнейшем для работы с бекендом. Пока оставила.
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
   */

  useEffect(() => {
    const fetchUserInfo = async () => {
      await getUserInfo()
        .then(result => {
          setUserInfo(result)
          if (activePage === 'login' || activePage === 'registration') {
            navigate(urls.home)
          }
          setIsFetching(false)
        })
        .catch(error => {
          setGetUserError(error)
          setIsFetching(false)
        })
    }
    fetchUserInfo()
  }, [])

  return (
    <React.StrictMode>
      <UserContextProvider user={userInfo}>
        {isFetcing ? (
          <Preloader />
        ) : (
          <AppRouters error={getUserError?.error?.code || 401} />
        )}
      </UserContextProvider>
    </React.StrictMode>
  )
}

export default App
