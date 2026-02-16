import React, { useState } from "react";
import { MoreHorizontal, ThumbsUp, MessageSquare, Share2, Send, Globe, Heart, HandMetal } from "lucide-react";

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
        <div className={`w-full max-w-[555px] mx-auto bg-white dark:bg-[#1b1f23] border border-zinc-200 dark:border-zinc-700 sm:rounded-lg rounded-none overflow-hidden font-sans ${className}`}>
            {/* Header */}
            <div className="px-3 py-3 flex items-start justify-between">
                <div className="flex gap-3">
                    <img src={post.author.avatarUrl} alt={post.author.name} className="w-12 h-12 rounded-full object-cover border border-zinc-100 dark:border-zinc-800" />
                    <div>
                        <div className="flex items-center flex-wrap gap-1 group cursor-pointer">
                            <span className="font-semibold text-[14px] text-zinc-900 dark:text-white group-hover:text-[#0a66c2] group-hover:underline decoration-1 underline-offset-2">
                                {post.author.name}
                            </span>
                            {post.author.connectionDegree && (
                                <span className="text-zinc-500 text-[12px] opacity-90">• {post.author.connectionDegree}</span>
                            )}
                        </div>
                        <p className="text-[12px] text-zinc-500 dark:text-zinc-400 line-clamp-1 leading-tight mb-0.5">{post.author.headline}</p>
                        <div className="flex items-center gap-1 text-[12px] text-zinc-500 dark:text-zinc-400">
                            <span>{post.createdAt}</span>
                            <span className="text-[10px]">•</span>
                            <Globe className="w-3 h-3 opacity-70" />
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    {!isFollowing && (
                        <button
                            onClick={() => setIsFollowing(true)}
                            className="text-[#0a66c2] font-semibold text-[15px] hover:bg-blue-50 dark:hover:bg-[#0a66c2]/10 px-3 py-1 rounded transition-colors flex items-center"
                        >
                            <span className="mr-1">+</span> Follow
                        </button>
                    )}
                    <button className="text-zinc-600 dark:text-zinc-400 p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                        <MoreHorizontal className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="px-4 pb-2">
                <p className="text-[14px] text-zinc-900 dark:text-zinc-100 whitespace-pre-wrap leading-[1.45] tracking-normal">
                    {post.content}
                </p>
            </div>

            {/* Media */}
            {post.media && (
                <div className="w-full mt-2">
                    <img src={post.media.url} alt="Post content" className="w-full h-auto object-cover" />
                </div>
            )}

            {/* Stats */}
            <div className="px-4 py-2 flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 text-[12px] text-zinc-500 dark:text-zinc-400">
                <div className="flex items-center hover:text-blue-500 hover:underline cursor-pointer group">
                    <div className="flex -space-x-1 mr-1.5">
                        <div className="w-4 h-4 rounded-full bg-[#378fe9] flex items-center justify-center border-2 border-white dark:border-[#1b1f23]">
                            <ThumbsUp className="w-2.5 h-2.5 text-white fill-white" />
                        </div>
                        <div className="w-4 h-4 rounded-full bg-[#e34d4d] flex items-center justify-center border-2 border-white dark:border-[#1b1f23]">
                            <Heart className="w-2.5 h-2.5 text-white fill-white" />
                        </div>
                        <div className="w-4 h-4 rounded-full bg-[#f8c77e] flex items-center justify-center border-2 border-white dark:border-[#1b1f23]">
                            <HandMetal className="w-2.5 h-2.5 text-white fill-white rotate-12" />
                        </div>
                    </div>
                    <span>{likeCount}</span>
                </div>
                <div className="flex gap-2">
                    <span className="hover:text-[#0a66c2] hover:underline cursor-pointer">{post.stats.comments} comments</span>
                    <span>•</span>
                    <span className="hover:text-[#0a66c2] hover:underline cursor-pointer">{post.stats.shares} reposts</span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="px-1 py-1 flex items-center justify-between">
                <ActionButton
                    active={isLiked}
                    icon={ThumbsUp}
                    label="Like"
                    onClick={toggleLike}
                    activeColor="text-[#0a66c2]"
                    fillIcon={isLiked}
                    className="group-hover:scale-110"
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
        className={`flex items-center justify-center gap-2 py-3 px-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 flex-1 transition-all group ${active ? activeColor : 'text-zinc-500 dark:text-zinc-400 hover:bg-[#ededed] dark:hover:bg-opacity-10'}`}
    >
        <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:-translate-y-0.5 ${fillIcon ? 'fill-current' : ''}`} strokeWidth={1.5} />
        <span className="text-[14px] font-semibold text-zinc-600 dark:text-zinc-300">{label}</span>
    </button>
);
