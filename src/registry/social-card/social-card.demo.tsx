import React from "react";
import SocialCard from "./social-card";
import { FaGithub, FaTwitter } from "react-icons/fa";

const demoButtons = [
	{
		label: "Twitter",
		icon: <FaTwitter />,
		link: "https://twitter.com/tushardevx01",
	},
	{
		label: "Github",
		icon: <FaGithub />,
		link: "https://github.com/tusharxhub",
	},
];

const SocialCardDemo: React.FC = () => (
	<div className="flex items-center justify-center min-h-screen w-full py-24">
		<SocialCard
			image="https://github.com/AbhishekS04/SimpyUI/blob/main/public/pikachu.jpeg?raw=true"
			title="tushardevx01"
			name="Tushar kanti Dey"
			pitch="Explore my latest projects and connect for collaboration opportunities"
			icon={null} // Removed the Github logo
			buttons={demoButtons}
		/>
	</div>
);

export default SocialCardDemo;
