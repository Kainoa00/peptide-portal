'use client'

import { Component, type ReactNode } from 'react'

interface Props { children: ReactNode; fallback?: ReactNode }
interface State { hasError: boolean }

export default class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-2)', fontSize: 14 }}>
          Something went wrong. Please refresh the page.
        </div>
      )
    }
    return this.props.children
  }
}
