"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Check, Paperclip, Smile, Loader2 } from "lucide-react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

interface MessageDraftProps {
    id?: string
    to?: string[]
    initialBody?: string
    placeholder?: string
    maxLength?: number
    onSend?: (body: string) => void
    onCancel?: () => void
    undoGracePeriod?: number // in ms, default 5000
    outcome?: "sent" | "cancelled"
    className?: string
}

type DraftStatus = "idle" | "typing" | "sending" | "sent" | "cancelled"

export function MessageDraft({
    id,
    to,
    initialBody = "",
    placeholder = "Write a message...",
    maxLength = 1000,
    onSend,
    onCancel,
    undoGracePeriod = 2000,
    outcome,
    className,
}: MessageDraftProps) {
    const [status, setStatus] = React.useState<DraftStatus>(outcome || "idle")
    const [body, setBody] = React.useState(initialBody)
    const [progress, setProgress] = React.useState(0)

    const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
    const startTimeRef = React.useRef<number | null>(null)
    const animationFrameRef = React.useRef<number | null>(null)
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)

    React.useEffect(() => {
        if (outcome) {
            setStatus(outcome)
        }
    }, [outcome])

    // Auto-resize textarea
    React.useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
        }
    }, [body])

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value
        if (text.length <= maxLength) {
            setBody(text)
            if (status !== "sending" && status !== "sent") {
                setStatus("typing")
            }
        }
    }

    const handleSend = () => {
        if (!body.trim()) return

        setStatus("sending")
        startTimeRef.current = Date.now()
        setProgress(0)

        // Smooth progress bar animation
        const updateProgress = () => {
            const elapsed = Date.now() - (startTimeRef.current || 0)
            const newProgress = Math.min((elapsed / undoGracePeriod) * 100, 100)
            setProgress(newProgress)

            if (newProgress < 100) {
                animationFrameRef.current = requestAnimationFrame(updateProgress)
            }
        }
        animationFrameRef.current = requestAnimationFrame(updateProgress)

        timerRef.current = setTimeout(() => {
            setStatus("sent")
            onSend?.(body)
        }, undoGracePeriod)
    }

    const handleUndo = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current)
            timerRef.current = null
        }
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current)
            animationFrameRef.current = null
        }
        setStatus("idle")
        setProgress(0)
    }

    const handleCancel = () => {
        setStatus("cancelled")
        onCancel?.()
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
            handleSend()
        }
        if (e.key === "Escape") {
            handleCancel()
        }
    }

    if (status === "sent") {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className={cn(
                    "flex items-center gap-3 rounded-xl border border-dark-200 bg-white px-4 py-3 shadow-sm dark:border-dark-800 dark:bg-dark-950",
                    className
                )}
            >
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white">
                    <Check className="h-3 w-3" strokeWidth={3} />
                </div>
                <span className="text-sm font-medium text-dark-900 dark:text-dark-100">Message sent</span>
                <button
                    onClick={() => {
                        setStatus("idle")
                        setBody("")
                    }}
                    className="ml-auto text-xs font-medium text-dark-400 hover:text-dark-900 dark:hover:text-dark-100"
                >
                    New Message
                </button>
            </motion.div>
        )
    }

    if (status === "cancelled") {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={cn("text-center text-sm text-dark-400", className)}
            >
                Draft discarded. <button onClick={() => setStatus("idle")} className="font-medium text-dark-900 underline dark:text-dark-100">Undo</button>
            </motion.div>
        )
    }

    return (
        <div className={cn(
            "group relative overflow-hidden rounded-xl border border-dark-200 bg-white transition-all duration-200 focus-within:border-dark-300 focus-within:shadow-md dark:border-dark-800 dark:bg-dark-950 dark:focus-within:border-dark-700",
            className
        )}>
            {/* Undo Progress Line */}
            {status === "sending" && (
                <div className="absolute left-0 top-0 h-0.5 w-full bg-dark-100 dark:bg-dark-800">
                    <motion.div
                        className="h-full bg-dark-900 dark:bg-dark-100"
                        style={{ width: `${progress}%` }}
                        transition={{ ease: "linear", duration: 0.1 }}
                    />
                </div>
            )}

            {/* Header (Recipients) */}
            {to && to.length > 0 && (
                <div className="flex items-center gap-2 border-b border-dark-100 px-4 py-2.5 text-xs dark:border-dark-850">
                    <span className="font-medium text-dark-400">To:</span>
                    <div className="flex flex-wrap gap-1.5">
                        {to.map((recipient, i) => (
                            <span key={i} className="rounded bg-dark-50 px-1.5 py-0.5 font-medium text-dark-700 dark:bg-dark-900 dark:text-dark-300">
                                {recipient}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Body */}
            <div className="p-4">
                <textarea
                    ref={textareaRef}
                    value={body}
                    onChange={handleTextChange}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    disabled={status === "sending"}
                    rows={status === "idle" && body.length === 0 ? 2 : 4}
                    className="w-full resize-none bg-transparent text-sm leading-relaxed text-dark-900 placeholder:text-dark-400 focus:outline-none disabled:opacity-50 dark:text-dark-100"
                    spellCheck={false}
                />
            </div>

            {/* Footer / Toolbar */}
            <div className="flex items-center justify-between px-2 pb-2">
                <div className="flex items-center gap-1">
                    <button className="rounded p-2 text-dark-400 transition-colors hover:bg-dark-100 hover:text-dark-900 dark:hover:bg-dark-900 dark:hover:text-dark-100">
                        <Paperclip className="h-4 w-4" />
                    </button>
                    <button className="rounded p-2 text-dark-400 transition-colors hover:bg-dark-100 hover:text-dark-900 dark:hover:bg-dark-900 dark:hover:text-dark-100">
                        <Smile className="h-4 w-4" />
                    </button>
                </div>

                <div className="flex items-center gap-3 pr-2">
                    {status === "sending" ? (
                        <div className="flex items-center gap-3">
                            <span className="text-xs text-dark-400">Sending...</span>
                            <button
                                onClick={handleUndo}
                                className="text-xs font-medium text-dark-900 underline dark:text-dark-100"
                            >
                                Undo
                            </button>
                        </div>
                    ) : (
                        <>
                            {body.length > 0 && (
                                <span className="text-[10px] text-dark-300 dark:text-dark-600">
                                    {body.length}/{maxLength}
                                </span>
                            )}
                            <div className="h-4 w-px bg-dark-100 dark:bg-dark-800" />
                            {onCancel && (
                                <button
                                    onClick={handleCancel}
                                    className="text-xs font-medium text-dark-500 transition-colors hover:text-dark-900 dark:text-dark-400 dark:hover:text-dark-100"
                                >
                                    Discard
                                </button>
                            )}
                            <button
                                onClick={handleSend}
                                disabled={!body.trim()}
                                className={cn(
                                    "flex items-center gap-1.5 rounded-lg bg-dark-900 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition-all hover:bg-black active:scale-95 disabled:opacity-50 disabled:shadow-none dark:bg-white dark:text-black dark:hover:bg-dark-100",
                                )}
                            >
                                Send
                                <div className="flex h-3 w-3 items-center justify-center rounded-sm bg-white/20">
                                    <Send className="h-2 w-2" />
                                </div>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
