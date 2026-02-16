import React, { useState } from "react";
import { MoreHorizontal, ThumbsUp, MessageSquare, Share2, Send, X, Globe } from "lucide-react";

type LinkedinPostProps = {
    post: {
        id: string;
        author: {
            name: string;
            headline: string;
            avatarUrl: string;
            connectionDegree?: string;
        };
        content: string;
        media?: {
            type: "image" | "video";
            url: string;
        };
        stats: {
            likes: number;
            comments: number;
            shares: number;
        };
        createdAt: string;
    };
    className?: string;
};

export const LinkedinPost: React.FC<LinkedinPostProps> = ({ post, className }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [likeCount, setLikeCount] = useState(post.stats.likes);

    const toggleLike = () => {
        if (isLiked) {
            setLikeCount((prev) => prev - 1);
        } else {
            setLikeCount((prev) => prev + 1);
        }
        setIsLiked(!isLiked);
    };

    return (
        <div className={`w-full max-w-[555px] bg-white dark:bg-[#1b1f23] border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden font-sans ${className}`}>
            {/* Header */}
            <div className="px-4 py-3 flex items-start justify-between">
                <div className="flex gap-3">
                    <img src={post.author.avatarUrl} alt={post.author.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                        <div className="flex items-center gap-1 group cursor-pointer">
                            <span className="font-semibold text-sm text-zinc-900 dark:text-white hover:text-blue-600 hover:underline">
                                {post.author.name}
                            </span>
                            {post.author.connectionDegree && (
                                <span className="text-zinc-500 text-xs">• {post.author.connectionDegree}</span>
                            )}
                        </div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">{post.author.headline}</p>
                        <div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                            <span>{post.createdAt}</span>
                            <span>•</span>
                            <Globe className="w-3 h-3" />
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {!isFollowing && (
                        <button
                            onClick={() => setIsFollowing(true)}
                            className="text-blue-600 font-semibold text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 px-2 py-1 rounded transition-colors"
                        >
                            + Follow
                        </button>
                    )}
                    <button className="text-zinc-600 dark:text-zinc-400 p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="px-4 pb-2">
                <p className="text-sm text-zinc-900 dark:text-zinc-100 whitespace-pre-wrap leading-relaxed">
                    {post.content}
                </p>
            </div>

            {/* Media */}
            {post.media && (
                <div className="w-full mt-2">
                    <img src={post.media.url} alt="Post content" className="w-full h-auto object-cover border-t border-b border-zinc-100 dark:border-zinc-800" />
                </div>
            )}

            {/* Stats */}
            <div className="px-4 py-2 flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400">
                <div className="flex items-center gap-1 hover:text-blue-500 hover:underline cursor-pointer">
                    <div className="flex -space-x-1">
                        <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                            <ThumbsUp className="w-2.5 h-2.5 text-white fill-white" />
                        </div>
                    </div>
                    <span>{likeCount}</span>
                </div>
                <div className="flex gap-3">
                    <span className="hover:text-blue-500 hover:underline cursor-pointer">{post.stats.comments} comments</span>
                    <span className="hover:text-blue-500 hover:underline cursor-pointer">{post.stats.shares} reposts</span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="px-2 py-1 flex items-center justify-between">
                <ActionButton
                    active={isLiked}
                    icon={ThumbsUp}
                    label="Like"
                    onClick={toggleLike}
                    activeColor="text-blue-600"
                    fillIcon={isLiked}
                />
                <ActionButton icon={MessageSquare} label="Comment" />
                <ActionButton icon={Share2} label="Repost" />
                <ActionButton icon={Send} label="Send" />
            </div>
        </div>
    );
};

const ActionButton = ({ active, icon: Icon, label, onClick, activeColor, fillIcon }: any) => (
    <button
        onClick={onClick}
        className={`flex items-center justify-center gap-2 py-3 px-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 flex-1 transition-colors ${active ? activeColor : 'text-zinc-500 dark:text-zinc-400'}`}
    >
        <Icon className={`w-5 h-5 ${fillIcon ? 'fill-current' : ''}`} />
        <span className="text-sm font-semibold">{label}</span>
    </button>
);
