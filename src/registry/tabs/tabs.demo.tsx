"use client"

import Tabs from './tabs'

export default function TabsDemo() {
  return (
    <div className="w-full max-w-96">
      <Tabs
        tabs={[
          { label: 'Overview', content: <p className="text-sm text-dark-100">This is the overview tab content.</p> },
          { label: 'Features', content: <p className="text-sm text-dark-100">Check out all the amazing features.</p> },
          { label: 'Pricing', content: <p className="text-sm text-dark-100">Simple and transparent pricing.</p> },
        ]}
      />
    </div>
  )
}
