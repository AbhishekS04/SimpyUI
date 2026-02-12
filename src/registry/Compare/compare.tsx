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

            {/* Centered Glass Slider Handle */}
            <motion.div
                className="absolute top-1/2 left-0 w-full flex items-center justify-center pointer-events-none"
                style={{
                    transform: "translateY(-50%)",
                    zIndex: 10,
                }}
            >
                {/* Vertical Line at sliderPosition */}
                <div
                    className="absolute h-full w-0.5 bg-gradient-to-b from-blue-500/80 to-purple-600/80 shadow-[0_0_20px_rgba(120,120,255,0.8)]"
                    style={{ left: `calc(${sliderPosition}% - 1px)` }}
                />
                {/* Glass Handle Centered */}
                <motion.div
                    className="w-12 h-24 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_40px_rgba(120,120,255,0.35)] flex items-center justify-center pointer-events-auto"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.08, boxShadow: "0 0 48px 8px #6366f1AA, 0 0 8px 2px #fff" }}
                    whileTap={{ scale: 0.97 }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                        bounce: 0.25,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                        left: `calc(${sliderPosition}% - 24px)`,
                        position: "absolute",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 20,
                    }}
                >
                    {/* Inner Grip */}
                    <div className="w-[3px] h-10 bg-white/40 rounded-full" />
                </motion.div>
            </motion.div>
        </div>
    );
}

export default Compare;