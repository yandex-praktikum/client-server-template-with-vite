import CanvasAPI from '@/services/CanvasAPI'
import { useEffect, useState } from 'react'

const useGameApi = (canvasEl: HTMLCanvasElement) => {
  const [api, setApi] = useState<CanvasAPI>()

  useEffect(() => {
    if (canvasEl) {
      setApi(new CanvasAPI(canvasEl))
    }
  }, [canvasEl])

  return api
}

export default useGameApi
