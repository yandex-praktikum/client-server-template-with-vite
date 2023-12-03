import React, { ErrorInfo, Component, ReactNode } from 'react'
import styles from './index.module.scss'

interface IErrorBoundary {
  children: ReactNode
}

type TErrorBoundaryState = {
  hasError: boolean
  error: string | null
}

export class ErrorBoundary extends Component<
  IErrorBoundary,
  TErrorBoundaryState
> {
  public constructor(props: IErrorBoundary) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  public static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error.message }
  }

  public componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Возникла ошибка!', error, info)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <section className={styles.wrapper}>
          <h1>Что-то пошло не так.</h1>
          <p>
            В приложении произошла ошибка. Пожалуйста, перезагрузите страницу.
          </p>
          <p>{this.state.error}</p>
        </section>
      )
    }
    return this.props.children
  }
}
