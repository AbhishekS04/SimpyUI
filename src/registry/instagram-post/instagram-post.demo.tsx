import React from "react";
import { InstagramPost } from "./instagram-post";

export default function InstagramPostDemo() {
	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-100">
			<InstagramPost
				post={{
					id: "ig-post-1",
					author: {
						name: "Tushar kanti Dey",
						handle: "tushardevx01",
						avatarUrl: "https://github.com/AbhishekS04/SimpyUI/blob/main/public/tushardevx01.jpg?raw=true",
						verified: true,
					},
					text: "Quiet grind. Loud results. 🖤 #hustle #grind #success",
					media: [
						{
							type: "image",
							url: "https://github.com/AbhishekS04/SimpyUI/blob/main/public/post.jpg?raw=true/?w=800&h=800&fit=crop",
							alt: "Quiet grind. Loud results. 🖤",
						},
					],
					stats: { likes: 8421 },
					createdAt: "2026-02-16T00:00:00.000Z",
				}}
			/>
		</div>
	);
}
