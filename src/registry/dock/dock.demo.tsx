"use client"

import Dock, { type DockItemProps } from "./dock"
import {
  FiHome, FiMessageSquare, FiMusic,
  FiSettings, FiMail, FiGlobe, FiCode
} from "react-icons/fi"

const items: DockItemProps[] = [
  { icon: <FiHome size={20} />, label: "Home", onClick: () => {} },
  { icon: <FiMessageSquare size={20} />, label: "Messages", onClick: () => {} },
  { icon: <FiMusic size={20} />, label: "Music", onClick: () => {} },
  { icon: <FiMail size={20} />, label: "Mail", onClick: () => {} },
  { icon: <FiGlobe size={20} />, label: "Browser", onClick: () => {} },
  { icon: <FiCode size={20} />, label: "Code", onClick: () => {} },
  { icon: <FiSettings size={20} />, label: "Settings", onClick: () => {} },
]

export default function DockDemo() {
  return (
    <div className="flex items-end justify-center w-full min-h-[200px] pb-4">
      <Dock items={items} magnification={56} distance={120} baseSize={38} />
    </div>
  )
}
