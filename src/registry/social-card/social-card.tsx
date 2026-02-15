"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
	motion,
	useMotionTemplate,
	useMotionValue,
	useSpring,
} from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { LuArrowUpRight } from "react-icons/lu";

// Utility function to merge class names
function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

interface SocialCardProps {
	className?: string;
	image: string;
	title: string;
	name: string;
	pitch: string;
	icon?: React.ReactNode;
	buttons?: Array<{ label: string; icon?: React.ReactNode; link?: string }>;
}

const SocialCard = ({
	className,
	image,
	title,
	name,
	pitch,
	icon,
	buttons,
}: SocialCardProps) => {
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	const onMouseMove = useCallback(
		({ clientX, clientY, currentTarget }: React.MouseEvent) => {
			const { left, top, width, height } =
				currentTarget.getBoundingClientRect();
			mouseX.set(clientX - left - width / 2);
			mouseY.set(clientY - top - height / 2);
		},
		[mouseX, mouseY]
	);

	const onMouseLeave = useCallback(() => {
		mouseX.set(0);
		mouseY.set(0);
	}, [mouseX, mouseY]);

	const rotateX = useSpring(useMotionValue(0), {
		stiffness: 150,
		damping: 20,
	});
	const rotateY = useSpring(useMotionValue(0), {
		stiffness: 150,
		damping: 20,
	});

	useEffect(() => {
		const unsubscribeX = mouseY.on("change", (latest) => {
			rotateX.set((latest / 20) * -1); // Reverse logic for natural feel
		});
		const unsubscribeY = mouseX.on("change", (latest) => {
			rotateY.set(latest / 20);
		});

		return () => {
			unsubscribeX();
			unsubscribeY();
		};
	}, [mouseX, mouseY, rotateX, rotateY]);

	const bgStyle = useMotionTemplate`radial-gradient(
    400px circle at ${mouseX}px ${mouseY}px,
    rgba(255, 255, 255, 0.15),
    transparent 80%
  )`;

	return (
		<motion.div
			className={cn(
				"group relative h-[450px] w-[320px] rounded-3xl transition-all duration-300",
				"bg-neutral-900", // Dark mode default base
				className
			)}
			onMouseMove={onMouseMove}
			onMouseLeave={onMouseLeave}
			style={{
				transformStyle: "preserve-3d",
				rotateX,
				rotateY,
			}}
		>
			{/* Gradient Border & Glow Effect */}
			<div
				className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
				style={{
					background:
						"radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.1), transparent 40%)",
					zIndex: 0,
				}}
			/>
			<motion.div
				className="absolute inset-0 rounded-3xl opacity-0 duration-500 group-hover:opacity-100"
				style={{ background: bgStyle }}
			/>

			{/* Card Content Container */}
			<div className="absolute inset-[1px] flex flex-col items-center justify-between overflow-hidden rounded-[23px] bg-neutral-950 p-6 shadow-2xl">
				{/* Background Noise/Texture */}
				<div className="pointer-events-none absolute inset-0 opacity-20 contrast-125 grayscale filter bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

				{/* Header / Top Section */}
				<div className="relative z-10 flex w-full flex-col items-center pt-8">
					<div className="relative">
						<motion.div
							initial={false}
							animate={{ y: 0 }}
							whileHover={{ y: -5, scale: 1.05 }}
							transition={{ type: "spring", stiffness: 300, damping: 20 }}
							className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-neutral-800 shadow-2xl"
						>
							<img
								src={image}
								alt={title}
								className="h-full w-full object-cover"
							/>
						</motion.div>
						<div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg ring-4 ring-neutral-950">
							{icon}
						</div>
					</div>

					<div className="mt-4 text-center">
						<h3 className="text-2xl font-bold tracking-tight text-white">
							{title}
						</h3>
						<p className="text-sm font-medium text-neutral-400">{name}</p>
					</div>
				</div>

				{/* Middle Section - Pitch */}
				<div className="relative z-10 px-2 py-4">
					<p className="text-center text-sm leading-relaxed text-neutral-300">
						{pitch}
					</p>
				</div>

				{/* Bottom Section - Actions */}
				<div className="relative z-10 w-full space-y-3 pb-2 transition-all duration-300 ease-out group-hover:translate-y-0">
					{buttons?.map((button, index) => (
						<a
							key={index}
							href={button.link}
							target="_blank"
							rel="noopener noreferrer"
							className="group/btn relative flex w-full items-center justify-between rounded-xl bg-neutral-900 px-4 py-3 transition-colors hover:bg-neutral-800"
						>
							<span className="flex items-center gap-3 text-sm font-medium text-neutral-300 group-hover/btn:text-white">
								{button.icon}
								{button.label}
							</span>
							<LuArrowUpRight className="text-neutral-500 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 group-hover/btn:text-white" />
						</a>
					))}
				</div>
			</div>
		</motion.div>
	);
};

export default SocialCard;

