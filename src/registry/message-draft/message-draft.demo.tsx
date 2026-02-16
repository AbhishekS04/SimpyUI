"use client"

import { MessageDraft } from "./message-draft"

export default function MessageDraftDemo() {
    return (
        <div className="flex w-full max-w-2xl flex-col gap-8 p-4">
            <div className="grid gap-4">
                <h3 className="text-lg font-semibold text-dark-900 dark:text-dark-100">Message Draft</h3>
                <MessageDraft
                    to={["#project-updates"]}
                    body="Just pushed the latest changes to the staging environment. Please verify the new dashboard analytics widget when you have a moment."
                    onSend={() => console.log("Message sent")}
                    onCancel={() => console.log("Message cancelled")}
                />
            </div>
        </div>
    )
}
