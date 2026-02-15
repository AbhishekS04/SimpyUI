
import React from "react";
import { TeamCarousel } from "./team-carousel";

const teamMembers = [
	{
		name: "Spiderman",
		role: "Frontend Developer",
		image: "https://github.com/AbhishekS04/SimpyUI/blob/main/public/Spiderman.png?raw=true",
		twitter: "https://twitter.com",
		linkedin: "https://linkedin.com",
		github: "https://github.com",
	},
	{
		name: "Thor",
		role: "Backend Developer",
		image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
		twitter: "https://twitter.com",
		linkedin: "https://linkedin.com",
		github: "https://github.com",
	},
	{
		name: "Captain America",
		role: "UI/UX Designer",
		image: "https://github.com/AbhishekS04/SimpyUI/blob/main/public/cap.png?raw=true",
		twitter: "https://twitter.com",
		linkedin: "https://linkedin.com",
		github: "https://github.com",
	},
	{
		name: "Ironman",
		role: "Project Manager",
		image: "https://github.com/AbhishekS04/SimpyUI/blob/main/public/Ironman.png?raw=true",
		twitter: "https://twitter.com",
		linkedin: "https://linkedin.com",
		github: "https://github.com",
	},
	{
		name: "Hulk",
		role: "DevOps Engineer",
		image: "https://github.com/AbhishekS04/SimpyUI/blob/main/public/Hulk.webp?raw=true",
		twitter: "https://twitter.com",
		linkedin: "https://linkedin.com",
		github: "https://github.com",
	},
];

export default function TeamCarouselDemo() {
	return (
		<div className="min-h-screen w-full flex items-center justify-center overflow-hidden relative bg-black">
			<div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/80 pointer-events-none z-0" />
			<TeamCarousel members={teamMembers} />
		</div>
	);
}
