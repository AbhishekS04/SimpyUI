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
	<div className="flex items-center justify-center min-h-[400px] w-full py-16">
		<SocialCard
			image="https://github.com/AbhishekS04/SimpyUI/blob/main/public/pikachu.jpeg?raw=true"
			title="Tushar.dev"
			name="Tushar kanti Dey"
			pitch="Explore my latest projects and connect for collaboration opportunities"
			icon={<FaGithub />}
			buttons={demoButtons}
		/>
	</div>
);

export default SocialCardDemo;
