"use client"

import Card from './card'

export default function CardDemo() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      <Card className="w-full sm:w-64">
        <h3 className="font-semibold mb-2">Default Card</h3>
        <p className="text-sm text-dark-100">A simple card with hover effect.</p>
      </Card>
      <Card className="w-full sm:w-64" glow>
        <h3 className="font-semibold mb-2">Glow Card</h3>
        <p className="text-sm text-dark-100">This card has a subtle glow.</p>
      </Card>
    </div>
  )
}
