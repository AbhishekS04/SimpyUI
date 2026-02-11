"use client"

import Input from './input'

export default function InputDemo() {
  return (
    <div className="w-full max-w-72 space-y-4">
      <Input label="Email" placeholder="you@example.com" />
      <Input label="Password" type="password" placeholder="••••••••" error="Password is required" />
    </div>
  )
}
