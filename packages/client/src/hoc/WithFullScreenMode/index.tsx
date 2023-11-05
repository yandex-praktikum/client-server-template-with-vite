import React, { ComponentType, useRef } from 'react'

function withFullScreenMode<P extends object>(
  WrappedComponent: ComponentType<P>
) {
  // Возвращаем новый компонент
  // eslint-disable-next-line
  return (props: P) => {
    // Создаем ref к нашему компоненту
    const elementRef = useRef<HTMLDivElement>(null)

    // eslint-disable-next-line
    const toggleFullscreen = (elem: HTMLElement) => {
      // eslint-disable-next-line
      elem = elem || document.documentElement
      if (!document.fullscreenElement) {
        if (elem.requestFullscreen) {
          elem.requestFullscreen()
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        }
      }
    }
    // eslint-disable-next-line
    const handleFullScreen = () => {
      if (elementRef.current) {
        if (document.fullscreenElement === null) {
          elementRef.current.requestFullscreen().catch(console.error)
        } else {
          document.exitFullscreen().catch(console.error)
        }
      }
    }

    // Оборачиваем компонент в div через ref для управления полноэкранным режимом
    return (
      <div ref={elementRef}>
        <WrappedComponent {...props} />
      </div>
    )
  }
}

export default withFullScreenMode
