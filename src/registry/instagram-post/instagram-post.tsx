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
	return date.toLocaleDateString();
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
				"max-w-[470px] w-full border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden font-sans",
				className
			)}
		>
			{/* Header */}
			<div className="flex items-center justify-between px-3 py-3">
				<div className="flex items-center gap-3">
					<div className="relative">
						<div className="absolute inset-0 bg-gradient-to-tr from-yellow-400 to-fuchsia-600 rounded-full p-[2px]">
							<div className="bg-white dark:bg-black p-[2px] rounded-full w-full h-full"></div>
						</div>
						<img
							src={post.author.avatarUrl}
							alt={post.author.name}
							className="relative w-8 h-8 rounded-full object-cover"
						/>
					</div>
					<div className="flex flex-col -gap-0.5">
						<div className="flex items-center gap-1">
							<span className="font-semibold text-sm text-gray-900 dark:text-white">
								{post.author.handle}
							</span>
							{post.author.verified && (
								<svg
									className="w-3 h-3 text-blue-500"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path d="M10 2a2 2 0 0 1 1.8 1.1l.7 1.4a1 1 0 0 0 .7.6l1.5.2a2 2 0 0 1 1.1 3.4l-1.1 1.1a1 1 0 0 0-.3.9l.2 1.5a2 2 0 0 1-2.9 2.1l-1.3-.7a1 1 0 0 0-.9 0l-1.3.7a2 2 0 0 1-2.9-2.1l.2-1.5a1 1 0 0 0-.3-.9L4.3 8.7A2 2 0 0 1 5.4 5.3l1.5-.2a1 1 0 0 0 .7-.6l.7-1.4A2 2 0 0 1 10 2z" />
								</svg>
							)}
							<span className="text-gray-500 text-xs">• {timeAgo(post.createdAt)}</span>
						</div>
						{post.location && (
							<span className="text-xs text-gray-500 dark:text-gray-400">
								{post.location}
							</span>
						)}
					</div>
				</div>
				<button className="text-gray-900 dark:text-white hover:opacity-60 transition-opacity">
					<MoreHorizontal className="w-5 h-5" />
				</button>
			</div>

			{/* Media Carousel */}
			<div
				className="relative w-full aspect-square overflow-hidden"
				onDoubleClick={handleDoubleClick}
			>
				<AnimatePresence initial={false} mode="popLayout">
					<motion.div
						key={currentMediaIndex}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="w-full h-full"
					>
						{post.media[currentMediaIndex].type === "image" ? (
							<img
								src={post.media[currentMediaIndex].url}
								alt={post.media[currentMediaIndex].alt || "Post media"}
								className="w-full h-full object-cover"
							/>
						) : (
							<div className="w-full h-full flex items-center justify-center bg-gray-200">
								<span className="text-gray-500">Video not supported in demo</span>
							</div>
						)}
					</motion.div>
				</AnimatePresence>

				{/* Heart Overlay Animation */}
				<AnimatePresence>
					{showHeartOverlay && (
						<motion.div
							initial={{ scale: 0, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0, opacity: 0 }}
							transition={{ duration: 0.3, type: "spring" }}
							className="absolute inset-0 flex items-center justify-center pointer-events-none"
						>
							<Heart
								className="w-24 h-24 text-white fill-white drop-shadow-xl"
								strokeWidth={0}
							/>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Carousel Navigation */}
				{post.media.length > 1 && (
					<>
						{currentMediaIndex > 0 && (
							<button
								onClick={(e) => {
									e.stopPropagation();
									prevMedia();
								}}
								className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70 transition-colors backdrop-blur-sm"
							>
								<ChevronLeft className="w-5 h-5" />
							</button>
						)}
						{currentMediaIndex < post.media.length - 1 && (
							<button
								onClick={(e) => {
									e.stopPropagation();
									nextMedia();
								}}
								className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70 transition-colors backdrop-blur-sm"
							>
								<ChevronRight className="w-5 h-5" />
							</button>
						)}
					</>
				)}

				{/* Page Indicator Bubble */}
				{post.media.length > 1 && (
					<div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full text-xs font-semibold text-white">
						{currentMediaIndex + 1}/{post.media.length}
					</div>
				)}
			</div>

			{/* Action Buttons */}
			<div className="px-3 py-3">
				<div className="flex items-center justify-between mb-3">
					<div className="flex items-center gap-4">
						<button
							onClick={toggleLike}
							className="group active:scale-90 transition-transform"
						>
							<Heart
								className={cn(
									"w-6 h-6 transition-colors",
									isLiked
										? "fill-red-500 text-red-500"
										: "text-gray-900 dark:text-white group-hover:text-gray-500"
								)}
							/>
						</button>
						<button className="group active:scale-90 transition-transform">
							<MessageCircle className="w-6 h-6 text-gray-900 dark:text-white group-hover:text-gray-500 transition-colors -rotate-90" />
						</button>
						<button className="group active:scale-90 transition-transform">
							<Send className="w-6 h-6 text-gray-900 dark:text-white group-hover:text-gray-500 transition-colors" />
						</button>
					</div>
					<button
						onClick={() => setIsSaved(!isSaved)}
						className="group active:scale-90 transition-transform"
					>
						<Bookmark
							className={cn(
								"w-6 h-6 transition-colors",
								isSaved
									? "fill-black dark:fill-white text-black dark:text-white"
									: "text-gray-900 dark:text-white group-hover:text-gray-500"
							)}
						/>
					</button>
				</div>

				{/* Likes */}
				<div className="mb-2">
					<span className="font-semibold text-sm text-gray-900 dark:text-white cursor-pointer hover:opacity-80">
						{formatLikes(likeCount)} likes
					</span>
				</div>

				{/* Caption */}
				<div className="mb-2">
					<span className="text-sm text-gray-900 dark:text-white leading-relaxed">
						<span className="font-semibold mr-2 cursor-pointer hover:opacity-80">
							{post.author.handle}
						</span>
						{post.text}
					</span>
				</div>

				{/* Comments Link */}
				<div className="mb-3">
					<button className="text-gray-500 text-sm cursor-pointer hover:text-gray-900 dark:hover:text-gray-300 transition-colors">
						View all {post.stats.comments} comments
					</button>
				</div>

				{/* Add Comment Input */}
				<div className="flex items-center gap-2">
					<div className="w-6 h-6 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
						<img src="https://github.com/AbhishekS04/SimpyUI/blob/main/public/Spiderman.png?raw=true" alt="User avatar" className="w-full h-full object-cover" />
					</div>
					<input
						type="text"
						placeholder="Add a comment..."
						className="text-sm w-full bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-500"
					/>
				</div>
			</div>
		</div>
	);
};

