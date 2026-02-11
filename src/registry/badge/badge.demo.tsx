"use client"

import Badge from './badge'

export default function BadgeDemo() {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <Badge>Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
    </div>
  )
}
