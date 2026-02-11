"use client"

import { useState } from 'react'
import Modal, { useModal } from './modal'
import Button from '../button/button'

export default function ModalDemo() {
  const modal = useModal()
  return (
    <>
      <Button onClick={modal.open}>Open Modal</Button>
      <Modal isOpen={modal.isOpen} onClose={modal.close} title="Example Modal">
        <p className="text-sm text-dark-100">
          This is a beautifully animated modal component. You can put any content here.
        </p>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="ghost" onClick={modal.close}>Cancel</Button>
          <Button onClick={modal.close}>Confirm</Button>
        </div>
      </Modal>
    </>
  )
}
