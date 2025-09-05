'use client'
import React from 'react'

type Props = { children: React.ReactNode }
type State = { hasError: boolean }

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  componentDidCatch(err: unknown) { console.error(err) }
  render() {
    if (this.state.hasError) {
      return <div role="alert" className="rounded-md bg-red-900/20 p-3">Something went wrong. Try refreshing.</div>
    }
    return this.props.children
  }
}
