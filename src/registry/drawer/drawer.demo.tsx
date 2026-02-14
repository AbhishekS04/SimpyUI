import React, { useState, useMemo } from 'react';
import useMeasure from 'react-use-measure';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Lock, Ban, TriangleAlert, Fingerprint, FileKey } from 'lucide-react';
import Button from "../button/button";

import {
    Drawer,
    DrawerContent,
    DrawerPortal,
    DrawerOverlay,
} from "./drawer";


export default function DrawerDemo() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [view, setView] = useState('default');
    const [elementRef, bounds] = useMeasure();

    const content = useMemo(() => {
        switch (view) {
            case 'default':
                return (
                    <motion.div
                        key="default"
                        initial={{ opacity: 0, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, filter: 'blur(4px)' }}
                        transition={{ duration: 0.25 }}
                    >
                        <div className="flex items-center justify-between w-full">
                            <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
                                Wallet Settings
                            </h2>
                            <button
                                className="rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 h-8 w-8 flex items-center justify-center transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                <X className="text-neutral-600 dark:text-neutral-400" size={18} />
                            </button>
                        </div>

                        <div className="mt-6 flex flex-col items-start gap-3">
                            <button
                                onClick={() => setView('key')}
                                className="bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 font-medium flex items-center gap-3 w-full rounded-2xl px-4 py-3.5 transition-colors"
                            >
                                <Lock className="w-5 h-5" />
                                View Private Key
                            </button>
                            <button
                                onClick={() => setView('phrase')}
                                className="bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 font-medium flex items-center gap-3 w-full rounded-2xl px-4 py-3.5 transition-colors"
                            >
                                <FileKey className="w-5 h-5" />
                                View Recovery Phrase
                            </button>
                            <button
                                onClick={() => setView('remove')}
                                className="bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 font-medium flex items-center gap-3 w-full rounded-2xl px-4 py-3.5 transition-colors"
                            >
                                <TriangleAlert className="w-5 h-5" />
                                Remove Wallet
                            </button>
                        </div>
                    </motion.div>
                );
            case 'remove':
                return (
                    <motion.div
                        key="remove"
                        initial={{ opacity: 0, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, filter: 'blur(4px)' }}
                        transition={{ duration: 0.25 }}
                        className="space-y-4"
                    >
                        <div className="flex justify-between items-start">
                            <div className="h-10 w-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                                <TriangleAlert className="text-red-600 dark:text-red-400 w-5 h-5" />
                            </div>
                            <button
                                className="rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 h-8 w-8 flex items-center justify-center transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                <X className="text-neutral-600 dark:text-neutral-400" size={18} />
                            </button>
                        </div>
                        <h2 className="font-medium text-xl text-neutral-900 dark:text-neutral-100">
                            Remove Wallet?
                        </h2>
                        <p className="text-neutral-500 dark:text-neutral-400 text-[15px] leading-relaxed">
                            This action cannot be undone. Make sure you've backed up your recovery phrase
                            before proceeding. You'll lose access to all funds if you don't have a backup.
                        </p>
                        <div className="flex items-center gap-3 pt-1">
                            <button
                                onClick={() => setView('default')}
                                className="flex-1 h-11 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-900 dark:text-neutral-100 rounded-full text-[15px] font-medium transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setView('default')}
                                className="flex-1 h-11 bg-red-500 hover:bg-red-600 text-white rounded-full text-[15px] font-medium transition-colors"
                            >
                                Remove
                            </button>
                        </div>
                    </motion.div>
                );
            case 'phrase':
                return (
                    <motion.div
                        key="phrase"
                        initial={{ opacity: 0, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, filter: 'blur(4px)' }}
                        transition={{ duration: 0.25 }}
                        className="space-y-4"
                    >
                        <div className="flex justify-between items-start">
                            <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                <FileKey className="text-blue-600 dark:text-blue-400 w-5 h-5" />
                            </div>
                            <button
                                className="rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 h-8 w-8 flex items-center justify-center transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                <X className="text-neutral-600 dark:text-neutral-400" size={18} />
                            </button>
                        </div>
                        <h2 className="font-medium text-xl text-neutral-900 dark:text-neutral-100">
                            Recovery Phrase
                        </h2>
                        <p className="text-neutral-500 dark:text-neutral-400 text-[15px] leading-relaxed">
                            Your recovery phrase is the master key to your wallet. Write it down and store it
                            securely. Anyone with this phrase can access your funds.
                        </p>
                        <div className="border-t border-neutral-200 dark:border-neutral-700 space-y-4 text-neutral-500 dark:text-neutral-400 text-[15px] pt-4">
                            <div className="flex items-center gap-3">
                                <Shield className="w-5 h-5 shrink-0" />
                                <span>Store it in a secure location</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Ban className="w-5 h-5 shrink-0" />
                                <span>Never share with anyone</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <TriangleAlert className="w-5 h-5 shrink-0" />
                                <span>We cannot recover it for you</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 pt-1">
                            <button
                                onClick={() => setView('default')}
                                className="flex-1 h-11 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-900 dark:text-neutral-100 rounded-full text-[15px] font-medium transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setView('default')}
                                className="flex-1 h-11 bg-sky-400 hover:bg-sky-500 text-white rounded-full text-[15px] font-medium flex items-center justify-center gap-2 transition-colors"
                            >
                                <Fingerprint className="w-4 h-4" />
                                Show Phrase
                            </button>
                        </div>
                    </motion.div>
                );
            case 'key':
                return (
                    <motion.div
                        key="key"
                        initial={{ opacity: 0, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, filter: 'blur(4px)' }}
                        transition={{ duration: 0.25 }}
                        className="space-y-4"
                    >
                        <div className="flex justify-between items-start">
                            <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                <Lock className="text-blue-600 dark:text-blue-400 w-5 h-5" />
                            </div>
                            <button
                                className="rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 h-8 w-8 flex items-center justify-center transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                <X className="text-neutral-600 dark:text-neutral-400" size={18} />
                            </button>
                        </div>
                        <h2 className="font-medium text-xl text-neutral-900 dark:text-neutral-100">
                            Private Key
                        </h2>
                        <p className="text-neutral-500 dark:text-neutral-400 text-[15px] leading-relaxed">
                            Your private key is a cryptographic key that proves ownership of your wallet. Treat it
                            with the same security as your bank account details.
                        </p>
                        <div className="border-t border-neutral-200 dark:border-neutral-700 space-y-4 text-neutral-500 dark:text-neutral-400 text-[15px] pt-4">
                            <div className="flex items-center gap-3">
                                <Shield className="w-5 h-5 shrink-0" />
                                <span>Store it in a secure location</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Ban className="w-5 h-5 shrink-0" />
                                <span>Never share with anyone</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <TriangleAlert className="w-5 h-5 shrink-0" />
                                <span>We cannot recover it for you</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 pt-1">
                            <button
                                onClick={() => setView('default')}
                                className="flex-1 h-11 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-900 dark:text-neutral-100 rounded-full text-[15px] font-medium transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setView('default')}
                                className="flex-1 h-11 bg-sky-400 hover:bg-sky-500 text-white rounded-full text-[15px] font-medium flex items-center justify-center gap-2 transition-colors"
                            >
                                <Fingerprint className="w-4 h-4" />
                                Show Key
                            </button>
                        </div>
                    </motion.div>
                );
        }
    }, [view]);

    return (
        <>
            <Button
                className="mt-5 px-6 rounded-full bg-white dark:bg-neutral-800 py-2 font-medium text-black dark:text-white border border-neutral-200 dark:border-neutral-700 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-700 focus-visible:shadow-focus-ring-button md:font-medium"
                onClick={() => {
                    setIsOpen(true);
                    setView('default');
                }}
            >
                Click Me To Open Drawer
            </Button>
            <Drawer open={isOpen} onOpenChange={(open) => {
                setIsOpen(open);
                if (!open) setView('default');
            }}>
                <DrawerPortal>
                    <DrawerOverlay className="fixed inset-0 z-40 bg-black/40" onClick={() => setIsOpen(false)} />
                    <DrawerContent
                        className="fixed inset-x-0 bottom-0 z-50 mx-auto flex items-end justify-center p-4 outline-none"
                    >
                        <div className="w-full max-w-[361px] overflow-hidden rounded-[36px] bg-white dark:bg-neutral-900">
                            <motion.div
                                animate={{ height: bounds.height > 0 ? bounds.height : 'auto' }}
                                transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                            >
                                <div className="p-6" ref={elementRef}>
                                    <AnimatePresence mode="popLayout" initial={false}>
                                        {content}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        </div>
                    </DrawerContent>
                </DrawerPortal>
            </Drawer>
        </>
    );
}
