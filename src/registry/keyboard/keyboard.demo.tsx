"use client"

import { Keyboard } from './keyboard'

export default function KeyboardDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Keyboard enableSound={true} showPreview={true} />
    </div>
  )
}
