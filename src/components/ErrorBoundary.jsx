import React from 'react'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo })
    console.error("ErrorBoundary caught an error", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white p-10">
          <div className="max-w-2xl w-full bg-white/5 p-8 rounded-xl border border-red-500/30">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Something went wrong.</h2>
            <details className="whitespace-pre-wrap font-mono text-sm text-white/70">
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </details>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
