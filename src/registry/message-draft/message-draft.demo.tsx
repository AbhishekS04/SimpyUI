"use client"

import { MessageDraft } from "./message-draft"

export default function MessageDraftDemo() {
    return (
        <div className="flex w-full max-w-xl flex-col gap-8 p-8 bg-dark-50/50 min-h-[400px] items-center justify-center dark:bg-dark-900/20">
            <div className="w-full space-y-2">
                <div className="flex items-center justify-between px-1">
                    <h3 className="text-sm font-medium text-dark-900 dark:text-dark-100">Reply</h3>
                </div>
                <MessageDraft
                    to={["Tusharxhub", "AbhishekS04"]}
                    initialBody=""
                    placeholder="Reply to the team..."
                    onSend={(text) => console.log("Sent:", text)}
                    onCancel={() => console.log("Cancelled")}
                />
                <p className="text-center text-xs text-dark-400">
                    Press <kbd className="font-sans font-medium text-dark-900 dark:text-dark-100">⌘+Enter</kbd> to send
                </p>
            </div>
        </div>
    )
}
