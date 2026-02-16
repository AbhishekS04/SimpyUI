"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { X, Send, Check } from "lucide-react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

interface MessageDraftProps {
    id?: string
    to?: string[]
    body: string
    onSend?: () => void
    onCancel?: () => void
    undoGracePeriod?: number // in ms, default 5000
    outcome?: "sent" | "cancelled"
    className?: string
}

type DraftStatus = "idle" | "sending" | "sent" | "cancelled"

export function MessageDraft({
    id,
    to,
    body,
    onSend,
    onCancel,
    undoGracePeriod = 5000,
    outcome,
    className,
}: MessageDraftProps) {
    const [status, setStatus] = React.useState<DraftStatus>(outcome || "idle")
    const [progress, setProgress] = React.useState(0)
    const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
    const startTimeRef = React.useRef<number | null>(null)
    const animationFrameRef = React.useRef<number | null>(null)

    React.useEffect(() => {
        if (outcome) {
            setStatus(outcome)
        }
    }, [outcome])

    const handleSend = () => {
        setStatus("sending")
        startTimeRef.current = Date.now()
        setProgress(0)

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
            onSend?.()
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

    if (status === "sent") {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={cn(
                    "flex items-center gap-2 rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm text-green-600 dark:text-green-400",
                    className
                )}
            >
                <Check className="h-4 w-4" />
                <span>Message sent</span>
            </motion.div>
        )
    }

    if (status === "cancelled") {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={cn(
                    "flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-600 dark:text-red-400",
                    className
                )}
            >
                <X className="h-4 w-4" />
                <span>Message cancelled</span>
            </motion.div>
        )
    }

    if (status === "sending") {
        return (
            <div className={cn("relative overflow-hidden rounded-xl border border-dark-200 bg-white p-4 dark:border-dark-800 dark:bg-dark-950", className)}>
                <div className="absolute inset-x-0 top-0 h-1 bg-dark-100 dark:bg-dark-800">
                    <motion.div
                        className="h-full bg-brand-500"
                        style={{ width: `${progress}%` }}
                        transition={{ ease: "linear", duration: 0.1 }}
                    />
                </div>
                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2 text-sm text-dark-600 dark:text-dark-400">
                        <Send className="h-4 w-4 animate-pulse" />
                        <span>Sending in {Math.ceil((undoGracePeriod * (1 - progress / 100)) / 1000)}s...</span>
                    </div>
                    <button
                        onClick={handleUndo}
                        className="rounded-lg bg-dark-100 px-3 py-1.5 text-sm font-medium text-dark-900 transition-colors hover:bg-dark-200 dark:bg-dark-800 dark:text-dark-100 dark:hover:bg-dark-700"
                    >
                        Undo
                    </button>
                </div>
                <div className="mt-4 opacity-50 pointer-events-none grayscale filter">
                    <MessageContent to={to} body={body} />
                </div>
            </div>
        )
    }

    return (
        <div className={cn("overflow-hidden rounded-xl border border-dark-200 bg-white shadow-sm dark:border-dark-800 dark:bg-dark-950", className)}>
            <div className="flex items-center justify-between border-b border-dark-200 px-4 py-3 dark:border-dark-800">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-dark-900 dark:text-dark-100">
                        Message
                    </span>
                </div>
                {onCancel && (
                    <button
                        onClick={handleCancel}
                        className="text-dark-500 hover:text-dark-900 dark:text-dark-400 dark:hover:text-dark-100"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>

            <div className="p-4">
                <MessageContent to={to} body={body} />
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-dark-200 bg-dark-50/50 px-4 py-3 dark:border-dark-800 dark:bg-dark-900/50">
                <button
                    onClick={handleCancel}
                    className="rounded-lg px-4 py-2 text-sm font-medium text-dark-600 hover:bg-dark-100 dark:text-dark-400 dark:hover:bg-dark-800"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSend}
                    className="flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-brand-600/20 transition-all hover:bg-brand-500 active:scale-95"
                >
                    <Send className="h-3.5 w-3.5" />
                    Send
                </button>
            </div>
        </div>
    )
}

function MessageContent({
    to,
    body
}: {
    to?: string[],
    body: string
}) {
    return (
        <div className="grid gap-3">
            {to && to.length > 0 && (
                <div className="flex items-center gap-2 text-sm font-semibold text-dark-900 dark:text-dark-100">
                    <span className="text-dark-500 font-normal">To:</span> {to.join(", ")}
                </div>
            )}
            <div className="flex gap-3">
                <div className="h-9 w-9 shrink-0 overflow-hidden rounded-md bg-gradient-to-br from-indigo-500 to-purple-500" />
                <div className="grid gap-1">
                    <div className="flex items-baseline gap-2">
                        <span className="text-sm font-bold text-dark-900 dark:text-dark-100">AI Assistant</span>
                    </div>
                    <div className="whitespace-pre-wrap text-sm leading-relaxed text-dark-700 dark:text-dark-300">
                        {body}
                    </div>
                </div>
            </div>
        </div>
    )
}
