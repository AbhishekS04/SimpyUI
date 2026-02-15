
import React from "react";
import { TeamCarousel } from "./team-carousel";

const teamMembers = [
	{
		name: "Alice Johnson",
		role: "Frontend Developer",
		image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		twitter: "https://twitter.com",
		linkedin: "https://linkedin.com",
		github: "https://github.com",
	},
	{
		name: "Bob Smith",
		role: "Backend Developer",
		image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		twitter: "https://twitter.com",
		linkedin: "https://linkedin.com",
		github: "https://github.com",
	},
	{
		name: "Carol Lee",
		role: "UI/UX Designer",
		image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		twitter: "https://twitter.com",
		linkedin: "https://linkedin.com",
		github: "https://github.com",
	},
	{
		name: "David Kim",
		role: "Project Manager",
		image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		twitter: "https://twitter.com",
		linkedin: "https://linkedin.com",
		github: "https://github.com",
	},
	{
		name: "Eva Martin",
		role: "DevOps Engineer",
		image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		twitter: "https://twitter.com",
		linkedin: "https://linkedin.com",
		github: "https://github.com",
	},
];

export default function TeamCarouselDemo() {
	return (
		<div className="min-h-screen w-full flex items-center justify-center overflow-hidden relative">
			<TeamCarousel members={teamMembers} />
		</div>
	);
}
