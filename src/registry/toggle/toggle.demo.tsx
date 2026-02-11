"use client"

import { useState } from 'react'
import Toggle from './toggle'

export default function ToggleDemo() {
  const [on, setOn] = useState(false)
  return <Toggle enabled={on} onChange={setOn} label="Enable notifications" />
}
