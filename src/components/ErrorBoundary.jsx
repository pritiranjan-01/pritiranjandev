import React from "react";
import { AlertCircle } from "lucide-react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log to console for debugging
    console.error(
      "Error caught by Error Boundary:",
      error,
      errorInfo,
    );
    this.setState({
      error,
      errorInfo,
    });
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-light-bgPrimary px-4 py-6 dark:bg-black">
          <div className="max-w-md rounded-lg border border-light-border bg-white p-6 shadow-lg dark:border-dark-border dark:bg-dark-bgSecondary">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="h-6 w-6 text-red-500" />
              <h1 className="text-xl font-bold text-light-textPrimary dark:text-dark-textPrimary">
                Oops! Something went wrong
              </h1>
            </div>

            <p className="mb-4 text-sm text-light-textSecondary dark:text-dark-textSecondary">
              We're sorry for the inconvenience. An unexpected error
              occurred while loading this page.
            </p>

            {typeof window !== "undefined" &&
              import.meta.env.DEV &&
              this.state.error && (
                <div className="mb-4 rounded bg-red-50 p-3 dark:bg-red-900/20">
                  <p className="text-xs font-mono text-red-800 dark:text-red-300">
                    {this.state.error.toString()}
                  </p>
                </div>
              )}

            <div className="flex gap-3">
              <button
                onClick={this.resetError}
                className="flex-1 rounded bg-accent-light px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-lightHover dark:bg-accent-dark dark:text-black dark:hover:bg-accent-darkHover"
              >
                Try again
              </button>
              <a
                href="/"
                className="flex-1 rounded border border-light-border px-4 py-2 text-center text-sm font-semibold text-light-textPrimary transition-colors hover:bg-light-bgSecondary dark:border-dark-border dark:text-dark-textPrimary dark:hover:bg-dark-bgSecondary"
              >
                Go home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
