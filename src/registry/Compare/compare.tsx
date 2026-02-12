"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface CompareProps {
    firstImage?: string;
    secondImage?: string;
    firstImageClassName?: string;
    secondImageClassname?: string;
    className?: string;
    slideMode?: "hover" | "drag" | "click";
}

export function Compare({
    firstImage,
    secondImage,
    firstImageClassName,
    secondImageClassname,
    className,
    slideMode = "hover",
}: CompareProps) {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        let clientX: number;

        if ('touches' in e) {
            clientX = e.touches[0].clientX;
        } else {
            clientX = e.clientX;
        }

        const x = clientX - rect.left;
        const percentage = (x / rect.width) * 100;

        if (slideMode === "hover" || isDragging) {
            setSliderPosition(Math.max(0, Math.min(100, percentage)));
        }
    };

    const handleMouseDown = () => {
        if (slideMode === "drag") {
            setIsDragging(true);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        const handleGlobalMouseUp = () => setIsDragging(false);

        if (isDragging) {
            window.addEventListener("mouseup", handleGlobalMouseUp);
            window.addEventListener("touchend", handleGlobalMouseUp);
        }

        return () => {
            window.removeEventListener("mouseup", handleGlobalMouseUp);
            window.removeEventListener("touchend", handleGlobalMouseUp);
        };
    }, [isDragging]);

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden select-none ${className || ''}`}
            onMouseMove={handleMove}
            onTouchMove={handleMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
        >
            {/* Second Image (Background - After) */}
            <div className="absolute inset-0">
                {secondImage && (
                    <img
                        src={secondImage}
                        alt="After"
                        className={`w-full h-full ${secondImageClassname || 'object-cover'}`}
                        draggable={false}
                    />
                )}
            </div>

            {/* First Image (Foreground - Before) with Clip Path */}
            <div
                className="absolute inset-0 overflow-hidden"
                style={{
                    clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                }}
            >
                {firstImage && (
                    <img
                        src={firstImage}
                        alt="Before"
                        className={`w-full h-full ${firstImageClassName || 'object-cover'}`}
                        draggable={false}
                    />
                )}
            </div>

            {/* Slider Handle */}
            <motion.div
                className="absolute top-0 bottom-0 w-1 cursor-ew-resize"
                style={{
                    left: `${sliderPosition}%`,
                    transform: "translateX(-50%)",
                }}
                animate={{
                    opacity: isDragging ? 1 : sliderPosition === 50 ? 0.7 : 1,
                }}
            >
                {/* Slider Line */}
                <div className="absolute inset-0 bg-white shadow-lg" />

                {/* Slider Circle */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-neutral-900"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {/* Left Arrow */}
                    <svg
                        className="absolute left-2 w-3 h-3 text-neutral-900"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>

                    {/* Right Arrow */}
                    <svg
                        className="absolute right-2 w-3 h-3 text-neutral-900"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </motion.div>

                {/* Top Triangle */}
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-white" />

                {/* Bottom Triangle */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[10px] border-b-white" />
            </motion.div>
        </div>
    );
}

export default Compare;