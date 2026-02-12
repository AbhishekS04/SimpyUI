"use client"

import { motion } from "framer-motion"
import { DynamicIslandProvider, useDynamicIsland, type IslandMode } from './dynamic-island'
import DynamicIsland from './dynamic-island'

const ControlButton = ({
    label,
    onClick,
    isActive,
    className = ""
}: {
    label: string
    onClick: () => void
    isActive?: boolean
    className?: string
}) => (
    <button
        onClick={onClick}
        className={`flex items-center justify-center h-10 px-4 rounded-full transition-all duration-200 text-[13px] font-medium
            ${isActive
                ? "bg-white text-black font-semibold shadow-lg scale-105"
                : "bg-[#2c2c2e] text-neutral-300 hover:bg-[#3a3a3c] hover:text-white"
            } ${className}`}
    >
        {label}
    </button>
)

const FloatingControls = () => {
    const { toggleRingSilent, mode, setMode, updateData } = useDynamicIsland()

    const set = (m: IslandMode) => {
        if (mode === m) setMode('idle')
        else {
            if (m === 'timer') updateData({ timer: { totalSeconds: 59, initialSeconds: 60, isPaused: false } })
            if (m === 'music') updateData({
                music: {
                    isPlaying: true,
                    coverUrl: "https://res.cloudinary.com/dap0u41dz/image/upload/v1766439887/iu_ul6dvp.png",
                    track: "Rakh lo Tum Chupaake",
                    artist: "Arpit Bala",
                    audioUrl: "https://res.cloudinary.com/dap0u41dz/video/upload/v1766439761/Rakhlo_Tum_Chupaake_MP3_160K_o0rv95.mp3"
                }
            })
            setMode(m)
        }
    }

    return (
        <motion.div
            drag
            dragMomentum={false}
            className="absolute bottom-6 right-6 bg-[#1c1c1e] border border-white/5 shadow-2xl rounded-[32px] p-5 z-50 cursor-grab active:cursor-grabbing w-[300px]"
        >
            <div className="flex items-center justify-between mb-5 px-1">
                <div className="flex items-center gap-2 opacity-40">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[15px] font-semibold text-neutral-400">Options</span>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <div className="grid grid-cols-4 gap-2">
                    <ControlButton label="idle" onClick={() => setMode('idle')} isActive={mode === 'idle'} />
                    <ControlButton label="ring" onClick={toggleRingSilent} isActive={mode === 'ring' || mode === 'silent'} />
                    <ControlButton label="timer" onClick={() => set('timer')} isActive={mode === 'timer'} />
                    <ControlButton label="record" onClick={() => set('screen-record')} isActive={mode === 'screen-record'} />
                </div>

                <div className="grid grid-cols-1 gap-2">
                    <ControlButton label="music" onClick={() => set('music')} isActive={mode === 'music'} />
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <ControlButton label="lowBatt" onClick={() => set('battery')} isActive={mode === 'battery'} />
                    <ControlButton label="phone" onClick={() => set('call')} isActive={mode === 'call'} />
                </div>
            </div>
        </motion.div>
    )
}

export default function DynamicIslandDemo() {
    return (
        <DynamicIslandProvider>
            <div className="relative w-full h-full min-h-[400px]">
                <DynamicIsland />
                <FloatingControls />
            </div>
        </DynamicIslandProvider>
    )
}
