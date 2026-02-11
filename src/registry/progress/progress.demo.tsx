"use client"

import Progress from './progress'

export default function ProgressDemo() {
  return (
    <div className="w-full max-w-80 space-y-4">
      <Progress value={75} color="brand" size="sm" />
      <Progress value={50} color="green" size="md" />
      <Progress value={30} color="red" size="lg" />
      <Progress value={90} color="yellow" size="md" />
    </div>
  )
}
