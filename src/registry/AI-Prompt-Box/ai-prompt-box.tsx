"use client"

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  type ChangeEvent,
  type KeyboardEvent,
  type DragEvent,
} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowUp,
  Paperclip,
  X,
  Globe,
  Lightbulb,
  PenTool,
  Mic,
  Square,
  Image as ImageIcon,
} from 'lucide-react'

/* ── Types ── */

export interface PromptInputBoxProps {
  onSend?: (message: string, files?: File[]) => void
  isLoading?: boolean
  placeholder?: string
  className?: string
  maxHeight?: number
}

/* ── Helpers ── */

function isImageFile(file: File) {
  return file.type.startsWith('image/')
}

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

/* ── Sub-components ── */

interface ModeToggleProps {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
}

function ModeToggle({ icon, label, active, onClick }: ModeToggleProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
        active
          ? 'bg-brand-600/20 text-brand-400 ring-1 ring-brand-500/40'
          : 'text-dark-100 hover:text-white hover:bg-dark-500'
      }`}
    >
      {icon}
      {label}
    </button>
  )
}

interface FilePreviewProps {
  file: File
  preview?: string
  onRemove: () => void
}

function FilePreview({ file, preview, onRemove }: FilePreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="relative group"
    >
      {preview ? (
        <div className="w-16 h-16 rounded-lg overflow-hidden border border-dark-400">
          <img src={preview} alt={file.name} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="w-16 h-16 rounded-lg border border-dark-400 bg-dark-600 flex items-center justify-center">
          <ImageIcon size={20} className="text-dark-200" />
        </div>
      )}
      <button
        type="button"
        onClick={onRemove}
        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-dark-400 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X size={12} />
      </button>
    </motion.div>
  )
}

/* ── Voice Recorder ── */

interface VoiceRecorderProps {
  onStop: (blob: Blob) => void
  onCancel: () => void
}

function VoiceRecorder({ onStop, onCancel }: VoiceRecorderProps) {
  const [duration, setDuration] = useState(0)
  const [bars] = useState(() => Array.from({ length: 24 }, () => Math.random()))
  const mediaRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    ;(async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const recorder = new MediaRecorder(stream)
        mediaRef.current = recorder
        chunksRef.current = []
        recorder.ondataavailable = (e) => chunksRef.current.push(e.data)
        recorder.onstop = () => {
          stream.getTracks().forEach((t) => t.stop())
          const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
          onStop(blob)
        }
        recorder.start()
        interval = setInterval(() => setDuration((d) => d + 1), 1000)
      } catch {
        onCancel()
      }
    })()
    return () => clearInterval(interval)
  }, [])

  const handleStop = () => mediaRef.current?.stop()

  return (
    <div className="flex items-center gap-3 w-full px-1">
      <button
        type="button"
        onClick={() => {
          mediaRef.current?.stream.getTracks().forEach((t) => t.stop())
          onCancel()
        }}
        className="text-dark-200 hover:text-white transition-colors"
      >
        <X size={18} />
      </button>

      <div className="flex-1 flex items-center gap-0.5 h-8">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="w-1 rounded-full bg-red-500"
            animate={{ height: [h * 12 + 4, h * 24 + 4, h * 12 + 4] }}
            transition={{ repeat: Infinity, duration: 0.6 + Math.random() * 0.6, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <span className="text-xs text-dark-100 tabular-nums min-w-[36px]">
        {formatDuration(duration)}
      </span>

      <button
        type="button"
        onClick={handleStop}
        className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-400 transition-colors"
      >
        <Square size={12} className="text-white fill-white" />
      </button>
    </div>
  )
}

/* ── Main Component ── */

export default function PromptInputBox({
  onSend,
  isLoading = false,
  placeholder = 'Type your message...',
  className = '',
  maxHeight = 200,
}: PromptInputBoxProps) {
  const [value, setValue] = useState('')
  const [files, setFiles] = useState<{ file: File; preview?: string }[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [recording, setRecording] = useState(false)
  const [activeMode, setActiveMode] = useState<string | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  /* Auto-resize textarea */
  const resize = useCallback(() => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = `${Math.min(ta.scrollHeight, maxHeight)}px`
  }, [maxHeight])

  useEffect(resize, [value, resize])

  /* File processing */
  const processFiles = useCallback((incoming: FileList | File[]) => {
    const arr = Array.from(incoming).slice(0, 10 - files.length)
    arr.forEach((file) => {
      if (isImageFile(file)) {
        const reader = new FileReader()
        reader.onload = (e) =>
          setFiles((prev) => [...prev, { file, preview: e.target?.result as string }])
        reader.readAsDataURL(file)
      } else {
        setFiles((prev) => [...prev, { file }])
      }
    })
  }, [files.length])

  const removeFile = (index: number) => setFiles((f) => f.filter((_, i) => i !== index))

  /* Send */
  const send = useCallback(() => {
    const text = value.trim()
    if (!text && files.length === 0) return
    let message = text
    if (activeMode) message = `[${activeMode}: ${text}]`
    onSend?.(message, files.length > 0 ? files.map((f) => f.file) : undefined)
    setValue('')
    setFiles([])
    setActiveMode(null)
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
  }, [value, files, activeMode, onSend])

  /* Key handling */
  const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (!isLoading) send()
    }
  }

  /* Drag & Drop */
  const handleDrag = (e: DragEvent, entering: boolean) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(entering)
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    if (e.dataTransfer.files.length) processFiles(e.dataTransfer.files)
  }

  /* Mode toggle */
  const toggleMode = (mode: string) => setActiveMode((prev) => (prev === mode ? null : mode))

  const canSend = (value.trim().length > 0 || files.length > 0) && !isLoading

  return (
    <div
      className={`relative w-full max-w-2xl ${className}`}
      onDragOver={(e) => handleDrag(e, true)}
      onDragLeave={(e) => handleDrag(e, false)}
      onDrop={handleDrop}
    >
      {/* Drag overlay */}
      <AnimatePresence>
        {isDragging && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 rounded-2xl border-2 border-dashed border-brand-500 bg-brand-600/10 flex items-center justify-center"
          >
            <p className="text-brand-400 font-medium text-sm">Drop files here</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="rounded-2xl border border-dark-400 bg-dark-700 shadow-xl transition-colors focus-within:border-dark-300">
        {/* File previews */}
        <AnimatePresence>
          {files.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="flex gap-2 px-4 pt-3 flex-wrap">
                {files.map((f, i) => (
                  <FilePreview key={i} file={f.file} preview={f.preview} onRemove={() => removeFile(i)} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recording or Textarea */}
        {recording ? (
          <div className="px-4 py-3">
            <VoiceRecorder
              onStop={() => setRecording(false)}
              onCancel={() => setRecording(false)}
            />
          </div>
        ) : (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)}
            onKeyDown={handleKey}
            placeholder={placeholder}
            disabled={isLoading}
            rows={1}
            className="w-full resize-none bg-transparent px-4 pt-4 pb-2 text-sm text-white placeholder:text-dark-200 outline-none disabled:opacity-50 scrollbar-thin scrollbar-thumb-dark-400"
            style={{ maxHeight }}
          />
        )}

        {/* Bottom toolbar */}
        <div className="flex items-center justify-between px-3 pb-3 pt-1">
          <div className="flex items-center gap-1">
            {/* Attach */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-dark-200 hover:text-white hover:bg-dark-500 rounded-lg transition-colors"
              title="Attach file"
            >
              <Paperclip size={18} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files && processFiles(e.target.files)}
            />

            {/* Voice */}
            <button
              type="button"
              onClick={() => setRecording(true)}
              className="p-2 text-dark-200 hover:text-white hover:bg-dark-500 rounded-lg transition-colors"
              title="Voice input"
            >
              <Mic size={18} />
            </button>

            {/* Separator */}
            <div className="w-px h-5 bg-dark-400 mx-1" />

            {/* Mode toggles */}
            <ModeToggle
              icon={<Globe size={14} />}
              label="Search"
              active={activeMode === 'Search'}
              onClick={() => toggleMode('Search')}
            />
            <ModeToggle
              icon={<Lightbulb size={14} />}
              label="Think"
              active={activeMode === 'Think'}
              onClick={() => toggleMode('Think')}
            />
            <ModeToggle
              icon={<PenTool size={14} />}
              label="Canvas"
              active={activeMode === 'Canvas'}
              onClick={() => toggleMode('Canvas')}
            />
          </div>

          {/* Send */}
          <motion.button
            type="button"
            whileHover={canSend ? { scale: 1.05 } : undefined}
            whileTap={canSend ? { scale: 0.95 } : undefined}
            onClick={send}
            disabled={!canSend}
            className={`p-2 rounded-lg transition-colors ${
              canSend
                ? 'bg-brand-600 text-white hover:bg-brand-500'
                : 'bg-dark-500 text-dark-300 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <motion.div
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Square size={18} className="fill-current" />
              </motion.div>
            ) : (
              <ArrowUp size={18} />
            )}
          </motion.button>
        </div>
      </div>
    </div>
  )
}
