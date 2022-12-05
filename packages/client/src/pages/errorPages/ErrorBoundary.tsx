import React, { ErrorInfo } from "react";
import PageError404 from "./Error404/PageError404";

export class ErrorBoundary extends React.Component {
    state = { hasError: null };

    static getDerivedStateFromError(error: Error) {
        return { hasError: error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.log({ error, errorInfo });
    }

    resetError = () => this.setState({ hasError: null });

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <PageError404 resetError={this.resetError} />
                </div>
            );
        }
        // @ts-ignore
        return this.props.children;
    }
}
