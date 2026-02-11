"use client"

import Alert from './alert'

export default function AlertDemo() {
  return (
    <div className="w-full max-w-96 space-y-3">
      <Alert variant="info" title="Info">This is an informational alert.</Alert>
      <Alert variant="success" title="Success">Operation completed!</Alert>
      <Alert variant="warning" title="Warning">Please check your input.</Alert>
      <Alert variant="error" title="Error">Something went wrong.</Alert>
    </div>
  )
}
