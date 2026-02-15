
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
		image: "https://github.com/AbhishekS04/SimpyUI/blob/main/public/Thor.png?raw=true",
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
			<TeamCarousel members={teamMembers} />
	);
}
