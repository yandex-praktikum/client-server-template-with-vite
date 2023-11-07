import { useEffect, useState } from 'react'

function useFullScreen<T extends HTMLElement>(props: T): [boolean, () => void] {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false)

  useEffect(() => {
    const watchFullScreen = () => {
      setIsFullScreen(!!document.fullscreenElement)
    }
    addEventListener('fullscreenchange', watchFullScreen)
    return () => removeEventListener('fullscreenchange', watchFullScreen)
  })

  const toggleFullscreen = (element: T) => {
    const fullScreenElement = element || document.documentElement
    if (
      !document.fullscreenElement &&
      // @ts-ignore
      !document.mozFullScreenElement &&
      // @ts-ignore
      !document.webkitFullscreenElement &&
      // @ts-ignore
      !document.msFullscreenElement
    ) {
      if (fullScreenElement.requestFullscreen) {
        fullScreenElement.requestFullscreen()
        // @ts-ignore
      } else if (fullScreenElement.msRequestFullscreen) {
        // @ts-ignore
        fullScreenElement.msRequestFullscreen()
        // @ts-ignore
      } else if (fullScreenElement.mozRequestFullScreen) {
        // @ts-ignore
        fullScreenElement.mozRequestFullScreen()
        // @ts-ignore
      } else if (fullScreenElement.webkitRequestFullscreen) {
        // @ts-ignore
        fullScreenElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        // @ts-ignore
      } else if (document.msExitFullscreen) {
        // @ts-ignore
        document.msExitFullscreen()
        // @ts-ignore
      } else if (document.mozCancelFullScreen) {
        // @ts-ignore
        document.mozCancelFullScreen()
        // @ts-ignore
      } else if (document.webkitExitFullscreen) {
        // @ts-ignore
        document.webkitExitFullscreen()
      }
    }
  }

  const fullScreenToggle = () => {
    toggleFullscreen(props)
  }

  return [isFullScreen, fullScreenToggle]
}

export default useFullScreen
