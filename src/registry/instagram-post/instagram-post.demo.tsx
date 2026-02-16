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
						avatarUrl: "https://images.unsplash.com/photo-1695840358933-16dd7baa6dfb?w=200&h=200&fit=crop",
						verified: true,
					},
					text: "Golden hour in the city. Sometimes you just have to stop and appreciate the view.",
					media: [
						{
							type: "image",
							url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=800&fit=crop",
							alt: "City skyline at golden hour",
						},
					],
					stats: { likes: 8421 },
					createdAt: "2025-01-05T18:00:00.000Z",
				}}
			/>
		</div>
	);
}
