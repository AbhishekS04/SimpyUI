"use client"

import { useState } from 'react'
import Toast from './toast'
import Button from '../button/button'

export default function ToastDemo() {
  const [show, setShow] = useState(false)
  return (
    <div className="space-y-4">
      <Button onClick={() => setShow(true)}>Show Toast</Button>
      <Toast
        show={show}
        onClose={() => setShow(false)}
        message="Action completed successfully!"
        variant="success"
      />
    </div>
  )
}
