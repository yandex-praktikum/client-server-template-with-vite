import CanvasAPI, { CanvasAPIType } from '@/services/CanvasAPI'
import { useEffect, useState } from 'react'

const useGameApi = (props: CanvasAPIType) => {
  const [api, setApi] = useState<CanvasAPI>()

  useEffect(() => {
    if (props.element) {
      setApi(new CanvasAPI(props))
    }
  }, [props.element])

  return api
}

export default useGameApi
