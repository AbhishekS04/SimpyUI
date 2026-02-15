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
	<div className="flex items-center justify-center min-h-[400px] w-full bg-gray-50 dark:bg-gray-900 py-16">
		<SocialCard
			image="https://forgeui.in/pfp.png"
			title="Tushar.dev"
			name="Tushar kanti Dey"
			pitch="Explore my latest projects and connect for collaboration opportunities"
			icon={<FaGithub />}
			buttons={demoButtons}
		/>
	</div>
);

export default SocialCardDemo;
