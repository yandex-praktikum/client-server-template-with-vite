import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    console.log('_', _);

    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display:'flex',
          justifyContent:'center',
          marginTop:'20%',
        }}>
          <h1>Упс...что-то пошло не так. Попробуйте зайти в игру позже</h1>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
