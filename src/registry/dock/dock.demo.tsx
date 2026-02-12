"use client"

import Dock, { type DockItemProps } from "./dock"
import {
  FiHome, FiMessageSquare, FiMusic, FiCamera,
  FiSettings, FiMail, FiGlobe, FiCode
} from "react-icons/fi"

const items: DockItemProps[] = [
  { icon: <FiHome size={22} />, label: "Home", onClick: () => {} },
  { icon: <FiMessageSquare size={22} />, label: "Messages", onClick: () => {} },
  { icon: <FiMusic size={22} />, label: "Music", onClick: () => {} },
  { icon: <FiCamera size={22} />, label: "Camera", onClick: () => {} },
  { icon: <FiMail size={22} />, label: "Mail", onClick: () => {} },
  { icon: <FiGlobe size={22} />, label: "Browser", onClick: () => {} },
  { icon: <FiCode size={22} />, label: "Code", onClick: () => {} },
  { icon: <FiSettings size={22} />, label: "Settings", onClick: () => {} },
]

export default function DockDemo() {
  return (
    <div className="flex items-end justify-center w-full min-h-[200px] pb-4">
      <Dock items={items} magnification={70} distance={150} baseSize={48} />
    </div>
  )
}
