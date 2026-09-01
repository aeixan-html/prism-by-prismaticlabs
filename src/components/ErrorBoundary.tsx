import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-bg px-4">
          <div className="max-w-md text-center">
            <div className="mb-6 flex items-center justify-center gap-3">
              <img src="/prismtic.jpeg" alt="PRISMATIC LABS official logo" className="h-10 w-10 object-contain" />
              <span className="font-mono text-sm font-bold tracking-tight text-ptext">PRISMATIC LABS</span>
            </div>
            <h1 className="text-2xl font-bold text-ptext">Something went wrong</h1>
            <p className="mt-3 text-sm text-mtext-2">
              An unexpected error occurred while loading this page. Please try refreshing.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 inline-flex items-center gap-2 bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary/90"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
