"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import {
    Bell,
    BellOff,
    Play,
    Pause,
    Phone,
    Battery,
    X,
    SkipBack,
    SkipForward
} from "lucide-react";

// Types
export type IslandMode =
    | 'idle'
    | 'ring' | 'silent'
    | 'timer'
    | 'music'
    | 'battery'
    | 'call'
    | 'screen-record'
    | 'success';

export interface TimerData {
    totalSeconds: number;
    initialSeconds: number;
    isPaused: boolean;
}

export interface MusicData {
    isPlaying: boolean;
    track: string;
    artist: string;
    coverUrl?: string;
    audioUrl?: string;
}

export interface CallData {
    name: string;
    seconds: number;
    status: 'connected';
}

export interface IslandContextType {
    mode: IslandMode;
    data: {
        timer: TimerData;
        music: MusicData;
        call: CallData;
        screenRecordSeconds: number;
    };
    setMode: (mode: IslandMode) => void;
    updateData: (data: Partial<IslandContextType['data']>) => void;
    toggleRingSilent: () => void;
    toggleTimer: () => void;
    stopTimer: () => void;
    stopScreenRecord: () => void;
    toggleMusic: () => void;
}

// Format seconds to MM:SS
const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60).toString();
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
};

// Audio element for music playback
let audioElement: HTMLAudioElement | null = null;

// Spring config for smooth animations
const SPRING_CONFIG: Transition = {
    type: "spring",
    stiffness: 400,
    damping: 30,
    mass: 1
};

// Context
const IslandContext = createContext<IslandContextType | undefined>(undefined);

export const DynamicIslandProvider = ({ children }: { children: React.ReactNode }) => {
    const [mode, setModeState] = useState<IslandMode>('idle');
    const [data, setData] = useState<IslandContextType['data']>({
        timer: { totalSeconds: 58, initialSeconds: 60, isPaused: true },
        music: {
            isPlaying: false,
            track: "Song Title",
            artist: "Artist Name",
            coverUrl: "",
            audioUrl: ""
        },
        call: { name: "Contact", seconds: 0, status: "connected" },
        screenRecordSeconds: 0
    });

    const setMode = useCallback((newMode: IslandMode) => {
        setModeState(newMode);
    }, []);

    const updateData = useCallback((newData: Partial<IslandContextType['data']>) => {
        setData(prev => ({ ...prev, ...newData }));
    }, []);

    // Timer logic
    useEffect(() => {
        let interval: any;
        if (mode === 'timer' && !data.timer.isPaused && data.timer.totalSeconds > 0) {
            interval = setInterval(() => {
                setData(prev => ({
                    ...prev,
                    timer: { ...prev.timer, totalSeconds: prev.timer.totalSeconds - 1 }
                }));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [mode, data.timer.isPaused, data.timer.totalSeconds]);

    // Call logic
    useEffect(() => {
        let interval: any;
        if (mode === 'call') {
            interval = setInterval(() => {
                setData(prev => ({
                    ...prev,
                    call: { ...prev.call, seconds: prev.call.seconds + 1 }
                }));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [mode]);

    // Screen record logic
    useEffect(() => {
        let interval: any;
        if (mode === 'screen-record') {
            interval = setInterval(() => {
                setData(prev => ({ ...prev, screenRecordSeconds: prev.screenRecordSeconds + 1 }));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [mode]);

    const toggleRingSilent = useCallback(() => {
        setModeState('ring');
        setTimeout(() => {
            setModeState('silent');
            setTimeout(() => setModeState('idle'), 2000);
        }, 400);
    }, []);

    const toggleTimer = useCallback(() => {
        setData(prev => ({ ...prev, timer: { ...prev.timer, isPaused: !prev.timer.isPaused } }));
    }, []);

    const stopTimer = useCallback(() => {
        setModeState('idle');
        setData(prev => ({ ...prev, timer: { ...prev.timer, totalSeconds: 60, isPaused: true } }));
    }, []);

    const stopScreenRecord = useCallback(() => {
        setModeState('idle');
        setData(prev => ({ ...prev, screenRecordSeconds: 0 }));
    }, []);

    const toggleMusic = useCallback(() => {
        setData(prev => ({ ...prev, music: { ...prev.music, isPlaying: !prev.music.isPlaying } }));
    }, []);

    return (
        <IslandContext.Provider value={{
            mode, data, setMode, updateData,
            toggleRingSilent, toggleTimer, stopTimer, stopScreenRecord, toggleMusic
        }}>
            {children}
        </IslandContext.Provider>
    );
};

export const useDynamicIsland = () => {
    const context = useContext(IslandContext);
    if (!context) throw new Error("useDynamicIsland must be used within a DynamicIslandProvider");
    return context;
};

// Sub-components
const RingSilentView = ({ mode }: { mode: 'ring' | 'silent' }) => (
    <div className="flex items-center justify-between w-full px-4">
        <AnimatePresence mode="wait" initial={false}>
            {mode === 'silent' ? (
                <motion.div
                    key="silent"
                    initial={{ opacity: 0, scale: 0.75, x: -6 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        x: 0,
                        transition: {
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                            mass: 1
                        }
                    }}
                    exit={{
                        opacity: 0,
                        scale: 0.9,
                        x: 4,
                        transition: { duration: 0.2 }
                    }}
                    className="flex items-center justify-between w-full"
                >
                    <div className="h-7 w-7 rounded-full bg-[#ff3b30] flex items-center justify-center text-white shadow-xl">
                        <BellOff size={14} fill="currentColor" strokeWidth={2.5} />
                    </div>
                    <span className="text-[15px] font-semibold text-[#ff3b30] tracking-tight">Silent</span>
                </motion.div>
            ) : (
                <motion.div
                    key="ring"
                    initial={{ opacity: 0, scale: 0.9, x: -4 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        x: 0,
                        transition: {
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                            mass: 1
                        }
                    }}
                    exit={{
                        opacity: 0,
                        scale: 0.75,
                        x: 6,
                        transition: { duration: 0.2 }
                    }}
                    className="flex items-center justify-between w-full"
                >
                    <div className="h-6 w-6 flex items-center justify-center text-white">
                        <Bell size={14} fill="currentColor" strokeWidth={2.5} />
                    </div>
                    <span className="text-[15px] font-semibold text-white tracking-tight">Ring</span>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const TimerView = ({ data, toggle, stop }: { data: TimerData, toggle: () => void, stop: () => void }) => {
    return (
        <motion.div
            key="timer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 30, mass: 1 }}
            className="flex items-center justify-between w-full px-5 h-full"
        >
            <div className="flex items-center">
                <button
                    onClick={(e) => { e.stopPropagation(); toggle(); }}
                    className="w-11 h-11 rounded-full bg-[#ff9f0a]/20 hover:bg-[#ff9f0a]/30 flex items-center justify-center text-[#ff9f0a] transition-colors"
                >
                    {data.isPaused ? (
                        <Play size={20} fill="currentColor" className="ml-0.5" />
                    ) : (
                        <Pause size={20} fill="currentColor" />
                    )}
                </button>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-[10px] text-[#ff9f0a] uppercase font-semibold tracking-wider leading-none mb-1 opacity-80">
                    Timer
                </span>
                <span className="text-[26px] font-light text-[#ff9f0a] font-mono leading-none tabular-nums tracking-tight">
                    {formatTime(data.totalSeconds)}
                </span>
            </div>
            <div className="flex items-center">
                <button
                    onClick={(e) => { e.stopPropagation(); stop(); }}
                    className="w-11 h-11 rounded-full bg-neutral-700/50 hover:bg-neutral-600 flex items-center justify-center text-white transition-colors"
                >
                    <X size={20} />
                </button>
            </div>
        </motion.div>
    );
};

const CallView = ({ data }: { data: CallData }) => {
    const duration = formatTime(data.seconds);
    const [m, s] = duration.split(':');
    const formatted = `${m.padStart(2, '0')}:${s}`;

    return (
        <motion.div
            key="call"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 30, mass: 1 }}
            className="flex items-center justify-between w-full px-3 h-full"
        >
            <div className="flex items-center gap-2.5">
                <Phone size={15} fill="#4ade80" className="text-[#4ade80]" />
                <span className="text-[13px] font-medium text-[#4ade80] tracking-wide tabular-nums">
                    {formatted}
                </span>
            </div>
            <div className="flex items-center h-full">
                <Waveform color="#4ade80" />
            </div>
        </motion.div>
    );
};

const ScreenRecordView = ({ seconds, stop }: { seconds: number, stop: () => void }) => {
    const time = formatTime(seconds);
    return (
        <motion.div
            key="screen-record"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 30, mass: 1 }}
            className="flex items-center justify-between w-full px-5 h-full"
        >
            <div className="flex flex-col justify-center gap-1">
                <span className="text-[10px] font-semibold text-neutral-400 tracking-wider leading-none uppercase">
                    Recording
                </span>
                <div className="flex items-center gap-2">
                    <motion.div
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-2.5 h-2.5 rounded-full bg-[#ff3b30]"
                    />
                    <span className="text-[20px] font-normal text-[#ff3b30] tabular-nums tracking-tight font-mono leading-none">
                        {time}
                    </span>
                </div>
            </div>

            <button
                onClick={(e) => { e.stopPropagation(); stop(); }}
                className="w-11 h-11 rounded-full bg-neutral-800 flex items-center justify-center group active:scale-95 transition-transform border border-neutral-700/50"
            >
                <div className="w-[18px] h-[18px] rounded-[3px] bg-[#ff3b30]" />
            </button>
        </motion.div>
    );
};

const Waveform = ({ color = "#34c759" }: { color?: string }) => (
    <div className="flex items-center gap-[2px] h-3 items-center">
        {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div
                key={i}
                className="w-[3px] rounded-full"
                style={{ backgroundColor: color }}
                animate={{ height: [4, 14, 6, 16, 4] }}
                transition={{
                    duration: 0.5 + Math.random() * 0.3,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                    delay: i * 0.1
                }}
            />
        ))}
    </div>
);

const MusicView = ({ data, toggleMusic }: { data: MusicData, toggleMusic: () => void }) => {
    React.useEffect(() => {
        if (data.audioUrl) {
            if (audioElement) {
                audioElement.pause();
                audioElement = null;
            }

            audioElement = new Audio(data.audioUrl);
            audioElement.volume = 1.0;

            if (!data.isPlaying) {
                toggleMusic();
            }

            audioElement.play().catch(err => {
                console.error('Auto-play failed:', err);
            });
        }

        return () => {
            if (audioElement) {
                audioElement.pause();
                audioElement = null;
            }
        };
    }, []);

    const togglePlayPause = () => {
        if (audioElement) {
            if (data.isPlaying) {
                audioElement.pause();
                toggleMusic();
            } else {
                audioElement.play().catch(err => {
                    console.error('Audio playback failed:', err);
                });
                toggleMusic();
            }
        }
    };

    return (
        <motion.div
            key="music"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(5px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(5px)" }}
            transition={{ type: "spring", stiffness: 400, damping: 30, mass: 1 }}
            className="flex flex-col w-full h-full p-5 relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-800/50 to-black/50 pointer-events-none" />

            <div className="flex items-start justify-between w-full mb-5 z-10">
                <div className="flex items-center gap-3.5">
                    <div className="w-14 h-14 rounded-xl bg-neutral-800 overflow-hidden shadow-lg ring-1 ring-white/10 relative group">
                        {data.coverUrl && <img src={data.coverUrl} className="w-full h-full object-cover" alt={data.track} />}
                    </div>
                    <div className="flex flex-col justify-center gap-0.5">
                        <span className="text-[17px] font-semibold text-white leading-tight tracking-tight">
                            {data.track}
                        </span>
                        <span className="text-[14px] font-medium text-white/50 leading-tight">
                            {data.artist}
                        </span>
                    </div>
                </div>
                <div className="pt-1.5">
                    {data.isPlaying && <Waveform color="#3b82f6" />}
                </div>
            </div>

            <div className="w-full z-10 mb-4">
                <div className="w-full h-1.5 bg-white/20 rounded-full mb-2 overflow-hidden">
                    <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: data.isPlaying ? "100%" : "0%" }}
                        transition={{ duration: 216, ease: "linear" }}
                        className="h-full bg-white/90 rounded-full"
                    />
                </div>
                <div className="flex justify-between text-[10px] font-medium text-white/40 font-mono tracking-wide">
                    <span>0:00</span>
                    <span>-3:36</span>
                </div>
            </div>

            <div className="flex items-center justify-center gap-8 z-10">
                <button className="text-white hover:opacity-70 transition-opacity">
                    <SkipBack size={26} fill="currentColor" />
                </button>
                <button
                    onClick={togglePlayPause}
                    className="text-white hover:scale-105 transition-transform"
                >
                    {data.isPlaying ? (
                        <Pause size={38} fill="currentColor" />
                    ) : (
                        <Play size={38} fill="currentColor" />
                    )}
                </button>
                <button className="text-white hover:opacity-70 transition-opacity">
                    <SkipForward size={26} fill="currentColor" />
                </button>
            </div>
        </motion.div>
    );
};

const BatteryView = () => (
    <motion.div
        key="battery"
        initial={{ opacity: 0, scale: 0.9, x: -6 }}
        animate={{
            opacity: 1,
            scale: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 30,
                mass: 1
            }
        }}
        exit={{
            opacity: 0,
            scale: 0.95,
            x: 4,
            transition: { duration: 0.2 }
        }}
        className="flex items-center justify-between w-full px-5 h-full"
    >
        <span className="text-[15px] font-medium text-white tracking-tight">Low Battery</span>
        <div className="flex items-center gap-2">
            <span className="text-[15px] font-semibold text-[#ff3b30] tabular-nums">20%</span>
            <Battery size={20} className="stroke-[2.5px] text-[#ff3b30]" />
        </div>
    </motion.div>
);

// Main Component
export default function DynamicIsland() {
    const { mode, data, toggleTimer, stopTimer, stopScreenRecord, toggleMusic } = useDynamicIsland();

    const variants = {
        idle: { width: 120, height: 37, borderRadius: 20 },
        ring: { width: 150, height: 50, borderRadius: 25 },
        silent: { width: 150, height: 50, borderRadius: 25 },
        timer: { width: 340, height: 70, borderRadius: 35 },
        music: { width: 370, height: 195, borderRadius: 42 },
        call: { width: 180, height: 37, borderRadius: 18.5 },
        'screen-record': { width: 290, height: 70, borderRadius: 35 },
        battery: { width: 240, height: 50, borderRadius: 25 },
        success: { width: 240, height: 44, borderRadius: 22 },
        error: { width: 260, height: 44, borderRadius: 22 }
    };

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] pointer-events-none select-none">
            <motion.div
                layout
                initial="idle"
                animate={mode}
                variants={variants}
                transition={SPRING_CONFIG}
                className="bg-black relative overflow-hidden pointer-events-auto will-change-transform backface-hidden"
                style={{
                    boxShadow: "0px 0px 0px 1px rgba(255,255,255,0.11), 0px 20px 40px -10px rgba(0,0,0,0.6)"
                }}
            >
                <div className="w-full h-full flex items-center justify-center relative">
                    <AnimatePresence mode="popLayout" custom={mode}>
                        {mode === 'idle' && <motion.div key="idle" exit={{ opacity: 0 }} className="w-full h-full" />}
                        {(mode === 'ring' || mode === 'silent') && <RingSilentView mode={mode} />}
                        {mode === 'timer' && <TimerView data={data.timer} toggle={toggleTimer} stop={stopTimer} />}
                        {mode === 'call' && <CallView data={data.call} />}
                        {mode === 'screen-record' && <ScreenRecordView seconds={data.screenRecordSeconds} stop={stopScreenRecord} />}
                        {mode === 'music' && <MusicView data={data.music} toggleMusic={toggleMusic} />}
                        {mode === 'battery' && <BatteryView />}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}
