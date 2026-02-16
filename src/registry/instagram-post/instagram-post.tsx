
import React from "react";
import { useState } from "react";
import { MoreHorizontal, Heart, ChevronLeft, ChevronRight, MessageCircle, Send, Bookmark } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type InstagramPostProps = {
	post: {
		id: string;
		author: {
			name: string;
			handle: string;
			avatarUrl: string;
			verified?: boolean;
		};
		location?: string;
		text: string;
		media: Array<{
			type: "image" | "video";
			url: string;
			alt?: string;
		}>;
		stats: {
			likes: number;
			comments: number;
		};
		createdAt: string;
	};
	className?: string;
};

function formatLikes(likes: number) {
	return new Intl.NumberFormat("en-US").format(likes);
}

function timeAgo(dateString: string) {
	const now = new Date();
	const date = new Date(dateString);
	const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
	if (diff < 60) return `${diff}s`;
	if (diff < 3600) return `${Math.floor(diff / 60)}m`;
	if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
	if (diff < 604800) return `${Math.floor(diff / 86400)}d`;
	return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export const InstagramPost: React.FC<InstagramPostProps> = ({ post, className }) => {
	const [isLiked, setIsLiked] = useState(false);
	const [isSaved, setIsSaved] = useState(false);
	const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
	const [showHeartOverlay, setShowHeartOverlay] = useState(false);
	const [likeCount, setLikeCount] = useState(post.stats.likes);

	const handleDoubleClick = () => {
		if (!isLiked) {
			setIsLiked(true);
			setLikeCount((prev) => prev + 1);
		}
		setShowHeartOverlay(true);
		setTimeout(() => setShowHeartOverlay(false), 1000);
	};

	const toggleLike = () => {
		if (isLiked) {
			setIsLiked(false);
			setLikeCount((prev) => prev - 1);
		} else {
			setIsLiked(true);
			setLikeCount((prev) => prev + 1);
		}
	};

	const nextMedia = () => {
		if (currentMediaIndex < post.media.length - 1) {
			setCurrentMediaIndex((prev) => prev + 1);
		}
	};

	const prevMedia = () => {
		if (currentMediaIndex > 0) {
			setCurrentMediaIndex((prev) => prev - 1);
		}
	};

	// Utility function to join class names
	function cn(...classes: (string | undefined | null | false)[]): string {
		return classes.filter(Boolean).join(" ");
	}

	return (
		<div
			className={cn(
				"max-w-[370px] w-full rounded-3xl shadow-xl overflow-hidden font-sans border border-zinc-100 dark:border-zinc-900",
				className
			)}
		>
			{/* Header */}
			<div className="flex items-center justify-between px-5 py-4">
				<div className="flex items-center gap-3">
					<div className="relative group cursor-pointer">
						<div className="absolute -inset-0.5 bg-gradient-to-tr from-yellow-400 to-fuchsia-600 rounded-full opacity-70 group-hover:opacity-100 transition-opacity blur-[1px]"></div>
						<div className="relative p-[2px] bg-white dark:bg-zinc-950 rounded-full">
							<img
								src={post.author.avatarUrl}
								alt={post.author.name}
								className="w-9 h-9 rounded-full object-cover"
							/>
						</div>
					</div>
					<div className="flex flex-col">
						<div className="flex items-center gap-1.5">
							<span className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 tracking-tight cursor-pointer hover:opacity-80 transition-opacity">
								{post.author.handle}
							</span>
							{post.author.verified && (
								<svg
									className="w-3.5 h-3.5 text-blue-500"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path d="M10 2a2 2 0 0 1 1.8 1.1l.7 1.4a1 1 0 0 0 .7.6l1.5.2a2 2 0 0 1 1.1 3.4l-1.1 1.1a1 1 0 0 0-.3.9l.2 1.5a2 2 0 0 1-2.9 2.1l-1.3-.7a1 1 0 0 0-.9 0l-1.3.7a2 2 0 0 1-2.9-2.1l.2-1.5a1 1 0 0 0-.3-.9L4.3 8.7A2 2 0 0 1 5.4 5.3l1.5-.2a1 1 0 0 0 .7-.6l.7-1.4A2 2 0 0 1 10 2z" />
								</svg>
							)}
						</div>
						{post.location && (
							<span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium tracking-wide section-heading">
								{post.location}
							</span>
						)}
					</div>
				</div>
				<button className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors p-1">
					<MoreHorizontal className="w-5 h-5" />
				</button>
			</div>

			{/* Media Carousel */}
			<div
				className="relative w-full aspect-[4/5] bg-zinc-100 dark:bg-zinc-900 group"
				onDoubleClick={handleDoubleClick}
			>
				<AnimatePresence initial={false} mode="popLayout">
					<motion.div
						key={currentMediaIndex}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.4, ease: "easeInOut" }}
						className="absolute inset-0"
					>
						{post.media[currentMediaIndex].type === "image" ? (
							<img
								src={post.media[currentMediaIndex].url}
								alt={post.media[currentMediaIndex].alt || "Post media"}
								className="w-full h-full object-cover"
							/>
						) : (
							<div className="w-full h-full flex items-center justify-center">
								<span className="text-zinc-400 text-sm tracking-wider uppercase">Video not supported</span>
							</div>
						)}
					</motion.div>
				</AnimatePresence>

				{/* Heart Overlay Animation */}
				<AnimatePresence>
					{showHeartOverlay && (
						<motion.div
							initial={{ scale: 0, opacity: 0, rotate: -15 }}
							animate={{ scale: 1, opacity: 1, rotate: 0 }}
							exit={{ scale: 0, opacity: 0, rotate: 15 }}
							transition={{ duration: 0.4, type: "spring", bounce: 0.5 }}
							className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
						>
							<Heart
								className="w-28 h-28 text-white fill-white drop-shadow-2xl"
								strokeWidth={0}
							/>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Refined Navigation Controls */}
				{post.media.length > 1 && (
					<div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
						{currentMediaIndex > 0 && (
							<button
								onClick={(e) => {
									e.stopPropagation();
									prevMedia();
								}}
								className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white rounded-full p-2 transition-all duration-200 shadow-lg border border-white/10"
							>
								<ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
							</button>
						)}
						{currentMediaIndex < post.media.length - 1 && (
							<button
								onClick={(e) => {
									e.stopPropagation();
									nextMedia();
								}}
								className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white rounded-full p-2 transition-all duration-200 shadow-lg border border-white/10"
							>
								<ChevronRight className="w-5 h-5" strokeWidth={2.5} />
							</button>
						)}

						{/* Elegant Page Indicators */}
						<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 px-3 py-1.5 rounded-full bg-black/20 backdrop-blur-md">
							{post.media.map((_, idx) => (
								<div
									key={idx}
									className={cn(
										"w-1.5 h-1.5 rounded-full transition-all duration-300 shadow-sm",
										idx === currentMediaIndex ? "bg-white scale-110" : "bg-white/40"
									)}
								/>
							))}
						</div>
					</div>
				)}
			</div>

			{/* Interactions Section */}
			<div className="px-5 pt-4 pb-2">
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center gap-5">
						<button
							onClick={toggleLike}
							className="group focus:outline-none"
						>
							<Heart
								className={cn(
									"w-[26px] h-[26px] transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]",
									isLiked
										? "fill-red-500 text-red-500 scale-110"
										: "text-zinc-900 dark:text-white group-hover:text-zinc-600 group-active:scale-95"
								)}
								strokeWidth={1.5}
							/>
						</button>
						<button className="group focus:outline-none">
							<MessageCircle
								className="w-[26px] h-[26px] text-zinc-900 dark:text-white group-hover:text-zinc-600 transition-colors -rotate-90 group-active:scale-95"
								strokeWidth={1.5}
							/>
						</button>
						<button className="group focus:outline-none">
							<Send
								className="w-[26px] h-[26px] text-zinc-900 dark:text-white group-hover:text-zinc-600 transition-colors group-active:scale-95"
								strokeWidth={1.5}
							/>
						</button>
					</div>
					<button
						onClick={() => setIsSaved(!isSaved)}
						className="group focus:outline-none"
					>
						<Bookmark
							className={cn(
								"w-[26px] h-[26px] transition-all duration-300",
								isSaved
									? "fill-zinc-900 dark:fill-white text-zinc-900 dark:text-white"
									: "text-zinc-900 dark:text-white group-hover:text-zinc-600"
							)}
							strokeWidth={1.5}
						/>
					</button>
				</div>

				{/* Likes Count */}
				<div className="mb-2">
					<span className="font-semibold text-sm text-zinc-900 dark:text-white cursor-pointer hover:opacity-80">
						{formatLikes(likeCount)} likes
					</span>
				</div>

				{/* Clean Caption */}
				<div className="mb-2 text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
					<span className="font-semibold text-zinc-900 dark:text-white mr-2 cursor-pointer hover:underline decoration-zinc-400 underline-offset-2">
						{post.author.handle}
					</span>
					{post.text}
				</div>

				{/* Subdued Metadata */}
				<button className="text-zinc-400 text-sm cursor-pointer hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors mb-4 font-normal">
					View all {post.stats.comments} comments
				</button>

				<div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-3.5 pb-2">
					<div className="flex items-center gap-3 w-full">
						<div className="w-7 h-7 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden flex-shrink-0">
							<img src="https://github.com/AbhishekS04/SimpyUI/blob/main/public/Spiderman.png?raw=true" alt="User" className="w-full h-full object-cover" />
						</div>
						<input
							type="text"
							placeholder="Add a comment..."
							className="text-sm w-full bg-transparent border-none outline-none text-zinc-900 dark:text-white placeholder-zinc-400"
						/>
					</div>
					<span className="text-[10px] text-zinc-400 uppercase tracking-widest font-medium shrink-0 ml-4">
						{timeAgo(post.createdAt)}
					</span>
				</div>
			</div>
		</div>
	);
};

