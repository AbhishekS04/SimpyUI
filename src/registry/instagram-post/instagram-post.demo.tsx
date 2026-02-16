import React from "react";
import { InstagramPost } from "./instagram-post";

export default function InstagramPostDemo() {
	return (
		<div className="flex justify-center items-center min-h-screen p-8 font-sans text-gray-950 dark:text-gray-50 scale-90 origin-center bg-transparent">
			<div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
				<InstagramPost
					post={{
						id: "post-1",
						author: {
							name: "Tushar kanti Dey",
							handle: "tushardevx01",
							avatarUrl:
								"https://github.com/AbhishekS04/SimpyUI/blob/main/public/tushardevx01.jpg?raw=true",
							verified: true,
						},
						location: "Kolkata, India",
						text: "Quiet grind. Loud results. 🖤 Creating something special today.",
						media: [
							{
								type: "image",
								url: "https://github.com/AbhishekS04/SimpyUI/blob/main/public/post.jpg?raw=true",
								alt: "Quiet grind. Loud results. 🖤",
							},
						],
						stats: {
							likes: 8421,
							comments: 124,
						},
						createdAt: new Date().toISOString(),
					}}
				/>
			</div>
		</div>
	);
}
