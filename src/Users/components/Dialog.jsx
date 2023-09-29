import { useState } from 'react'
import { Dialog } from '@headlessui/react'

function Dialog(isOpen,setIsOpen, onClose) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="w-full h-full relative z-50">
<div className="fixed inset-0 bg-black/30" aria-hidden="true" />

{/* Full-screen container to center the panel */}
<div className="fixed inset-0 flex w-screen bg-zinc-200 items-center justify-center p-4">
  {/* The actual dialog panel  */}
  <Dialog.Panel className="mx-auto max-w-sm rounded bg-white">
    <Dialog.Title>Complete your order</Dialog.Title>
        <Dialog.Description>
          This will permanently deactivate your account
        </Dialog.Description>

        <p>
          Are you sure you want to deactivate your account? All of your data
          will be permanently removed. This action cannot be undone.
        </p>

        <button onClick={() => setIsOpen(false)}>Deactivate</button>
        <button onClick={() => setIsOpen(false)}>Cancel</button>
                {/* ... */}
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
export default Dialog