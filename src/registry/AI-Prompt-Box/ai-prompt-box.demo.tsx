"use client"

import { useState } from 'react'
import PromptInputBox from './ai-prompt-box'

export default function AIPromptBoxDemo() {
  const [messages, setMessages] = useState<{ text: string; files?: string[] }[]>([])
  const [loading, setLoading] = useState(false)

  const handleSend = (message: string, files?: File[]) => {
    setMessages((prev) => [
      ...prev,
      { text: message, files: files?.map((f) => f.name) },
    ])
    setLoading(true)
    setTimeout(() => setLoading(false), 1500)
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {/* Message log */}
      {messages.length > 0 && (
        <div className="w-full max-w-2xl space-y-2 max-h-48 overflow-y-auto">
          {messages.map((m, i) => (
            <div key={i} className="rounded-xl bg-dark-600 px-4 py-3 text-sm text-dark-50">
              <p>{m.text}</p>
              {m.files && (
                <p className="text-xs text-dark-300 mt-1">
                  Attached: {m.files.join(', ')}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      <PromptInputBox
        onSend={handleSend}
        isLoading={loading}
        placeholder="Ask anything..."
      />
    </div>
  )
}
