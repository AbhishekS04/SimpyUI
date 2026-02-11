"use client"

import Accordion from './accordion'

export default function AccordionDemo() {
  return (
    <div className="w-full max-w-96">
      <Accordion
        items={[
          { title: 'What is SimpyUI?', content: 'A beautiful React component library with animations.' },
          { title: 'Is it free?', content: 'Yes, it is completely free and open source.' },
          { title: 'How do I install it?', content: 'Just copy the component code into your project.' },
        ]}
      />
    </div>
  )
}
