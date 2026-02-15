
import React from "react";
import { TeamCarousel } from "./team-carousel";

const teamMembers = [
	{
		name: "Alice Johnson",
		role: "Frontend Developer",
		image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
		twitter: "https://twitter.com",
		linkedin: "https://linkedin.com",
		github: "https://github.com",
	},
	{
		name: "Bob Smith",
		role: "Backend Developer",
		image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
		twitter: "https://twitter.com",
		linkedin: "https://linkedin.com",
		github: "https://github.com",
	},
	{
		name: "Carol Lee",
		role: "UI/UX Designer",
		image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
		twitter: "https://twitter.com",
		linkedin: "https://linkedin.com",
		github: "https://github.com",
	},
	{
		name: "David Kim",
		role: "Project Manager",
		image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
		twitter: "https://twitter.com",
		linkedin: "https://linkedin.com",
		github: "https://github.com",
	},
	{
		name: "Eva Martin",
		role: "DevOps Engineer",
		image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
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
