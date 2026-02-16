import React from "react";
import { LinkedinPost } from "./linkedin-post";

export default function LinkedinPostDemo() {
    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            <LinkedinPost
                post={{
                    id: "li-post-1",
                    author: {
                        name: "Tushar kanti Dey",
                        headline: "Full Stack Developer | React | Node.js | Building cool things 🚀",
                        avatarUrl: "https://github.com/AbhishekS04/SimpyUI/blob/main/public/tushardevx01.jpg?raw=true",
                        connectionDegree: "1st"
                    },
                    content: "Just shipped a new feature! 🚀\n\nIt's been a long week but the results are worth it. We focused on performance and accessibility, and the metrics are looking great. \n\n#coding #devlife #react #webdevelopment",
                    media: {
                        type: "image",
                        url: "https://github.com/AbhishekS04/SimpyUI/blob/main/public/post.jpg?raw=true",
                    },
                    stats: {
                        likes: 1240,
                        comments: 85,
                        shares: 42
                    },
                    createdAt: "2h"
                }}
            />
        </div>
    );
}
