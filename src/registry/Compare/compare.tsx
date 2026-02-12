"use client";
import React from "react";

interface CompareProps {
    firstImage?: string;
    secondImage?: string;
    firstImageClassName?: string;
    secondImageClassname?: string;
    className?: string;
    slideMode?: string;
}

// Placeholder Compare component - not yet implemented
export function Compare({
    firstImage,
    secondImage,
    firstImageClassName,
    secondImageClassname,
    className,
    slideMode,
}: CompareProps) {
    return (
        <div className={`relative p-8 ${className || ''}`}>
            <p className="text-neutral-400 text-center">Compare component - coming soon</p>
        </div>
    );
}

export default Compare;