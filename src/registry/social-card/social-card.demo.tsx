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
	<div className="flex items-center justify-center min-h-[500px] w-full py-16 bg-neutral-100 dark:bg-neutral-900 perspective-[1000px]">
		<SocialCard
			image="https://github.com/AbhishekS04/SimpyUI/blob/main/public/pikachu.jpeg?raw=true"
			title="Tushar.dev"
			name="Tushar kanti Dey"
			pitch="Building digital experiences that matter. Full-stack developer passionate about UI/UX and performance."
			icon={<FaGithub className="h-4 w-4" />}
			buttons={demoButtons}
		/>
	</div>
);

export default SocialCardDemo;
