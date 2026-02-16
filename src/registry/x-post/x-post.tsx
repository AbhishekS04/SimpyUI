import React, { useState } from "react";
import {
    MessageCircle,
    Repeat2,
    Heart,
    Share,
    MoreHorizontal,
    BarChart2,
    BadgeCheck,
} from "lucide-react";

interface XPostProps {
    avatar?: string;
    name?: string;
    handle?: string;
    date?: string;
    content?: string;
    image?: string;
    verified?: boolean;
    stats?: {
        replies: number;
        reposts: number;
        likes: number;
        views: number;
    };
    theme?: "light" | "dark";
}

export const XPost: React.FC<XPostProps> = ({
    avatar = "https://github.com/shadcn.png",
    name = "John Doe",
    handle = "johndoe",
    date = new Date().toISOString(),
    content = "Just setting up my X post component! 🚀 #coding #react",
    image,
    verified = false,
    stats = {
        replies: 12,
        reposts: 4,
        likes: 32,
        views: 1200,
    },
    theme = "dark",
}) => {
    const [liked, setLiked] = useState(false);
    const [reposted, setReposted] = useState(false);
    const [localStats, setLocalStats] = useState(stats);

    const handleLike = () => {
        if (liked) {
            setLocalStats({ ...localStats, likes: localStats.likes - 1 });
        } else {
            setLocalStats({ ...localStats, likes: localStats.likes + 1 });
        }
        setLiked(!liked);
    };

    const handleRepost = () => {
        if (reposted) {
            setLocalStats({ ...localStats, reposts: localStats.reposts - 1 });
        } else {
            setLocalStats({ ...localStats, reposts: localStats.reposts + 1 });
        }
        setReposted(!reposted);
    };

    const formatDate = (dateString: string) => {
        const dateObj = new Date(dateString);
        return new Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            minute: "numeric",
            month: "short",
            day: "numeric",
            year: "numeric",
        }).format(dateObj);
    };

    return (
        <div
            className={`w-full max-w-[500px] mx-auto border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 font-sans ${theme === "dark" ? "text-white" : "text-black"
                }`}
        >
            {/* Header */}
            <div className="flex justify-between items-start mb-1">
                <div className="flex gap-3">
                    <img
                        src={avatar}
                        alt={name}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col leading-tight">
                        <div className="flex items-center gap-1 group cursor-pointer">
                            <span className="font-bold text-[15px] hover:underline hover:decoration-1">
                                {name}
                            </span>
                            {verified && (
                                <BadgeCheck className="w-[18px] h-[18px] text-[#1d9bf0] fill-current" />
                            )}
                        </div>
                        <span className="text-[15px] text-zinc-500 dark:text-zinc-500">
                            @{handle}
                        </span>
                    </div>
                </div>
                <button className="text-zinc-500 hover:text-[#1d9bf0] hover:bg-[#1d9bf0]/10 p-2 rounded-full transition-colors -mr-2 -mt-2">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>

            {/* Content */}
            <div className="mt-1 mb-3">
                <p className="whitespace-pre-wrap text-[15px]">{content}</p>

                {/* Optional Image */}
                {image && (
                    <div className="mt-3 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
                        <img src={image} alt="Post content" className="w-full h-auto" />
                    </div>
                )}
            </div>

            {/* Date */}
            <div className="border-b border-zinc-200 dark:border-zinc-800 pb-3 mb-3">
                <span className="text-[15px] text-zinc-500 hover:underline cursor-pointer">
                    {formatDate(date)}
                </span>
                <span className="px-1 text-zinc-500">·</span>
                <span className="text-[15px] font-semibold text-zinc-900 dark:text-white">
                    <span className="font-bold text-zinc-900 dark:text-white">
                        {localStats.views.toLocaleString()}
                    </span>{" "}
                    <span className="text-zinc-500 font-normal">Views</span>
                </span>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center text-zinc-500 px-2">
                <button className="flex items-center gap-2 group hover:text-[#1d9bf0] transition-colors">
                    <div className="p-2 rounded-full group-hover:bg-[#1d9bf0]/10 transition-colors">
                        <MessageCircle className="w-[18px] h-[18px]" />
                    </div>
                    <span className="text-xs group-hover:text-[#1d9bf0]">
                        {localStats.replies}
                    </span>
                </button>

                <button
                    onClick={handleRepost}
                    className={`flex items-center gap-2 group transition-colors ${reposted ? "text-[#00ba7c]" : "hover:text-[#00ba7c]"
                        }`}
                >
                    <div className="p-2 rounded-full group-hover:bg-[#00ba7c]/10 transition-colors">
                        <Repeat2 className="w-[18px] h-[18px]" />
                    </div>
                    <span className="text-xs">{localStats.reposts}</span>
                </button>

                <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 group transition-colors ${liked ? "text-[#f91880]" : "hover:text-[#f91880]"
                        }`}
                >
                    <div className="p-2 rounded-full group-hover:bg-[#f91880]/10 transition-colors">
                        <Heart
                            className={`w-[18px] h-[18px] ${liked ? "fill-current" : ""}`}
                        />
                    </div>
                    <span className="text-xs">{localStats.likes}</span>
                </button>

                <button className="flex items-center gap-2 group hover:text-[#1d9bf0] transition-colors">
                    <div className="p-2 rounded-full group-hover:bg-[#1d9bf0]/10 transition-colors">
                        <BarChart2 className="w-[18px] h-[18px]" />
                    </div>
                    <span className="text-xs hover:text-[#1d9bf0] hidden sm:block">
                        View Stats
                    </span>
                </button>

                <button className="flex items-center gap-2 group hover:text-[#1d9bf0] transition-colors">
                    <div className="p-2 rounded-full group-hover:bg-[#1d9bf0]/10 transition-colors">
                        <Share className="w-[18px] h-[18px]" />
                    </div>
                </button>
            </div>
        </div>
    );
};

export default XPost;
