"use client"

import Tooltip from './tooltip'
import Button from '../button/button'

export default function TooltipDemo() {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      <Tooltip text="Top tooltip" position="top">
        <Button variant="outline" size="sm">Top</Button>
      </Tooltip>
      <Tooltip text="Bottom tooltip" position="bottom">
        <Button variant="outline" size="sm">Bottom</Button>
      </Tooltip>
      <Tooltip text="Right tooltip" position="right">
        <Button variant="outline" size="sm">Right</Button>
      </Tooltip>
    </div>
  )
}
