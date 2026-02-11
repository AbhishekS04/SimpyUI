"use client"

import Avatar from './avatar'

export default function AvatarDemo() {
  return (
    <div className="flex items-center gap-4">
      <Avatar alt="John" size="sm" />
      <Avatar alt="Alice" size="md" />
      <Avatar alt="Bob" size="lg" />
      <Avatar
        src="https://i.pravatar.cc/150?img=32"
        alt="User"
        size="lg"
      />
    </div>
  )
}
