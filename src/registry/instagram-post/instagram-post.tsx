import React from "react";

type InstagramPostProps = {
	post: {
		id: string;
		author: {
			name: string;
			handle: string;
			avatarUrl: string;
			verified?: boolean;
		};
		text: string;
		media: Array<{
			type: "image";
			url: string;
			alt?: string;
		}>;
		stats: {
			likes: number;
		};
		createdAt: string;
	};
	className?: string;
};

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
	return (
		<div
			className={`max-w-md w-full bg-white rounded-lg shadow border border-gray-200 overflow-hidden font-sans ${className || ""}`}
		>
			{/* Header */}
			<div className="flex items-center px-4 py-3">
				<img
					src={post.author.avatarUrl}
					alt={post.author.name}
					className="w-10 h-10 rounded-full object-cover border border-gray-300"
				/>
				<div className="ml-3 flex-1">
					<div className="flex items-center gap-1">
						<span className="font-semibold text-sm text-gray-900">{post.author.name}</span>
						{post.author.verified && (
							<svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a2 2 0 0 1 1.8 1.1l.7 1.4a1 1 0 0 0 .7.6l1.5.2a2 2 0 0 1 1.1 3.4l-1.1 1.1a1 1 0 0 0-.3.9l.2 1.5a2 2 0 0 1-2.9 2.1l-1.3-.7a1 1 0 0 0-.9 0l-1.3.7a2 2 0 0 1-2.9-2.1l.2-1.5a1 1 0 0 0-.3-.9L4.3 8.7A2 2 0 0 1 5.4 5.3l1.5-.2a1 1 0 0 0 .7-.6l.7-1.4A2 2 0 0 1 10 2z"/></svg>
						)}
						<span className="text-gray-500 text-xs ml-1">@{post.author.handle}</span>
					</div>
					<span className="text-xs text-gray-400">{timeAgo(post.createdAt)}</span>
				</div>
				<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
			</div>

			{/* Media */}
			{post.media && post.media.length > 0 && (
				<div className="w-full aspect-square bg-gray-100">
					<img
						src={post.media[0].url}
						alt={post.media[0].alt || "Instagram post media"}
						className="w-full h-full object-cover"
					/>
				</div>
			)}

			{/* Content */}
			<div className="px-4 py-3">
				<span className="block text-gray-900 text-sm leading-snug">
					<span className="font-semibold mr-1">{post.author.handle}</span>
					{post.text}
				</span>
			</div>

			{/* Actions & Stats */}
			<div className="px-4 pb-3 flex items-center justify-between">
				<div className="flex gap-4">
					<button className="text-gray-700 hover:text-pink-500">
						<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 0 1 6.364 0L12 7.636l1.318-1.318a4.5 4.5 0 1 1 6.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 0 1 0-6.364z"/></svg>
					</button>
					<button className="text-gray-700 hover:text-blue-500">
						<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z"/></svg>
					</button>
					<button className="text-gray-700 hover:text-green-500">
						<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15A7.97 7.97 0 0 1 12 17a7.97 7.97 0 0 1-7.4-2"/></svg>
					</button>
				</div>
				<span className="text-sm text-gray-700 font-semibold">{post.stats.likes.toLocaleString()} likes</span>
			</div>
		</div>
	);
};
